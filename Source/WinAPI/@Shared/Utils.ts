import {ffi} from "../../Manager.js";

export function FFI_Library<T extends {[key: string]: any}>(dll: string, shape: T) {
	return ffi.Library(dll, shape) as {[P in keyof T]: Function};
}