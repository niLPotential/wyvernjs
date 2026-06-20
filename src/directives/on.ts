import type { Directive } from "@wyvernjs/core";

export const on: Directive = {
  name: "w-on",
  handle({ el, evaluate, scope, argument, expression }) {
    const handler = evaluate(scope, expression!, el);
    el.addEventListener(argument!, handler);
  },
};
