import type { Directive } from "@wyvernjs/core";

export const scope: Directive = {
  name: "w-scope",
  handler({ el, evaluate, scope, expression }) {
    scope.value.push(evaluate(scope, expression!, el)());

    return () => scope.value.pop();
  },
};
