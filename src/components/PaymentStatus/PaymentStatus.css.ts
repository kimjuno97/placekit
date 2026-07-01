import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const paymentStatusStyle = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    border: "1px solid transparent",
    borderRadius: 18,
    background: "#FFFFFF",
    padding: 32,
    textAlign: "center",
  },
  variants: {
    tone: {
      waiting: {
        borderColor: "#FFE08A",
      },
      success: {
        borderColor: "#A8EAC0",
      },
      danger: {
        borderColor: "#FFB4BA",
      },
      neutral: {
        borderColor: "#E5E8EB",
      },
      info: {
        borderColor: "#BBD7FF",
      },
    },
  },
});

export const iconStyle = recipe({
  base: {
    display: "grid",
    placeItems: "center",
    width: 56,
    height: 56,
    marginBottom: 16,
    borderRadius: 18,
    fontSize: 26,
    fontWeight: 900,
  },
  variants: {
    tone: {
      waiting: {
        background: "#FFF6DB",
        color: "#B26B00",
      },
      success: {
        background: "#EAFBF0",
        color: "#008A3E",
      },
      danger: {
        background: "#FFF0F1",
        color: "#D92D20",
      },
      neutral: {
        background: "#F2F4F6",
        color: "#6B7684",
      },
      info: {
        background: "#E8F3FF",
        color: "#1B64DA",
      },
    },
  },
});

export const badgeWrapStyle = style({
  marginBottom: 12,
});

export const titleStyle = style({
  margin: 0,
  color: "#191F28",
  fontSize: 22,
  fontWeight: 800,
  lineHeight: 1.35,
});

export const descriptionStyle = style({
  maxWidth: 420,
  margin: "10px 0 0",
  color: "#6B7684",
  fontSize: 15,
  lineHeight: 1.6,
});

export const actionStyle = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 22,
});
