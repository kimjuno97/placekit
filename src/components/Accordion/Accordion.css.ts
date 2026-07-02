import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const accordionRootStyle = style({
  width: "100%",
  maxWidth: 640,
  border: "1px solid #E5E8EB",
  borderRadius: 18,
  overflow: "hidden",
  background: "#FFFFFF",
  boxShadow: "0 12px 32px rgba(25, 31, 40, 0.08)",
});

export const itemStyle = style({
  borderBottom: "1px solid #EEF1F4",
  background: "#FFFFFF",
  transition: "background 180ms ease",
  selectors: {
    "&:last-child": {
      borderBottom: 0,
    },
    '&[data-state="open"]': {
      background: "#FBFCFD",
    },
    '&[data-disabled="true"]': {
      background: "#F9FAFB",
    },
  },
});

export const headingStyle = style({
  margin: 0,
});

export const triggerStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  minHeight: 64,
  gap: 16,
  padding: "0 20px",
  border: 0,
  background: "transparent",
  color: "#191F28",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 750,
  lineHeight: 1.4,
  textAlign: "left",
  transition: "background 180ms ease, color 180ms ease",
  selectors: {
    "&:hover": {
      background: "#F7F9FC",
    },
    "&:focus-visible": {
      outline: "3px solid rgba(49, 130, 246, 0.24)",
      outlineOffset: -3,
    },
    '&[aria-expanded="true"]': {
      color: "#1B64DA",
    },
    "&:disabled": {
      color: "#B0B8C1",
      cursor: "not-allowed",
    },
  },
});

export const titleStyle = style({
  minWidth: 0,
});

export const iconStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
  width: 28,
  height: 28,
  borderRadius: 999,
  background: "#F2F4F6",
  color: "#6B7684",
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1,
  transition: "background 180ms ease, color 180ms ease, transform 220ms ease",
  selectors: {
    '[aria-expanded="true"] &': {
      background: "#E8F3FF",
      color: "#1B64DA",
      transform: "rotate(180deg)",
    },
  },
});

export const panelShellStyle = recipe({
  base: {
    display: "grid",
    transition:
      "grid-template-rows 260ms cubic-bezier(0.2, 0, 0, 1), opacity 180ms ease",
  },
  variants: {
    open: {
      true: {
        gridTemplateRows: "1fr",
        opacity: 1,
      },
      false: {
        gridTemplateRows: "0fr",
        opacity: 0,
      },
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const panelInnerStyle = style({
  overflow: "hidden",
});

export const panelContentStyle = recipe({
  base: {
    padding: "0 20px 20px",
    color: "#4E5968",
    fontSize: 14,
    lineHeight: 1.7,
    transition: "transform 260ms cubic-bezier(0.2, 0, 0, 1)",
  },
  variants: {
    open: {
      true: {
        transform: "translateY(0)",
      },
      false: {
        transform: "translateY(-6px)",
      },
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const contentTextStyle = style({
  color: "#4E5968",
  margin: 0,
});
