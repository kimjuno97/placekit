import { style } from "@vanilla-extract/css";

export const tableWrapStyle = style({
  width: "100%",
  overflowX: "auto",
  border: "1px solid #E5E8EB",
  borderRadius: 16,
  background: "#FFFFFF",
});

export const tableStyle = style({
  width: "100%",
  minWidth: 720,
  borderCollapse: "collapse",
  color: "#191F28",
});

export const headerCellStyle = style({
  padding: "14px 16px",
  borderBottom: "1px solid #E5E8EB",
  color: "#6B7684",
  fontSize: 13,
  fontWeight: 800,
  textAlign: "left",
});

export const rowStyle = style({
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: "#F9FAFB",
    },
  },
});

export const cellStyle = style({
  padding: "16px",
  borderBottom: "1px solid #F2F4F6",
  fontSize: 14,
  verticalAlign: "middle",
});

export const amountStyle = style({
  fontWeight: 800,
  textAlign: "right",
});

export const skeletonCellStyle = style({
  padding: "16px",
  borderBottom: "1px solid #F2F4F6",
});
