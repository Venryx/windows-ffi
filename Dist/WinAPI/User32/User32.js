import { RectStruct } from "../@Shared/Structs.js";
import ref from "ref-napi";
import { FFI_Library } from "../@Shared/Utils.js";
export const user32 = FFI_Library("user32", {
    "GetDC": ["ulong", ["int32"]],
    "ReleaseDC": ["ulong", ["uint32", "uint32"]],
    "GetDesktopWindow": ["int32", []],
    "GetClientRect": ["int32", ["int32", ref.refType(RectStruct)]], // https://www.pinvoke.net/default.aspx/user32.getclientrect
});
