import type { Directive } from "@wyvernjs/core";

export const computed: Directive = {
  name: "w-computed",
  handler({ argument, el, scope, evaluate, expression, computed }) {
    scope.value.push({
      [argument!]: computed(evaluate(scope, expression!, el)),
    });

    return () => scope.value.pop();
  },
};
