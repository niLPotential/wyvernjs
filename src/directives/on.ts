import type { Directive } from "@wyvernjs/core";

export const on: Directive = {
  name: "w-on",
  handler({ el, evaluate, scope, argument, expression }) {
    el.addEventListener(argument!, evaluate(scope, expression!, el));
  },
};
