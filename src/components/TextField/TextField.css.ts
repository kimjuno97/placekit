import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const fieldRoot = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {
        width: 320,
      },
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export const labelStyle = style({
  color: "#191F28",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.4,
});

export const inputStyle = recipe({
  base: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #D1D6DB",
    borderRadius: 12,
    background: "#FFFFFF",
    color: "#191F28",
    fontWeight: 600,
    outline: "none",
    transition: "border-color 160ms ease, box-shadow 160ms ease",
    selectors: {
      "&::placeholder": {
        color: "#8B95A1",
        fontWeight: 500,
      },
      "&:focus": {
        borderColor: "#3182F6",
        boxShadow: "0 0 0 3px rgba(49, 130, 246, 0.16)",
      },
      "&:disabled": {
        background: "#F2F4F6",
        color: "#8B95A1",
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      small: {
        height: 40,
        padding: "0 12px",
        fontSize: 14,
      },
      medium: {
        height: 48,
        padding: "0 14px",
        fontSize: 15,
      },
      large: {
        height: 56,
        padding: "0 16px",
        fontSize: 16,
      },
    },
    tone: {
      default: {},
      error: {
        borderColor: "#F04452",
        selectors: {
          "&:focus": {
            borderColor: "#F04452",
            boxShadow: "0 0 0 3px rgba(240, 68, 82, 0.16)",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
    tone: "default",
  },
});

export const descriptionStyle = recipe({
  base: {
    fontSize: 13,
    lineHeight: 1.45,
  },
  variants: {
    tone: {
      helper: {
        color: "#6B7684",
      },
      error: {
        color: "#F04452",
      },
    },
  },
});
