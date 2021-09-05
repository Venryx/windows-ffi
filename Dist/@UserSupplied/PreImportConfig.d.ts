import type ffi_type from "ffi-napi";
import type ref_type from "ref-napi";
declare type refStructDI_type = (ref: typeof ref_type) => StructType_type;
import type StructType_type from "ref-struct-di";
export interface PreImportConfig {
    ffi?: typeof ffi_type;
    ref?: typeof ref_type;
    refStructDI?: refStructDI_type;
    StructType?: StructType_type;
}
export declare let preImportConfig: PreImportConfig;
export declare function SupplyConfig(config: PreImportConfig): void;
export {};
