import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const overlayStyle = style({
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  background: "rgba(0, 0, 0, 0.48)",
});

export const dialogStyle = recipe({
  base: {
    width: "100%",
    maxHeight: "calc(100svh - 48px)",
    overflow: "hidden",
    borderRadius: 16,
    background: "#FFFFFF",
    color: "#191F28",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.24)",
    outline: "none",
  },
  variants: {
    size: {
      small: {
        maxWidth: 360,
      },
      medium: {
        maxWidth: 480,
      },
      large: {
        maxWidth: 640,
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const headerStyle = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  padding: "24px 24px 0",
});

export const titleStyle = style({
  margin: 0,
  color: "#191F28",
  fontSize: 20,
  fontWeight: 800,
  lineHeight: 1.35,
});

export const closeButtonStyle = style({
  width: 32,
  height: 32,
  flex: "0 0 auto",
  border: 0,
  borderRadius: 999,
  background: "#F2F4F6",
  color: "#4E5968",
  cursor: "pointer",
  fontSize: 20,
  lineHeight: "32px",
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

export const bodyStyle = style({
  padding: "16px 24px 24px",
  color: "#4E5968",
  fontSize: 15,
  lineHeight: 1.6,
});

export const descriptionStyle = style({
  margin: "0 0 16px",
});

export const footerStyle = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  padding: "0 24px 24px",
});
