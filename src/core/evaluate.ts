import type { Ref } from "@vue/reactivity";

export function evaluate(scope: Ref, exp: string, el: Element) {
  // deno-lint-ignore no-explicit-any
  return toFunction(exp).bind(null, scope.value, el) as () => any;
}

// From https://github.com/vuejs/petite-vue/blob/main/src/eval.ts
function toFunction(exp: string) {
  try {
    return new Function(`$data`, `$el`, `with($data){return ${exp}}`);
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${exp}`);
    return () => {};
  }
}
