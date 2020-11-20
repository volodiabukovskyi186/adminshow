import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from "@angular/animations";

const TIME = ".3s";
const FN = "cubic-bezier(0.83, 0, 0.17, 1)"; //"ease-in-out";

export let changeValueHighlight = trigger("changeValueHighlight", [
  transition("void => *", []), // when the item is created
  transition("* => void", []), // when the item is removed
  transition("* => *", [
    // when the item is changed
    animate(
      `.5s ${FN}`,
      keyframes([
        // animate for 1200 ms
        style({ transform: "scale(1)" }),
        style({ transform: "scale(1.5)" }),
        style({ transform: "scale(1)" }),
      ])
    ),
  ]),
]);

export let fade = trigger("fade", [
  transition(":enter", [
    style({ opacity: "0" }),
    animate(`${TIME} ${FN}`, style({ opacity: "1" })),
  ]),
  transition(":leave", [
    style({ opacity: "1" }),
    animate(`${TIME} ${FN}`, style({ opacity: "0" })),
  ]),
]);
export let fadeScale = trigger("fadeScale", [
  transition(":enter", [
    style({ opacity: "0", transform: "scale(0)" }),
    animate(`${TIME} ${FN}`, style({ opacity: "1", transform: "scale(1)" })),
  ]),
  transition(":leave", [
    style({ opacity: "1" }),
    animate(
      `${TIME} ${FN}`,
      style({ opacity: "0", transform: "scale(0)", width: "0", height: "0" })
    ),
  ]),
]);

export let deleted = trigger("deleted", [
  transition(":leave", [
    style({ opacity: "1" }),
    animate(
      `.5s ${FN}`,
      style({
        opacity: ".5",
        transform: "translateY(100vh) scale(.1)",
        width: "0",
        height: "0",
        zIndex: "100000",
      })
    ),
  ]),
]);

export let slideRight = trigger("slideRight", [
  transition(":enter", [
    style({ transform: "translateX(100%)" }),
    animate(`${TIME} ${FN}`, style({ transform: "translateX(0)" })),
  ]),
  transition(":leave", [
    style({ transform: "translateX(0)" }),
    animate(`${TIME} ${FN}`, style({ transform: "translateX(100%)" })),
  ]),
]);

export const scale = trigger("scale", [
  transition(":enter", [
    style({ transform: "scale(0)" }),
    animate(`${TIME} ${FN}`, style({ transform: "scale(1)" })),
  ]),
  transition(":leave", [
    style({ transform: "scale(1)" }),
    animate(`${TIME} ${FN}`, style({ transform: "scale(0)" })),
  ]),
]);

export const smallBar = trigger("scale", [
  transition(":enter", [
    style({ transform: "scale(0)" }),
    animate(`${TIME} ${FN}`, style({ width: "80" })),
  ]),
  transition(":leave", [
    style({ transform: "scale(1)" }),
    animate(`${TIME} ${FN}`, style({  width: "250" })),
  ]),
]);