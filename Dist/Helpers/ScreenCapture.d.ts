/// <reference types="node" />
/// <reference types="ref-napi" />
import { Vector2, VRect } from "js-vextensions";
import { VColor } from "./Graphics.js";
export declare function GetPixelColor_Fast(x: number, y: number): VColor;
export declare function GetPixelColors_Fast(positions: Vector2[]): VColor[];
export declare function CaptureScreenshotOfRectContainingAllPositions(positions: Vector2[]): {
    rect: VRect;
    screenshot: Screenshot;
};
export declare class Screenshot {
    constructor(data?: Partial<Screenshot>);
    buffer: Buffer;
    width: number;
    height: number;
    GetPixel(pos: Vector2): VColor;
    GetPixel(x: number, y: number): VColor;
}
export declare function CaptureScreenshot(opt: {
    windowHandle?: number;
    /** (relative to the provided window) */
    rectToCapture?: VRect;
    log?: boolean;
    time?: boolean;
}): Screenshot;
