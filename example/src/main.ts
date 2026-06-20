import { Wyvern } from "@wyvernjs/core";
import { on, scope, text } from "@wyvernjs/directives";

Wyvern.directive(scope);
Wyvern.directive(text);
Wyvern.directive(on);

new Wyvern();
