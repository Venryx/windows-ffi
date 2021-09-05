import ffi from "ffi-napi";
import ref from "ref-napi";
import import_Struct from "ref-struct-di";
const Struct = import_Struct(ref);

export const IntPtr = ref.refType("int");
export const PointStruct = Struct({
	x: ffi.types.long,
	y: ffi.types.long,
});
export const RectStruct = Struct({
	left: ffi.types.long,
	top: ffi.types.long,
	right: ffi.types.long,
	bottom: ffi.types.long
});
export const RectPtr = ref.refType(RectStruct) as any;

export enum BitmapCompressionMode {
   BI_RGB = 0,
   BI_RLE8 = 1,
   BI_RLE4 = 2,
   BI_BITFIELDS = 3,
   BI_JPEG = 4,
   BI_PNG = 5
}
export enum DIB_Color_Mode {
   DIB_RGB_COLORS = 0,
   DIB_PAL_COLORS = 1
}

// https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-bitmap
export const BitmapStruct = Struct({
	bmType: ffi.types.long,
	bmWidth: ffi.types.long,
	bmHeight: ffi.types.long,
	bmWidthBytes: ffi.types.long,
   bmPlanes: ffi.types.uint16,
   bmBitsPixel: ffi.types.uint16, // BitmapCompressionMode
   //pointerPadding: ffi.types.long, // added from SO answer below, but shouldn't be necessary I think
   //bmBits: ffi.types.void,
   //bmBits: "pointer",
   bmBits: "ulonglong", // ?
   
   // from: https://stackoverflow.com/q/65099086
   /*bmType: ffi.types.long,
   bmWidth: ffi.types.long,
   bmHeight: ffi.types.long,
   bmWidthBytes: ffi.types.long,
   bmPlanes: ffi.types.uint,
   bmBitsPixel: ffi.types.uint,
   pointerPadding: ffi.types.long,
   bmBits: ffi.types.ulonglong,*/
});

// https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-bitmapinfoheader
export const BitmapInfoHeaderStruct = Struct({
	// from docs (linked above)
   biSize: ffi.types.uint32,
	biWidth: ffi.types.int32,
	biHeight: ffi.types.int32,
	biPlanes: ffi.types.ushort,
   biBitCount: ffi.types.ushort,
   biCompression: ffi.types.uint32, // BitmapCompressionMode
   biSizeImage: ffi.types.uint32,
   biXPelsPerMeter: ffi.types.int32,
   biYPelsPerMeter: ffi.types.int32,
   biClrUsed: ffi.types.uint32,
   biClrImportant: ffi.types.uint32,
   // from known working: https://stackoverflow.com/q/65099086
   /*biSize: ffi.types.ulong,
	biWidth: ffi.types.long,
	biHeight: ffi.types.long,
	biPlanes: ffi.types.uint,
   biBitCount: ffi.types.uint,
   biCompression: ffi.types.ulong, // BitmapCompressionMode
   biSizeImage: ffi.types.ulong,
   biXPelsPerMeter: ffi.types.long,
   biYPelsPerMeter: ffi.types.long,
   biClrUsed: ffi.types.ulong,
   biClrImportant: ffi.types.ulong,*/
});

export const ColorRefStruct = Struct({
   red: ffi.types.byte,
	green: ffi.types.byte,
	blue: ffi.types.byte,
	alpha: ffi.types.byte,
});