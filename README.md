# Windows FFI

NodeJS wrappers around Windows p-invoke/dll functions in user32, gdi32, etc. (based on node-ffi-napi)

## Installation

* 1\) Install `ffi-napi` in your project: `npm i ffi-napi`
	* 1.1\) You may need to install the windows-build-tools first for `ffi-napi` to be able to build: `npm install --global --production windows-build-tools`
* 2\) Install: `npm i windows-ffi`
	* 2.1\) If you're using `windows-ffi` in symlinked mode (**ie. you probably don't need this step!**), supply the parent project's copy of the `node-ffi` libraries using the init code below:
		```
		// Make sure the code below runs before windows-ffi is imported! (example approach: https://stackoverflow.com/a/42817956)
		import ffi from "ffi-napi";
		import ref from "ref-napi";
		import refStructDI from "ref-struct-di";
		import {SupplyConfig} from "windows-ffi/Dist/@UserSupplied/PreImportConfig.js";

		SupplyConfig({ffi, ref, refStructDI});
		```

## Usage

While this library is meant to gradually expand to cover more of the Windows API, it will never be 100%, because it's a "develop as you need it" sort of endeavor.

Some of the most common and/or noteworthy functionalities are shown below.

### Capture image-data from a region on-screen

```typescript
import {VRect, CaptureScreenshot, GetForegroundWindowHandle} from "windows-ffi";

// First capture a screenshot of a section of the screen.
const screenshot = CaptureScreenshot({
	windowHandle: GetForegroundWindowHandle(), // comment to screenshot all windows
	rectToCapture: new VRect(0, 0, 800, 600),
});

// The image-data is now stored in the `screenshot.buffer` Buffer object.
// Access it directly (and cheaply) using the helper functions on `screenshot`.
for (let x = 0; x < 800; x++) {
	console.log(`Pixel color at [${x}, 0] is:`, screenshot.GetPixel(x, 0).ToHex_RGB());
}
```

Performance:
* Full-screen (2560x1440), all windows (ie. "desktop" window): ~80ms
* Full-screen (2560x1440), single window: ~20ms
* Region (700x200), all windows (ie. "desktop" window): ~50ms
* Region (700x200), single window: ~4ms

## Tasks

General:
* Create an accompanying library for Windows-specific functionalities that do not require the `ffi-napi` dependency. (I've had pains with ffi-related building during NodeJS updates, so things that can be done without that dependency is beneficial to bundle separately)
