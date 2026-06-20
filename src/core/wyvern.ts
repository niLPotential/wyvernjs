import type { Ref } from "@vue/reactivity";
import { computed, ref, watch } from "@vue/reactivity";
import type { Directive, DirectiveContext } from "./types.ts";
import { evaluate } from "./evaluate.ts";

export class Wyvern {
  global: Ref;

  constructor() {
    this.global = ref<object>({});

    const roots = Array.from(document.querySelectorAll("[w-scope]"))
      .filter((root) => !root.matches("[w-scope] [w-scope]"));
    roots.forEach((root) => this.walk(root, this.global));
  }

  private apply(el: Element, scope: Ref) {
    const dirs = Array.from(Wyvern.directives.keys());
    el.getAttributeNames()
      .map((name) => {
        const expression = el.getAttribute(name);
        const [attr, ...modifiers] = name.split(".");
        const argIndex = attr.indexOf(":");
        const dirName = argIndex > 0 ? attr.substring(0, argIndex) : attr;
        const argument = argIndex > 0 ? attr.substring(argIndex + 1) : null;
        return { dirName, argument, modifiers, expression };
      })
      .filter(({ dirName }) => Wyvern.directives.has(dirName))
      .sort((a, b) => dirs.indexOf(a.dirName) - dirs.indexOf(b.dirName))
      .forEach(({ dirName, ...dir }) =>
        Wyvern.directives.get(dirName)!({
          el,
          scope,
          evaluate,
          computed,
          watch,
          ...dir,
        })
      );
  }

  private walk(el: Element, scope: Ref) {
    this.apply(el, scope);

    let child = el.firstElementChild;
    while (child) {
      this.walk(child, scope);
      child = child.nextElementSibling;
    }
  }

  static directives = new Map<string, (ctx: DirectiveContext) => void>();

  static directive(d: Directive) {
    this.directives.set(d.name, d.handler);
  }
}
