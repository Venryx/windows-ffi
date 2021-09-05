import type ffi_type from "ffi-napi";
import type ref_type from "ref-napi";
//import type refStructDI_init_type from "ref-struct-di";
type refStructDI_type = (ref: typeof ref_type)=>StructType_type;
import type StructType_type from "ref-struct-di"; // typing seems incorrect; should return an import func instead of StructType itself

export interface PreImportConfig {
	ffi?: typeof ffi_type;
	ref?: typeof ref_type;
	refStructDI?: refStructDI_type;
	StructType?: StructType_type;
}

export let preImportConfig: PreImportConfig;
export function SupplyConfig(config: PreImportConfig) {
	preImportConfig = config;
}