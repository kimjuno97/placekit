import { recipe } from "@vanilla-extract/recipes";

export const badgeStyle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    border: "1px solid transparent",
    borderRadius: 999,
    fontWeight: 800,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  variants: {
    variant: {
      neutral: {
        background: "#F2F4F6",
        color: "#4E5968",
      },
      info: {
        background: "#E8F3FF",
        color: "#1B64DA",
      },
      success: {
        background: "#EAFBF0",
        color: "#008A3E",
      },
      warning: {
        background: "#FFF6DB",
        color: "#B26B00",
      },
      danger: {
        background: "#FFF0F1",
        color: "#D92D20",
      },
      outline: {
        background: "#FFFFFF",
        borderColor: "#D1D6DB",
        color: "#4E5968",
      },
    },
    size: {
      small: {
        minHeight: 22,
        padding: "0 8px",
        fontSize: 12,
      },
      medium: {
        minHeight: 26,
        padding: "0 10px",
        fontSize: 13,
      },
      large: {
        minHeight: 30,
        padding: "0 12px",
        fontSize: 14,
      },
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "neutral",
  },
});
