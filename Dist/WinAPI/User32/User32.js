import { PointStruct, RectStruct } from "../@Shared/Structs.js";
import ref from "ref-napi";
import { FFI_Library } from "../@Shared/Utils.js";
export const user32 = FFI_Library("user32", {
    ClipCursor: ["bool", [RectStruct]],
    //ClipCursor: ["bool", [RectPtr]],
    mouse_event: ["void", ["int32", "int32", "int32", "int32", "int32"]],
    //GetCursorPos: ["bool", ["pointer"]],
    GetCursorPos: ["bool", [ref.refType(PointStruct)]],
    SetCursorPos: ["long", ["long", "long"]],
    //SendMessageA: ["int64", ["int32", "uint32", "int32", "int32"]]
    SendMessageA: ['int32', ['long', 'int32', 'long', 'int32']],
    PostMessageA: ['int32', ['long', 'int32', 'long', 'int32']],
    //WindowFromPoint: ["int", [PointStruct]],
    SystemParametersInfoA: ['bool', ['uint', 'uint', 'pointer', 'uint']],
    GetDC: ["ulong", ["int32"]],
    ReleaseDC: ["ulong", ["uint32", "uint32"]],
    GetDesktopWindow: ["int32", []],
    GetClientRect: ["int32", ["int32", ref.refType(RectStruct)]], // https://www.pinvoke.net/default.aspx/user32.getclientrect
});
