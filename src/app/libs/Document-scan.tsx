import { Mat } from 'mirada/dist/src/types/opencv';

<script async src="https://docs.opencv.org/4.7.0/opencv.js" type="text/javascript"></script>

import React, { useEffect } from 'react';
//import cv from 'opencv.js'; // Make sure to install OpenCV.js and import it correctly

const DocumentScan: React.FC = () => {
    useEffect(() => {
        // Your OpenCV.js code here
        async function processImage(imagePath: string) {
            let src = cv.imread(imagePath);
            let gray = new cv.Mat();
            let blurred = new cv.Mat();
            let edged = new cv.Mat();

            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
            cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
            cv.Canny(blurred, edged, 75, 200);

            let contours = new cv.MatVector();
            let hierarchy = new cv.Mat();
            cv.findContours(edged, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

            let contourArray: { contour: cv.Mat, area: number }[] = [];
            for (let i = 0; i < contours.size(); i++) {
                let contour = contours.get(i);
                contourArray.push({
                    contour: contour,
                    area: cv.contourArea(contour)
                });
            }
            contourArray.sort((a, b) => b.area - a.area);

            let docContour: cv.Mat | undefined;
            for (let i = 0; i < contourArray.length; i++) {
                let peri = cv.arcLength(contourArray[i].contour, true);
                let approx = new cv.Mat();
                cv.approxPolyDP(contourArray[i].contour, approx, 0.02 * peri, true);

                if (approx.rows === 4) {
                    docContour = approx;
                    break;
                }
            }

            if (!docContour) {
                throw new Error("Document contour not found.");
            }

            let pts: Point[] = [];
            for (let i = 0; i < docContour.rows; i++) {
                pts.push({ x: docContour.intAt(i, 0), y: docContour.intAt(i, 1) });
            }

            let rect = orderPoints(pts);
            let [tl, tr, br, bl] = [rect.topLeft, rect.topRight, rect.bottomRight, rect.bottomLeft];

            let widthA = Math.sqrt(Math.pow(br.x - bl.x, 2) + Math.pow(br.y - bl.y, 2));
            let widthB = Math.sqrt(Math.pow(tr.x - tl.x, 2) + Math.pow(tr.y - tl.y, 2));
            let maxWidth = Math.max(Math.floor(widthA), Math.floor(widthB));

            let heightA = Math.sqrt(Math.pow(tr.x - br.x, 2) + Math.pow(tr.y - br.y, 2));
            let heightB = Math.sqrt(Math.pow(tl.x - bl.x, 2) + Math.pow(tl.y - bl.y, 2));
            let maxHeight = Math.max(Math.floor(heightA), Math.floor(heightB));

            let dst = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, maxWidth - 1, 0, maxWidth - 1, maxHeight - 1, 0, maxHeight - 1]);
            let M = cv.getPerspectiveTransform(cv.matFromArray(4, 1, cv.CV_32FC2, rectToFloat32Array(rect)), dst);
            let warped = new cv.Mat();
            cv.warpPerspective(src, warped, M, new cv.Size(maxWidth, maxHeight));

            cv.imshow('canvasOutput', warped); // Displaying the image in a canvas
            let processedImagePath = 'processed_image.jpg';

            src.delete();
            gray.delete();
            blurred.delete();
            edged.delete();
            contours.delete();
            hierarchy.delete();
            if (docContour) docContour.delete();
            dst.delete();
            M.delete();
            warped.delete();

            return processedImagePath;
        }

        function orderPoints(pts: Point[]): Rect {
            let rect: Rect = { topLeft: pts[0], topRight: pts[0], bottomRight: pts[0], bottomLeft: pts[0] };
            let s = pts.map(p => p.x + p.y);
            let diff = pts.map(p => p.x - p.y);

            rect.topLeft = pts[s.indexOf(Math.min(...s))];
            rect.bottomRight = pts[s.indexOf(Math.max(...s))];
            rect.topRight = pts[diff.indexOf(Math.min(...diff))];
            rect.bottomLeft = pts[diff.indexOf(Math.max(...diff))];

            return rect;
        }

        function rectToFloat32Array(rect: Rect): Float32Array {
            return new Float32Array([
                rect.topLeft.x, rect.topLeft.y,
                rect.topRight.x, rect.topRight.y,
                rect.bottomRight.x, rect.bottomRight.y,
                rect.bottomLeft.x, rect.bottomLeft.y
            ]);
        }

    }, []);

    return (
        <div>
            <canvas id="canvasOutput"></canvas>
        </div>
    );
}

export default DocumentScan;
