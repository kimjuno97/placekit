import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const errorStateStyle = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: "100%",
    border: "1px solid transparent",
    borderRadius: 16,
    background: "#FFFFFF",
    textAlign: "center",
  },
  variants: {
    severity: {
      warning: {
        borderColor: "#FFE08A",
      },
      error: {
        borderColor: "#FFB4BA",
      },
    },
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
    severity: "error",
    size: "medium",
  },
});

export const iconStyle = recipe({
  base: {
    display: "grid",
    placeItems: "center",
    width: 52,
    height: 52,
    marginBottom: 16,
    borderRadius: 16,
    fontSize: 24,
    fontWeight: 900,
  },
  variants: {
    severity: {
      warning: {
        background: "#FFF6DB",
        color: "#B26B00",
      },
      error: {
        background: "#FFF0F1",
        color: "#D92D20",
      },
    },
  },
  defaultVariants: {
    severity: "error",
  },
});

export const codeStyle = style({
  marginBottom: 8,
  color: "#8B95A1",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 0,
  textTransform: "uppercase",
});

export const titleStyle = style({
  margin: 0,
  color: "#191F28",
  fontSize: 20,
  fontWeight: 800,
  lineHeight: 1.35,
});

export const descriptionStyle = style({
  maxWidth: 380,
  margin: "8px 0 0",
  color: "#6B7684",
  fontSize: 15,
  lineHeight: 1.55,
});

export const actionStyle = style({
  display: "flex",
  justifyContent: "center",
  gap: 8,
  marginTop: 20,
});
