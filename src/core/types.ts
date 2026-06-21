import type { computed, Ref, watch } from "@vue/reactivity";

export interface Directive {
  name: string;
  handler: DirectiveHandler;
}

export interface DirectiveHandler {
  (ctx: DirectiveContext): () => void;
}

export interface DirectiveContext {
  // deno-lint-ignore no-explicit-any
  evaluate: (scope: Scope, exp: string, el: Element) => () => any;
  scope: Scope;
  el: Element;
  computed: typeof computed;
  watch: typeof watch;
  expression: string | null;
  argument: string | null;
  modifiers: string[];
}

export type Scope = Ref<object[]>;
