# Windows FFI

NodeJS wrappers around Windows p-invoke/dll functions in user32, gdi32, etc. (based on node-ffi-napi)

## Installation

```
npm i windows-ffi
```

Note: You may need to install the windows-build-tools for the `node-ffi-napi` dependency to be able to build. (command: `npm install --global --production windows-build-tools`)

## Usage

While this library is meant to gradually expand to cover more of the Windows API, it will never be 100%, because it's a "develop as you need it" sort of endeavor.

Some of the most common and/or noteworthy functionalities are shown below.

### Capture image-data from a region on-screen

```typescript
import {VRect, CaptureScreenshot, GetForegroundWindowHandle} from "windows-ffi";

// First capture a screenshot of a section of the screen.
const rectToCapture = new VRect(0, 0, 800, 600);
const screenshot = CaptureScreenshot({
	windowHandle: GetForegroundWindowHandle(),
	rectToCapture,
});

// The image-data is now stored in the `screenshot.buffer` Buffer object.
// Access directly (and cheaply) using the helper functions on `screenshot`.
for (let x = 0; x < 800; x++) {
	console.log(`Pixel color at [${x}, 0] is:`, screenshot.GetPixel(x, 0).ToHex_RGB());
}
```

## Tasks

General:
* Create an accompanying library for Windows-specific functionalities that do not require the `node-ffi-napi` dependency. (I've had pains with ffi-related building during NodeJS updates, so things that can be done without that dependency is beneficial to bundle separately)