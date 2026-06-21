import type { Directive } from "@wyvernjs/core";

export const scope: Directive = {
  name: "w-scope",
  handler({ el, evaluate, scope, expression }) {
    Object.assign(scope.value, evaluate(scope, expression!, el)());
  },
};
