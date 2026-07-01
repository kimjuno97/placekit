import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const emptyStateStyle = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: "100%",
    border: "1px solid #E5E8EB",
    borderRadius: 16,
    background: "#FFFFFF",
    textAlign: "center",
  },
  variants: {
    size: {
      compact: {
        minHeight: 180,
        padding: 24,
      },
      medium: {
        minHeight: 260,
        padding: 32,
      },
      spacious: {
        minHeight: 360,
        padding: 40,
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const iconStyle = style({
  display: "grid",
  placeItems: "center",
  width: 52,
  height: 52,
  marginBottom: 16,
  borderRadius: 16,
  background: "#F2F4F6",
  color: "#6B7684",
  fontSize: 24,
  fontWeight: 800,
});

export const titleStyle = style({
  margin: 0,
  color: "#191F28",
  fontSize: 20,
  fontWeight: 800,
  lineHeight: 1.35,
});

export const descriptionStyle = style({
  maxWidth: 360,
  margin: "8px 0 0",
  color: "#6B7684",
  fontSize: 15,
  lineHeight: 1.55,
});

export const actionStyle = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
});
