import type { Directive } from "@wyvernjs/core";

export const bind: Directive = {
  name: "w-bind",
  handler({ evaluate, scope, el, expression, watch }) {
    watch(
      evaluate(scope, expression!, el),
      (bindings: Record<string, string>) => {
        for (const [name, value] of Object.entries(bindings)) {
          el.setAttribute(name, value);
        }
      },
      { immediate: true },
    );
  },
};
