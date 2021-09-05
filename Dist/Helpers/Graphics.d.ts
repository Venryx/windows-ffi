import chroma, { Color } from "chroma-js";
import { Vector2 } from "js-vextensions";
export declare class VColor {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    static From(source: Color | string): VColor;
    /** Returns a value between 0 and 1. Reference: 0 = identical, 0.01 = 1% different, 1 = exact opposites */
    static Diff(colorA: VColor, colorB: VColor): number;
    constructor(red: number, green: number, blue: number, alpha?: number);
    ToChromaJS(): chroma.Color;
    ToHex_RGB(): string;
    ToHex_RGBA(): string;
    Diff(otherColor: VColor): number;
}
export declare function GetPixelColor(x: number, y: number): VColor;
export declare function GetPixelColors(positions: Vector2[]): VColor[];
