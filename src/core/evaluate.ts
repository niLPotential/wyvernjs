import type { Scope } from "./types.ts";

export function evaluate(scope: Scope, exp: string, el: Element) {
  // deno-lint-ignore no-explicit-any
  return toFunction(exp).bind(null, collapse(scope), el) as () => any;
}

function collapse(scope: Scope) {
  return new Proxy(scope, {
    ownKeys(target) {
      return target.value.flatMap((o) => Object.keys(o));
    },
    has(target, name) {
      return target.value.some((o) =>
        Object.hasOwn(o, name) || Reflect.has(o, name)
      );
    },
    get(target, name, receiver) {
      return Reflect.get(
        target.value.findLast((o) => Reflect.has(o, name)) ?? {},
        name,
        receiver,
      );
    },
    set(target, name, receiver) {
      return Reflect.set(
        target.value.findLast((o) => Reflect.has(o, name)) ??
          target.value[target.value.length - 1],
        name,
        receiver,
      );
    },
  });
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
