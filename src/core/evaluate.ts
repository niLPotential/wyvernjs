// From https://github.com/vuejs/petite-vue/blob/main/src/eval.ts

// deno-lint-ignore-file ban-types
import type { Ref } from "@vue/reactivity";

const evalMemo = new Map<string, Function>();

export const evaluate = (scope: Ref, exp: string, el: Element) =>
  execute(scope, `return(${exp})`, el);

export const execute = (scope: Ref, exp: string, el: Element) => {
  if (!evalMemo.has(exp)) evalMemo.set(exp, toFunction(exp));
  const fn = evalMemo.get(exp)!;
  try {
    return fn(scope.value, el);
  } catch (e) {
    console.error(e);
  }
};

const toFunction = (exp: string): Function => {
  try {
    return new Function(`$data`, `$el`, `with($data){${exp}}`);
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${exp}`);
    return () => {};
  }
};
