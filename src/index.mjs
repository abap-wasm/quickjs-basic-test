import variant from "@jitl/quickjs-wasmfile-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import * as fs from "fs";

const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
const vm = QuickJS.newContext();

const input = fs.readFileSync("input.js", "utf8");

let result = vm.evalCode(input);
if (result.error) {
  console.log("Execution failed:", vm.dump(result.error))
  result.error.dispose()
} else {
  console.log("Success:", vm.dump(result.value))
  result.value.dispose()
}
/*
const foo = vm.unwrapResult(result);
console.dir(foo + " ");
*/

//const unwrap =
/*
const foo = vm.dump(unwrap);
console.dir(foo);
*/
//console.dir(vm.getNumber(unwrap));