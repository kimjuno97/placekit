import { style } from "@vanilla-extract/css";

export const pickerRootStyle = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  gap: 8,
  width: 420,
});

export const labelStyle = style({
  color: "#191F28",
  fontSize: 14,
  fontWeight: 800,
  lineHeight: 1.4,
});

export const triggerStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: 48,
  padding: "0 14px",
  border: "1px solid #D1D6DB",
  borderRadius: 12,
  background: "#FFFFFF",
  color: "#191F28",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 700,
  textAlign: "left",
  transition: "border-color 160ms ease, box-shadow 160ms ease",
  selectors: {
    "&:focus-visible": {
      borderColor: "#3182F6",
      outline: "none",
      boxShadow: "0 0 0 3px rgba(49, 130, 246, 0.16)",
    },
  },
});

export const triggerIconStyle = style({
  color: "#6B7684",
  fontSize: 18,
});

export const popoverStyle = style({
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  zIndex: 20,
  display: "grid",
  gap: 14,
  width: 420,
  padding: 14,
  border: "1px solid #E5E8EB",
  borderRadius: 18,
  background: "#FFFFFF",
  boxShadow: "0 16px 40px rgba(25, 31, 40, 0.14)",
  boxSizing: "border-box",
});

export const fieldRowStyle = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
});

export const shortcutRowStyle = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 8,
});

export const shortcutButtonStyle = style({
  height: 34,
  border: "1px solid #E5E8EB",
  borderRadius: 10,
  background: "#F9FAFB",
  color: "#4E5968",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 800,
  selectors: {
    "&:hover": {
      borderColor: "#3182F6",
      color: "#1B64DA",
      background: "#F5F9FF",
    },
    "&:focus-visible": {
      outline: "3px solid rgba(49, 130, 246, 0.22)",
      outlineOffset: 2,
    },
  },
});

export const helperTextStyle = style({
  color: "#6B7684",
  fontSize: 12,
  lineHeight: 1.45,
});

export const calendarWrapStyle = style({
  display: "flex",
  justifyContent: "center",
});
