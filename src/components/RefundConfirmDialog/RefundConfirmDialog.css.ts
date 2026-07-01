import { style } from "@vanilla-extract/css";

export const summaryStyle = style({
  display: "grid",
  gap: 12,
  marginTop: 8,
});

export const summaryRowStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: "12px 0",
  borderBottom: "1px solid #E5E8EB",
});

export const labelStyle = style({
  color: "#6B7684",
  fontSize: 14,
  fontWeight: 700,
});

export const valueStyle = style({
  color: "#191F28",
  fontSize: 15,
  fontWeight: 800,
});

export const warningStyle = style({
  margin: "16px 0 0",
  borderRadius: 12,
  background: "#FFF0F1",
  color: "#D92D20",
  padding: 12,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.5,
});
