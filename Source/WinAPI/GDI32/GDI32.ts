import {BitmapStruct, BitmapInfoHeaderStruct, ColorRefStruct} from "../@Shared/Structs.js";
import ref from "ref-napi";
import {FFI_Library} from "../@Shared/Utils.js";

const handle = "uint32";

export const gdi32 = FFI_Library("gdi32", {
	"CreateCompatibleDC": [handle, [handle]], // https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatibledc
	"CreateCompatibleBitmap": [handle, [handle, "int32", "int32"]], // https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatiblebitmap
	"GetPixel": [ColorRefStruct, [handle, "int32", "int32"]], // https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-getpixel
	"SelectObject": [handle, [handle, handle]], // https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-selectobject
	"GetObjectA": ["int32", [handle, "int32", ref.refType(BitmapStruct)]], // https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-getobjecta
	"DeleteObject": ["bool", [handle]], // https://www.pinvoke.net/default.aspx/gdi32.DeleteObject
	"BitBlt": ["bool", [handle, "int32", "int32", "int32", "int32", handle, "int32", "int32", "int32"]],
	"GetDIBits": ["int32", [handle, handle, "uint32", "uint32", ref.refType(BitmapStruct), ref.refType(BitmapInfoHeaderStruct), "int32"]],
});