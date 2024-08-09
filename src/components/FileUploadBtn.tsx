'use client';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button, ButtonProps } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
// import { useTranslations } from 'next-intl';
import { CameraIcon } from '@heroicons/react/20/solid';

const FILE_ACCEPT = 'ACCEPT';
const FILE_REJECT = 'REJECT';
const isAllFiles = (dt: DataTransfer) =>
    dt.types.every((t) => t === 'Files' || t === 'application/x-moz-file');
const doesAccept = (type: string, accept?: string) => {
    if (!accept) {
        return true;
    }

    const acceptList = accept.split(',').map((c) => c.trim());
    let cond = false;
    for (const acceptor of acceptList) {
        if (acceptor.endsWith('*')) {
            cond ||= type.startsWith(acceptor.slice(0, -1));
        } else {
            cond ||= type === acceptor;
        }
    }
    return cond;
};
const isEventAllowed = <T extends HTMLElement>(
    e: React.DragEvent<T>,
    accept: string | undefined,
    multiple: boolean
) => {
    if (!isAllFiles(e.dataTransfer)) {
        return false;
    }

    const items = Array.from(e.dataTransfer.items);
    if (items.length === 0 || (!multiple && items.length > 1)) {
        return false;
    }
    return items.every((c) => doesAccept(c.type, accept));
};

export default function FileUploadButton({
    accept,
    onUpload,
    acceptProps = {
        color: 'primary',
        className: 'text-primary border-primary hover:border-primary',
    },
    rejectProps = {
        color: 'danger',
        className: 'text-danger border-danger hover:border-danger',
    },
    multiple = false,
    classNames,
    className,
    ...props
}: ButtonProps & {
    classNames?: { wrapper?: string; button?: string };
    onUpload?: (files: File[]) => void;
    acceptProps?: ButtonProps;
    rejectProps?: ButtonProps;
    accept?: string;
    multiple?: boolean;
}) {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [acceptance, setAcceptance] = useState<null | 'ACCEPT' | 'REJECT'>(
        null
    );
    const onDragEnter = useCallback(
        (e: React.DragEvent<HTMLButtonElement>) => {
            if (isEventAllowed(e, accept, multiple)) {
                setAcceptance(FILE_ACCEPT);
            } else {
                setAcceptance(FILE_REJECT);
            }
        },
        [accept, multiple, setAcceptance]
    );
    const onDragOver = useCallback(
        (e: React.DragEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (isEventAllowed(e, accept, multiple)) {
                setAcceptance(FILE_ACCEPT);
            } else {
                setAcceptance(FILE_REJECT);
            }
        },
        [accept, multiple, setAcceptance]
    );
    const onDragFinish = useCallback(
        (e: React.DragEvent<HTMLButtonElement>) => {
            setAcceptance(null);
        },
        [setAcceptance]
    );
    const onDrop = useCallback(
        (e: React.DragEvent<HTMLButtonElement>) => {
            e.preventDefault();
            e.persist();
            e.stopPropagation();

            if (isEventAllowed(e, accept, multiple)) {
                const items = Array.from(e.dataTransfer.items);
                if (items.length) {
                    onUpload?.(items.map((c) => c.getAsFile()!));
                }
            }

            setAcceptance(null);
        },
        [accept, multiple, onUpload, setAcceptance]
    );
    const onFileChosen = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onUpload?.(Array.from(e.target.files!));
        },
        [onUpload]
    );
    const onButtonPress = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    return (
        <form className={classNames?.wrapper}>
            <label htmlFor='_upload'>
                <Button
                    {...props}
                    variant='light'
                    {...(acceptance === FILE_ACCEPT
                        ? acceptProps
                        : acceptance === FILE_REJECT
                            ? rejectProps
                            : {})}
                    className={`${className} ${classNames?.button} ${acceptance === FILE_ACCEPT
                        ? acceptProps?.className
                        : acceptance === FILE_REJECT
                            ? rejectProps?.className
                            : 'justify-center p-1 text-white bg-green-400 hover:bg-green-600 rounded-md'
                        } m-2 mx-auto !h-fit w-2/3 items-center justify-center rounded-md`}
                    onPress={onButtonPress}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragOver}
                    onDragEnd={onDragFinish}
                    onDragLeave={onDragFinish}
                    onDrop={onDrop}
                >
                    <div className='m-auto mb-1 w-fit'>
                        {acceptance === FILE_REJECT ? (
                            <ShieldExclamationIcon width={50} />
                        ) : (
                            <CameraIcon width={50} />
                        )}
                    </div>
                    {/* <div className='text-bold block text-sm opacity-60'>aaaaaaa</div> */}
                </Button>
            </label>
            <input
                type='file'
                role='presentation'
                name='_upload'
                ref={inputRef}
                onChange={onFileChosen}
                accept={accept}
                multiple={multiple}
                className='hidden'
            />
        </form>
    );
}
