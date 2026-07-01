import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "100% 0",
  },
  "100%": {
    backgroundPosition: "-100% 0",
  },
});

export const skeletonStyle = recipe({
  base: {
    display: "block",
    overflow: "hidden",
    background:
      "linear-gradient(90deg, #F2F4F6 0%, #E5E8EB 40%, #F2F4F6 80%)",
    backgroundSize: "200% 100%",
    animation: `${shimmer} 1400ms ease-in-out infinite`,
  },
  variants: {
    radius: {
      none: {
        borderRadius: 0,
      },
      small: {
        borderRadius: 6,
      },
      medium: {
        borderRadius: 12,
      },
      round: {
        borderRadius: 999,
      },
    },
  },
  defaultVariants: {
    radius: "medium",
  },
});

export const skeletonTextGroupStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
});
