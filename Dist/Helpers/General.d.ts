export declare type QuickCache<T> = {
    value: T;
    time: number;
};
export declare function GetForegroundWindowHandle(allowCacheWithin?: number): number;
export declare function GetForegroundWindowText(allowCacheWithin?: number): string;
export declare const windowTextCaches: Map<number, QuickCache<string>>;
export declare function GetWindowText(windowHandle: number, allowCacheWithin?: number): string;
