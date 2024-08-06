"use client";
import React from "react";
//import { Calendar, SupportedCalendars } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";
import { Calendar, Radio, RadioGroup, Button, ButtonGroup, cn } from "@nextui-org/react";
import { today, getLocalTimeZone, startOfWeek, startOfMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

// export default function TrashScheduler() {
//     let [value, setValue] = React.useState(parseDate("2024-10-08"));

//     return (
//             <Calendar aria-label="Date (International Calendar)"
//                 value={today(getLocalTimeZone())}
//             />
//     );
// }

export default function TrashScheduler() {
    let defaultDate = today(getLocalTimeZone());
    let [value, setValue] = React.useState(defaultDate);
    let { locale } = useLocale();

    let now = today(getLocalTimeZone());
    let nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
    let nextMonth = startOfMonth(now.add({ months: 1 }));

    const CustomRadio = (props: any) => {
        const { children, ...otherProps } = props;

        return (
            <Radio
                {...otherProps}
                classNames={{
                    base: cn(
                        "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
                        "cursor-pointer rounded-full border-2 border-default-200/60",
                        "data-[selected=true]:border-primary",
                    ),
                    label: "text-tiny text-default-500",
                    labelWrapper: "px-1 m-0",
                    wrapper: "hidden",
                }}
            >
                {children}
            </Radio>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <Calendar
                aria-label="Date (Presets)"
                bottomContent={
                    <RadioGroup
                        aria-label="Date precision"
                        classNames={{
                            base: "w-full pb-2",
                            wrapper: "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-x-scroll",
                        }}
                        defaultValue="exact_dates"
                        orientation="horizontal"
                    >
                        <CustomRadio value="exact_dates">Exact dates</CustomRadio>
                        <CustomRadio value="1_day">1 day</CustomRadio>
                        <CustomRadio value="2_days">2 days</CustomRadio>
                        <CustomRadio value="3_days">3 days</CustomRadio>
                        <CustomRadio value="7_days">7 days</CustomRadio>
                        <CustomRadio value="14_days">14 days</CustomRadio>
                    </RadioGroup>
                }
                classNames={{
                    content: "w-full",
                }}
                focusedValue={value}
                nextButtonProps={{
                    variant: "bordered",
                }}
                prevButtonProps={{
                    variant: "bordered",
                }}
                topContent={
                    <ButtonGroup
                        fullWidth
                        className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                        radius="full"
                        size="sm"
                        variant="bordered"
                    >
                        <Button onPress={() => setValue(now)}>Today</Button>
                        <Button onPress={() => setValue(nextWeek)}>Next week</Button>
                        <Button onPress={() => setValue(nextMonth)}>Next month</Button>
                    </ButtonGroup>
                }
                value={value}
                onChange={setValue}
                onFocusChange={setValue}
            />
        </div>
    );
}
