import { ffi } from "../../Manager.js";
export var SuspendState;
(function (SuspendState) {
    SuspendState[SuspendState["Sleep"] = 0] = "Sleep";
})(SuspendState || (SuspendState = {}));
var powrprof = ffi.Library("powrprof.dll", {
    SetSuspendState: ["int", ["int", "int", "int"]]
});
export function SetSuspendState(state) {
    if (state == SuspendState.Sleep) {
        powrprof.SetSuspendState(0, 0, 0);
    }
}
