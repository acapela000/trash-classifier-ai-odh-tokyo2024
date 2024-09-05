import { ImageResponse } from "next/og";


export const runtime = "edge";
export const size = {
    width: 240,
    height: 240
};

export const contentType = "image/svg+xml";

export default function Icon() {
    return new ImageResponse((
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "250",
                height: "250",
                backgroundColor: "white"
            }}
        >
            <a href=""></a>
        </div>),
        { ...size }
    );
}