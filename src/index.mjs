import variant from "@jitl/quickjs-wasmfile-debug-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"

const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
const vm = QuickJS.newContext()

const result = vm.evalCode(`1 + 5`);
vm.dump(result.value)