import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const toastViewportStyle = recipe({
  base: {
    position: "fixed",
    zIndex: 1100,
    width: "min(360px, calc(100vw - 48px))",
  },
  variants: {
    position: {
      "top-left": {
        top: 24,
        left: 24,
      },
      "top-center": {
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
      },
      "top-right": {
        top: 24,
        right: 24,
      },
      "bottom-left": {
        bottom: 24,
        left: 24,
      },
      "bottom-center": {
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
      },
      "bottom-right": {
        right: 24,
        bottom: 24,
      },
    },
  },
  defaultVariants: {
    position: "top-center",
  },
});

export const toastStyle = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 12,
    alignItems: "flex-start",
    borderRadius: 14,
    border: "1px solid transparent",
    padding: 16,
    background: "#FFFFFF",
    color: "#191F28",
    boxShadow: "0 14px 40px rgba(0, 0, 0, 0.18)",
  },
  variants: {
    variant: {
      info: {
        borderColor: "#BBD7FF",
      },
      success: {
        borderColor: "#A8EAC0",
      },
      warning: {
        borderColor: "#FFE08A",
      },
      error: {
        borderColor: "#FFB4BA",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const contentStyle = style({
  minWidth: 0,
});

export const titleStyle = style({
  margin: 0,
  color: "#191F28",
  fontSize: 15,
  fontWeight: 800,
  lineHeight: 1.4,
});

export const descriptionStyle = style({
  margin: "4px 0 0",
  color: "#4E5968",
  fontSize: 14,
  lineHeight: 1.5,
});

export const actionStyle = style({
  marginTop: 12,
});

export const closeButtonStyle = style({
  width: 28,
  height: 28,
  border: 0,
  borderRadius: 999,
  background: "#F2F4F6",
  color: "#4E5968",
  cursor: "pointer",
  fontSize: 18,
  lineHeight: "28px",
  selectors: {
    "&:hover": {
      background: "#E5E8EB",
    },
    "&:focus-visible": {
      outline: "2px solid #3182F6",
      outlineOffset: 2,
    },
  },
});
