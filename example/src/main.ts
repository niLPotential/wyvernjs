import { Wyvern } from "@wyvernjs/core";
import { bind, computed, on, scope, text } from "@wyvernjs/directives";

Wyvern.directive(scope);
Wyvern.directive(computed);
Wyvern.directive(bind);
Wyvern.directive(text);
Wyvern.directive(on);

new Wyvern();
