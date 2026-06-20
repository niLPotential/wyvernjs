import { Wyvern } from "@wyvernjs/core";
import { computed, on, scope, text } from "@wyvernjs/directives";

Wyvern.directive(scope);
Wyvern.directive(computed);
Wyvern.directive(text);
Wyvern.directive(on);

new Wyvern();
