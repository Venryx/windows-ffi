import ffi from "ffi-napi";

export function FFI_Library<T extends {[key: string]: any}>(dll: string, shape: T) {
	return ffi.Library(dll, shape) as {[P in keyof T]: Function};
}