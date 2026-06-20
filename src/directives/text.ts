import type { Directive } from "@wyvernjs/core";

export const text: Directive = {
  name: "w-text",
  handler({ el, evaluate, scope, expression, watch }) {
    watch(
      () => evaluate(scope, expression!, el),
      (value) => el.textContent = value,
      { immediate: true },
    );
  },
};
