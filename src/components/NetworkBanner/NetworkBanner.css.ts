import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const bannerStyle = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    boxSizing: "border-box",
    width: "100%",
    border: "1px solid transparent",
    borderRadius: 14,
    padding: 16,
  },
  variants: {
    status: {
      offline: {
        background: "#FFF0F1",
        borderColor: "#FFB4BA",
      },
      unstable: {
        background: "#FFF6DB",
        borderColor: "#FFE08A",
      },
      reconnected: {
        background: "#EAFBF0",
        borderColor: "#A8EAC0",
      },
    },
  },
});

export const iconStyle = recipe({
  base: {
    display: "grid",
    placeItems: "center",
    width: 28,
    height: 28,
    flex: "0 0 auto",
    borderRadius: 999,
    fontSize: 16,
    fontWeight: 900,
  },
  variants: {
    status: {
      offline: {
        background: "#F04452",
        color: "#FFFFFF",
      },
      unstable: {
        background: "#F59E0B",
        color: "#FFFFFF",
      },
      reconnected: {
        background: "#00A661",
        color: "#FFFFFF",
      },
    },
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
  lineHeight: 1.45,
});

export const descriptionStyle = style({
  margin: "2px 0 0",
  color: "#4E5968",
  fontSize: 14,
  lineHeight: 1.5,
});
