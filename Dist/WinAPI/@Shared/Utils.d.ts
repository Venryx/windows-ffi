export declare function FFI_Library<T extends {
    [key: string]: any;
}>(dll: string, shape: T): { [P in keyof T]: Function; };
