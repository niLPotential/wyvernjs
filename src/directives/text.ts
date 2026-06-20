import type { Directive } from "@wyvernjs/core";

export const text: Directive = {
  name: "w-text",
  handle({ el, evaluate, scope, expression, watch }) {
    watch(
      () => evaluate(scope, expression!, el),
      (value) => el.textContent = value,
      { immediate: true },
    );
  },
};
