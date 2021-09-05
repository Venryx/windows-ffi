import { Vector2, VRect } from "js-vextensions";
import { user32, gdi32, kernel32 } from "../index.js";
import { RectStruct, BitmapStruct, BitmapInfoHeaderStruct, BitmapCompressionMode, DIB_Color_Mode } from "../WinAPI/@Shared/Structs.js";
import { GetForegroundWindowHandle } from "./General.js";
import { VColor } from "./Graphics.js";
// this approach is called "Fast", but it"s more like "Batched" or "Bulk" -- ie. it"s faster if you have lots of pixels to check, but slower for checking just one (I think)
export function GetPixelColor_Fast(x, y) {
    return GetPixelColors_Fast([new Vector2(x, y)])[0];
}
export function GetPixelColors_Fast(positions) {
    const { rect, screenshot } = CaptureScreenshotOfRectContainingAllPositions(positions);
    return positions.map(pos => {
        return screenshot.GetPixel(pos.x - rect.x, pos.y - rect.y);
    });
}
export function CaptureScreenshotOfRectContainingAllPositions(positions) {
    const rectContainingAllPositions = new VRect(positions[0], new Vector2(1, 1));
    for (const pos of positions) {
        rectContainingAllPositions.Encapsulate(new VRect(pos, new Vector2(1, 1)));
    }
    const screenshot = CaptureScreenshot({
        windowHandle: GetForegroundWindowHandle(),
        rectToCapture: rectContainingAllPositions,
    });
    return { rect: rectContainingAllPositions, screenshot };
}
// full-fledged screenshot taking
// ==========
export class Screenshot {
    constructor(data) {
        Object.defineProperty(this, "buffer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, data);
    }
    GetPixel(...args) {
        const pos = args.length == 1 ? args[0] : new Vector2(args[0], args[1]);
        const pixelsInPreviousRows = this.width * pos.y;
        const pixelIndex = pixelsInPreviousRows + pos.x;
        return new VColor(
        // yeah, the order is a bit odd
        this.buffer[(pixelIndex * 4) + 2], this.buffer[(pixelIndex * 4) + 1], this.buffer[(pixelIndex * 4) + 0], this.buffer[(pixelIndex * 4) + 3]);
    }
}
const apiConstants = {
    SRCCOPY: 0xCC0020,
};
export function CaptureScreenshot(opt) {
    var _a;
    let hdcWindow = null;
    let hdcMemDC = null;
    let hbmScreen = null;
    let hDIB = null;
    const logOrTime = opt.log || opt.time;
    let lastStepTime = Date.now();
    const log = !logOrTime ? () => { } : (...args) => {
        if (opt.time) {
            var timeSinceLastStep = Date.now() - lastStepTime;
            lastStepTime = Date.now();
            args.push("@Time:", timeSinceLastStep);
        }
        const fullLogging = opt.log || args.every(a => (a + "").length < 30);
        if (fullLogging) {
            return console.log(...args);
        }
        // only "time" was specified; log shortened version
        return console.log(args[0], "<time log only>", ...args.slice(-2));
    };
    try {
        if (opt.windowHandle == null)
            opt.windowHandle = user32.GetDesktopWindow();
        log("hWnd", opt.windowHandle);
        // Retrieve the handle to a display device context for the client area of the window.
        hdcWindow = user32.GetDC(opt.windowHandle);
        log("hdcWindow", hdcWindow);
        const rcClient = new RectStruct();
        /*const rcClient_buf = ref.alloc(RectStruct) as any;
        user32.GetClientRect(hWnd, rcClient_buf);
        const rcClient = rcClient_buf.deref();*/
        user32.GetClientRect(opt.windowHandle, rcClient.ref());
        log("rcClient", JSON.stringify(rcClient));
        opt.rectToCapture = (_a = opt.rectToCapture) !== null && _a !== void 0 ? _a : new VRect(0, 0, rcClient.right - rcClient.left, rcClient.bottom - rcClient.top);
        // Create a compatible DC and bitmap
        hdcMemDC = gdi32.CreateCompatibleDC(hdcWindow);
        log("hdcMemDC", hdcMemDC);
        hbmScreen = gdi32.CreateCompatibleBitmap(hdcWindow, opt.rectToCapture.width, opt.rectToCapture.height);
        log("hbmScreen", hbmScreen);
        const hPrevDC = gdi32.SelectObject(hdcMemDC, hbmScreen);
        log("hPrevDC", hPrevDC);
        // Bit block transfer into our compatible memory DC.
        const bitBlt_result = gdi32.BitBlt(hdcMemDC, 0, 0, opt.rectToCapture.width, opt.rectToCapture.height, hdcWindow, opt.rectToCapture.x, opt.rectToCapture.y, apiConstants.SRCCOPY);
        const pixelWnd = gdi32.GetPixel(hdcWindow, 0, 0);
        const pixelMem = gdi32.GetPixel(hdcMemDC, 0, 0);
        log("pixelWnd", JSON.stringify(pixelWnd));
        log("pixelMem", JSON.stringify(pixelMem));
        log("bitBlt_result", JSON.stringify(bitBlt_result));
        //const getBufferLength = buffer=>buffer.length;
        //const getBufferLength = buffer=>Buffer.byteLength(buffer);
        //const getBufferLength = buffer=>buffer.toString("ascii").length;
        //const getBufferLength = buffer=>32; // can"t get this working; hard-coding for now
        //const getBufferLength = buffer=>buffer.type.size; // correct
        // Get the BITMAP from the HBITMAP
        const bmpScreen = new BitmapStruct();
        //const getObjectRes = gdi32.GetObjectA(hbmScreen, getBufferLength(bmpScreen), bmpScreen);
        const getObject_result = gdi32.GetObjectA(hbmScreen, 32, bmpScreen.ref());
        log("getObject_result", getObject_result);
        log("bmpScreen.size", BitmapStruct.size);
        log("bmpScreen", JSON.stringify(bmpScreen));
        // bmpScreen isn"t having its data loaded properly fsr; anyway, we only actually use bmWidth and bmHeight, so just hard-code those for now
        /*bmpScreen.bmWidth = rcClient.right - rcClient.left;
        bmpScreen.bmHeight = rcClient.bottom - rcClient.top;*/
        const bi = new BitmapInfoHeaderStruct();
        //bi.biSize = bi.type.size;
        bi.biSize = BitmapInfoHeaderStruct.size;
        bi.biWidth = bmpScreen.bmWidth;
        //bi.biHeight = bmpScreen.bmHeight;
        bi.biHeight = -bmpScreen.bmHeight; // by making this negative, we indicate that we want buffer"s data to start at top-left pixel, rather than bottom-left
        //bi.biHeight = 3;
        bi.biPlanes = 1;
        bi.biBitCount = 32;
        bi.biCompression = BitmapCompressionMode.BI_RGB;
        bi.biSizeImage = 0;
        bi.biXPelsPerMeter = 0;
        bi.biYPelsPerMeter = 0;
        bi.biClrUsed = 0;
        bi.biClrImportant = 0;
        log("bi", JSON.stringify(bi));
        const bitsPerRow = ((bmpScreen.bmWidth * bi.biBitCount + 31) / 32) * 4;
        const dwBmpSize = bitsPerRow * bmpScreen.bmHeight;
        log("dwBmpSize", dwBmpSize);
        // Starting with 32-bit Windows, GlobalAlloc and LocalAlloc are implemented as wrapper functions that
        // call HeapAlloc using a handle to the process"s default heap. Therefore, GlobalAlloc and LocalAlloc
        // have greater overhead than HeapAlloc.
        // hDIB = kernel32.GlobalAlloc(apiConstants.GHND, dwBmpSize);
        // const lpBitmap = kernel32.GlobalLock(hDIB);
        //const lpBitmap = new (Buffer.alloc as any)(dwBmpSize);
        const lpBitmap = Buffer.alloc(dwBmpSize);
        // Gets the "bits" from the bitmap and copies them into buffer lpbitmap
        //const getDIBitsRes = gdi32.GetDIBits(hdcWindow, hbmScreen, 0, bmpScreen.bmHeight, (lpBitmap as any).ref(), bi.ref(), DIB_Color_Mode.DIB_RGB_COLORS);
        const getDIBitsRes = gdi32.GetDIBits(hdcWindow, hbmScreen, 0, bmpScreen.bmHeight, lpBitmap, bi.ref(), DIB_Color_Mode.DIB_RGB_COLORS);
        //const getDIBitsRes = gdi32.GetDIBits(hdcWindow, hbmScreen, 0, 3, ref.ref(lpBitmap), bi.ref(), DIB_Color_Mode.DIB_RGB_COLORS);
        log("getDIBitsRes", getDIBitsRes);
        log("lpBitmap", lpBitmap);
        /*log("Starting test");
        for (let i = 0; i < lpBitmap.length; i += 4) {
            const color = new VColor(lpBitmap[i + 2], lpBitmap[i + 1], lpBitmap[i + 0], lpBitmap[i + 3]); // yeah, the order is a bit odd
            if (i < 4 * 20) log("Color:", color);
        }
        log("Test done");*/
        // clean up
        if (hDIB != null) {
            kernel32.GlobalUnlock(hDIB);
            kernel32.GlobalFree(hDIB);
        }
        if (hbmScreen != null)
            gdi32.DeleteObject(hbmScreen);
        if (hdcMemDC != null)
            gdi32.DeleteObject(hdcMemDC);
        if (hdcWindow != null)
            user32.ReleaseDC(opt.windowHandle, hdcWindow);
        const result = new Screenshot({
            buffer: lpBitmap,
            width: bmpScreen.bmWidth,
            height: bmpScreen.bmHeight,
        });
        result.buffer = lpBitmap;
        log("Done");
        return result;
    }
    catch (err) {
        // clean up memory on errors
        if (hDIB != null) {
            kernel32.GlobalUnlock(hDIB);
            kernel32.GlobalFree(hDIB);
        }
        if (hbmScreen != null)
            gdi32.DeleteObject(hbmScreen);
        if (hdcMemDC != null)
            gdi32.DeleteObject(hdcMemDC);
        if (hdcWindow != null)
            user32.ReleaseDC(opt.windowHandle, hdcWindow);
        throw err;
    }
}
