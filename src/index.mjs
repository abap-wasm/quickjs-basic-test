import variant from "@jitl/quickjs-wasmfile-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"

const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
const vm = QuickJS.newContext()

const result = vm.evalCode(`1 + 5;`);
const unwrap = vm.unwrapResult(result);
console.dir(vm.getNumber(unwrap));