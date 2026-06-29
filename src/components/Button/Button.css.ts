// Button.css.ts
import { recipe } from "@vanilla-extract/recipes";

export const buttonRecipe = recipe({
  base: {
    border: 0,
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 160ms ease, transform 160ms ease",
    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.5,
      },
      "&:active:not(:disabled)": {
        transform: "scale(0.98)",
      },
    },
  },
  variants: {
    variant: {
      primary: {
        background: "#3182F6",
        color: "white",
      },
      secondary: {
        background: "#F2F4F6",
        color: "#191F28",
      },
      danger: {
        background: "#F04452",
        color: "white",
      },
    },
    size: {
      small: {
        height: 36,
        padding: "0 12px",
        fontSize: 14,
      },
      medium: {
        height: 44,
        padding: "0 16px",
        fontSize: 15,
      },
      large: {
        height: 52,
        padding: "0 20px",
        fontSize: 16,
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});
