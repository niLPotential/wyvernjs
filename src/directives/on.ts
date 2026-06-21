import type { Directive } from "@wyvernjs/core";

export const on: Directive = {
  name: "w-on",
  handler({ el, evaluate, scope, argument, expression }) {
    const listener = evaluate(scope, expression!, el);
    el.addEventListener(argument!, listener);

    return () => el.removeEventListener(argument!, listener);
  },
};
