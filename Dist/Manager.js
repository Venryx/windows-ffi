var _a, _b, _c, _d;
import { createRequire } from "module";
import { preImportConfig } from "./@UserSupplied/PreImportConfig.js";
const require = createRequire(import.meta.url);
export let ffi = (_a = preImportConfig.ffi) !== null && _a !== void 0 ? _a : require("ffi-napi");
export let ref = (_b = preImportConfig.ref) !== null && _b !== void 0 ? _b : require("ref-napi");
export let refStructDI = (_c = preImportConfig.refStructDI) !== null && _c !== void 0 ? _c : require("ref-struct-di");
export let StructType = (_d = preImportConfig.StructType) !== null && _d !== void 0 ? _d : refStructDI(ref);
