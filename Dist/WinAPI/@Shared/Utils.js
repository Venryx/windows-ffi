import { ffi } from "../../Manager.js";
export function FFI_Library(dll, shape) {
    return ffi.Library(dll, shape);
}
