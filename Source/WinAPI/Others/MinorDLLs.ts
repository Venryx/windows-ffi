import ffi from "ffi-napi";
import ref from "ref-napi";

export enum SuspendState {
	Sleep,
}

var powrprof = ffi.Library("powrprof.dll", {
	SetSuspendState: ["int", ["int", "int", "int"]]
});
export function SetSuspendState(state: SuspendState) {
	if (state == SuspendState.Sleep) {
		powrprof.SetSuspendState(0, 0, 0);
	}
}