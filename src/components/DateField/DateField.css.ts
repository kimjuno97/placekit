import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const fieldRootStyle = recipe({
  base: {
    display: "inline-flex",
    flexDirection: "column",
    gap: 6,
    width: 320,
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

export const labelStyle = recipe({
  base: {
    color: "#4E5968",
    fontSize: 13,
    fontWeight: 750,
    lineHeight: 1.4,
  },
  variants: {
    tone: {
      default: {},
      error: {
        color: "#F04452",
      },
      disabled: {
        color: "#B0B8C1",
      },
    },
  },
});

export const inputWrapStyle = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 48,
    padding: "0 12px",
    border: "1px solid #D1D6DB",
    borderRadius: 12,
    background: "#FFFFFF",
    transition: "border-color 160ms ease, box-shadow 160ms ease",
    selectors: {
      "&:focus-within": {
        borderColor: "#3182F6",
        boxShadow: "0 0 0 3px rgba(49, 130, 246, 0.16)",
      },
    },
  },
  variants: {
    tone: {
      default: {},
      error: {
        borderColor: "#F04452",
        selectors: {
          "&:focus-within": {
            borderColor: "#F04452",
            boxShadow: "0 0 0 3px rgba(240, 68, 82, 0.16)",
          },
        },
      },
      disabled: {
        background: "#F2F4F6",
        borderColor: "#E5E8EB",
      },
    },
  },
});

export const inputStyle = style({
  width: "100%",
  minWidth: 0,
  border: 0,
  background: "transparent",
  color: "#191F28",
  fontSize: 15,
  fontWeight: 700,
  outline: "none",
  selectors: {
    "&::placeholder": {
      color: "#B0B8C1",
      fontWeight: 600,
    },
    "&:disabled": {
      color: "#8B95A1",
      cursor: "not-allowed",
    },
  },
});

export const iconStyle = style({
  flex: "0 0 auto",
  color: "#8B95A1",
  fontSize: 16,
  lineHeight: 1,
});

export const clearButtonStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
  width: 24,
  height: 24,
  border: 0,
  borderRadius: 999,
  background: "transparent",
  color: "#8B95A1",
  cursor: "pointer",
  fontSize: 16,
  selectors: {
    "&:hover": {
      background: "#F2F4F6",
      color: "#4E5968",
    },
    "&:focus-visible": {
      outline: "3px solid rgba(49, 130, 246, 0.2)",
      outlineOffset: 2,
    },
  },
});

export const helperTextStyle = recipe({
  base: {
    fontSize: 12,
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
