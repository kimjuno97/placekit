import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const spin = keyframes({
  to: {
    transform: "rotate(360deg)",
  },
});

export const spinnerStyle = recipe({
  base: {
    display: "inline-block",
    boxSizing: "border-box",
    borderStyle: "solid",
    borderRadius: 999,
    animation: `${spin} 800ms linear infinite`,
  },
  variants: {
    size: {
      small: {
        width: 16,
        height: 16,
        borderWidth: 2,
      },
      medium: {
        width: 24,
        height: 24,
        borderWidth: 3,
      },
      large: {
        width: 36,
        height: 36,
        borderWidth: 4,
      },
    },
    tone: {
      primary: {
        borderColor: "rgba(49, 130, 246, 0.22)",
        borderTopColor: "#3182F6",
      },
      neutral: {
        borderColor: "rgba(107, 118, 132, 0.22)",
        borderTopColor: "#6B7684",
      },
      inverse: {
        borderColor: "rgba(255, 255, 255, 0.28)",
        borderTopColor: "#FFFFFF",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    tone: "primary",
  },
});

export const visuallyHiddenStyle = style({
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
});
