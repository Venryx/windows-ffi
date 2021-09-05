import {ffi} from "../../Manager.js";

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