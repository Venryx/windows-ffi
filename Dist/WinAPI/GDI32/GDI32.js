import { BitmapStruct, BitmapInfoHeaderStruct, ColorRefStruct } from "../@Shared/Structs.js";
import ref from "ref-napi";
import { FFI_Library } from "../@Shared/Utils.js";
const handle = "uint32";
export const gdi32 = FFI_Library("gdi32", {
    "CreateCompatibleDC": [handle, [handle]],
    "CreateCompatibleBitmap": [handle, [handle, "int32", "int32"]],
    "GetPixel": [ColorRefStruct, [handle, "int32", "int32"]],
    "SelectObject": [handle, [handle, handle]],
    "GetObjectA": ["int32", [handle, "int32", ref.refType(BitmapStruct)]],
    "DeleteObject": ["bool", [handle]],
    "BitBlt": ["bool", [handle, "int32", "int32", "int32", "int32", handle, "int32", "int32", "int32"]],
    "GetDIBits": ["int32", [handle, handle, "uint32", "uint32", ref.refType(BitmapStruct), ref.refType(BitmapInfoHeaderStruct), "int32"]],
});
