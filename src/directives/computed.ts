import type { Directive } from "@wyvernjs/core";

export const computed: Directive = {
  name: "w-computed",
  handler({ argument, el, scope, evaluate, expression, computed }) {
    Object.assign(scope.value, {
      [argument!]: computed(evaluate(scope, expression!, el)),
    });
  },
};
