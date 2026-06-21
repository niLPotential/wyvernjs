import type { computed, Ref, watch } from "@vue/reactivity";

export interface Directive {
  name: string;
  handler: (ctx: DirectiveContext) => void;
}

export interface DirectiveContext {
  // deno-lint-ignore no-explicit-any
  evaluate: (scope: Ref, exp: string, el: Element) => () => any;
  scope: Ref<object>;
  el: Element;
  computed: typeof computed;
  watch: typeof watch;
  expression: string | null;
  argument: string | null;
  modifiers: string[];
}
