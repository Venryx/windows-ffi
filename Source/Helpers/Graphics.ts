import chroma, {Color} from "chroma-js";
import {Vector2} from "js-vextensions";
import {gdi32} from "../WinAPI/GDI32/GDI32.js";
import {user32} from "../WinAPI/User32/User32.js";

/*export function GetPixelColor(x: number, y: number) {
	try {
		return robot.getPixelColor(x, y);
	} catch (ex) {
		return null;
	}
}*/

/*const plainObjectPrototype = Object.getPrototypeOf({});
function IsPlainObject(obj: any) {
	return Object.getPrototypeOf(obj) == plainObjectPrototype;
}*/

export class VColor {
	static From(source: Color | string) {
		const chromaColor = typeof source == "string" ? chroma(source) : source as Color;
		const rgba = chromaColor.rgba();
		//return new VColor(...rgba);
		return new VColor(rgba[0], rgba[1], rgba[2], rgba[3] ?? 0);
	}
	/** Returns a value between 0 and 1. Reference: 0 = identical, 0.01 = 1% different, 1 = exact opposites */
	static Diff(colorA: VColor, colorB: VColor) {
		//let maxColorDistance = 442; // = sqrt(255^2 + 255^2 + 255^2)
		let maxColorDistance = chroma.distance("white", "black");
		return chroma.distance(colorA.ToChromaJS(), colorB.ToChromaJS()) as any as number / maxColorDistance;
	}

	constructor(public red: number, public green: number, public blue: number, public alpha: number = 0) {}
	ToChromaJS() {
		//console.log(JSON.stringify(this));
		//return chroma([this.red, this.green, this.blue, this.alpha], "rgba");
		//return chroma({r: this.red, g: this.green, b: this.blue, a: this.alpha});
		// this is the only way I've found so far that works (chromajs lib maybe outdated)
		const result = chroma.rgb(this.red, this.green, this.blue);
		result.alpha(this.alpha);
		return result;
	}
	ToHex_RGB() {
		let result = this.ToChromaJS().hex().slice(1); // remove "#" prefix (redundant)
		if (result.length > 6) result = result.slice(0, -2); // remove alpha part (if present)
		return result;
	}
	ToHex_RGBA() {
		let result = this.ToChromaJS().hex().slice(1); // remove "#" prefix (redundant)
		// todo: add alpha part, if missing
		return result;
	}

	Diff(otherColor: VColor) {
		return VColor.Diff(this, otherColor);
	}
}

export function GetPixelColor(x: number, y: number) {
	return GetPixelColors([new Vector2(x, y)])[0];
}
export function GetPixelColors(positions: Vector2[]) {
	let hdc = user32.GetDC(0);
	let results = positions.map(pos=> {
		let pixel = gdi32.GetPixel(hdc, pos.x, pos.y);
		//let color = chroma(pixel & 0x000000FF, (pixel & 0x0000FF00) >> 8, (pixel & 0x00FF0000) >> 16);
		/*let color_chroma = chroma(pixel.red, pixel.green, pixel.blue);
		//Log(`Pos: ${pos} Color: ${color.hex().substr(1)}`);
		return color_chroma.hex().substr(1); // to match with robotjs.getPixelColor() returns*/
		return new VColor(pixel.red, pixel.green, pixel.blue, pixel.alpha);
	});
	user32.ReleaseDC(0, hdc);
	return results;
}
//let timer = new Timer(1000, ()=>Log(GetPixelColor(0, 0))).Start();