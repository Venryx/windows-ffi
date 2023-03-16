import { ffi, ref } from "../Manager.js";
var user32 = new ffi.Library("user32", {
    "GetForegroundWindow": ["int32", []],
    "GetWindowTextA": ["int32", ["int32", "string", "int32"]],
    //"GetWindowTextW": ["int32", ["int32", ref.refType("string"), "int32"]],
});
var GetForegroundWindowHandle_cache = {};
export function GetForegroundWindowHandle(allowCacheWithin = 100) {
    if (Date.now() - GetForegroundWindowHandle_cache.time <= allowCacheWithin)
        return GetForegroundWindowHandle_cache.value;
    const result = user32.GetForegroundWindow();
    Object.assign(GetForegroundWindowHandle_cache, { value: result, time: Date.now() });
    return result;
}
const GetForegroundWindowText_buffer = Buffer.alloc(8192); // 8192 is first pow-of-2 which works for max-title-length Chrome tabs
GetForegroundWindowText_buffer["type"] = ref.types.CString; // when commented, apparently works fine anyway! (still keeping though, jic)
var GetForegroundWindowText_cache = {};
export function GetForegroundWindowText(allowCacheWithin = 100) {
    if (Date.now() - GetForegroundWindowText_cache.time <= allowCacheWithin)
        return GetForegroundWindowText_cache.value;
    //buffer.type = ref.types.CString;
    var handle = GetForegroundWindowHandle();
    const result = GetWindowText(handle);
    Object.assign(GetForegroundWindowText_cache, { value: result, time: Date.now() });
    return result;
}
export const windowTextCaches = new Map();
export function GetWindowText(windowHandle, allowCacheWithin = 100) {
    var _a, _b;
    if (Date.now() - ((_b = (_a = windowTextCaches.get(windowHandle)) === null || _a === void 0 ? void 0 : _a.time) !== null && _b !== void 0 ? _b : 0) <= allowCacheWithin)
        return windowTextCaches.get(windowHandle).value;
    //buffer.type = ref.types.CString;
    let length = user32.GetWindowTextA(windowHandle, GetForegroundWindowText_buffer, GetForegroundWindowText_buffer.length);
    const result = GetForegroundWindowText_buffer.toString().substr(0, length);
    windowTextCaches.set(windowHandle, { value: result, time: Date.now() });
    return result;
}
