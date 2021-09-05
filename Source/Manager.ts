import {createRequire} from "module";
import {preImportConfig} from "./@UserSupplied/PreImportConfig.js";
const require = createRequire(import.meta.url);

export let ffi = preImportConfig.ffi ?? require("ffi-napi");
export let ref = preImportConfig.ref ?? require("ref-napi");
export let refStructDI = preImportConfig.refStructDI ?? require("ref-struct-di");
export let StructType = preImportConfig.StructType ?? refStructDI(ref);