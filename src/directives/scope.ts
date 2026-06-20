import type { Directive } from "@wyvernjs/core";

export const scope: Directive = {
  name: "w-scope",
  handle({ el, evaluate, scope, expression, watch }) {
    watch(
      () => evaluate(scope, expression!, el),
      (data) => Object.assign(scope.value, data),
      { immediate: true },
    );
  },
};
