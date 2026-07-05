import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const iconEnter = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(8px) scale(0.82)",
  },
  "60%": {
    opacity: 1,
    transform: "translateY(-2px) scale(1.06)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  },
});

const glyphKick = keyframes({
  "0%": {
    transform: "rotate(-14deg) scale(0.7)",
  },
  "55%": {
    transform: "rotate(7deg) scale(1.12)",
  },
  "100%": {
    transform: "rotate(0) scale(1)",
  },
});

export const paymentStatusStyle = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 520,
    marginInline: "auto",
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
    animation: `${iconEnter} 360ms cubic-bezier(0.2, 0.9, 0.2, 1.2) both`,
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

export const iconGlyphStyle = style({
  display: "inline-block",
  transformOrigin: "50% 58%",
  animation: `${glyphKick} 460ms cubic-bezier(0.2, 0.9, 0.2, 1.2) both`,
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
