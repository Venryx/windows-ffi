import { FFI_Library } from "../@Shared/Utils.js";
export const kernel32 = FFI_Library("kernel32", {
    "GlobalUnlock": ["bool", ["int32"]],
    "GlobalFree": ["int32", ["int32"]], // https://www.pinvoke.net/default.aspx/kernel32.GlobalFree
});
