import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const spin = keyframes({
  to: {
    transform: "rotate(360deg)",
  },
});

const bounce = keyframes({
  "0%, 80%, 100%": {
    opacity: 0.45,
    transform: "translateY(0) scale(0.78)",
  },
  "40%": {
    opacity: 1,
    transform: "translateY(-5px) scale(1)",
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
      warning: {
        borderColor: "rgba(178, 107, 0, 0.22)",
        borderTopColor: "#B26B00",
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const dotsStyle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  variants: {
    size: {
      small: {
        height: 16,
      },
      medium: {
        height: 24,
      },
      large: {
        height: 36,
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const dotStyle = recipe({
  base: {
    display: "block",
    borderRadius: 999,
    animation: `${bounce} 900ms ease-in-out infinite`,
  },
  variants: {
    size: {
      small: {
        width: 4,
        height: 4,
      },
      medium: {
        width: 6,
        height: 6,
      },
      large: {
        width: 8,
        height: 8,
      },
    },
    tone: {
      primary: {
        background: "#3182F6",
      },
      neutral: {
        background: "#6B7684",
      },
      inverse: {
        background: "#FFFFFF",
      },
      warning: {
        background: "#B26B00",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    tone: "primary",
  },
});

export const dotDelaySecondStyle = style({
  animationDelay: "120ms",
});

export const dotDelayThirdStyle = style({
  animationDelay: "240ms",
});

export const visuallyHiddenStyle = style({
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
});
