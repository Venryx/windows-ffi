// todo: maybe remove the jsve subdep (and just include what is needed directly)
export {Vector2, VRect} from "js-vextensions";

export * from "./Manager.js";

// raw windows api
export * from "./WinAPI/@Shared/Structs.js";
export * from "./WinAPI/GDI32/GDI32.js";
export * from "./WinAPI/Kernel32/Kernel32.js";
export * from "./WinAPI/Others/MinorDLLs.js";
export * from "./WinAPI/User32/User32.js";

// helpers
export * from "./Helpers/General.js";
export * from "./Helpers/Graphics.js";
export * from "./Helpers/ScreenCapture.js";