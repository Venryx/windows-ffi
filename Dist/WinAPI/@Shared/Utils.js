import ffi from "ffi-napi";
export function FFI_Library(dll, shape) {
    return ffi.Library(dll, shape);
}
