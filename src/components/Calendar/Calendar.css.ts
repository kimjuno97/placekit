import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const calendarRootStyle = style({
  width: 336,
  padding: 16,
  border: "1px solid #E5E8EB",
  borderRadius: 18,
  background: "#FFFFFF",
  color: "#191F28",
  boxSizing: "border-box",
  boxShadow: "0 8px 24px rgba(25, 31, 40, 0.06)",
});

export const calendarHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 14,
});

export const monthLabelStyle = style({
  fontSize: 16,
  fontWeight: 750,
  lineHeight: 1.4,
});

export const navButtonStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  border: 0,
  borderRadius: 999,
  background: "transparent",
  color: "#4E5968",
  cursor: "pointer",
  fontSize: 18,
  fontWeight: 800,
  lineHeight: 1,
  selectors: {
    "&:hover": {
      background: "#F2F4F6",
    },
    "&:focus-visible": {
      outline: "3px solid rgba(49, 130, 246, 0.22)",
      outlineOffset: 2,
    },
    "&:disabled": {
      color: "#D1D6DB",
      cursor: "not-allowed",
    },
  },
});

export const weekdayGridStyle = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  marginBottom: 6,
});

export const weekdayStyle = style({
  height: 28,
  color: "#8B95A1",
  fontSize: 12,
  fontWeight: 700,
  lineHeight: "28px",
  textAlign: "center",
});

export const dayGridStyle = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  rowGap: 4,
});

export const dayCellStyle = recipe({
  base: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    height: 36,
    selectors: {
      "&::before": {
        position: "absolute",
        top: 3,
        bottom: 3,
        left: 0,
        right: 0,
        background: "transparent",
        content: "",
      },
    },
  },
  variants: {
    inRange: {
      true: {
        selectors: {
          "&::before": {
            background: "#E8F3FF",
          },
        },
      },
    },
    rangeStart: {
      true: {
        selectors: {
          "&::before": {
            left: "50%",
            borderTopLeftRadius: 999,
            borderBottomLeftRadius: 999,
          },
        },
      },
    },
    rangeEnd: {
      true: {
        selectors: {
          "&::before": {
            right: "50%",
            borderTopRightRadius: 999,
            borderBottomRightRadius: 999,
          },
        },
      },
    },
    singleDayRange: {
      true: {
        selectors: {
          "&::before": {
            left: "50%",
            right: "50%",
          },
        },
      },
    },
    weekStart: {
      true: {
        selectors: {
          "&::before": {
            borderTopLeftRadius: 999,
            borderBottomLeftRadius: 999,
          },
        },
      },
    },
    weekEnd: {
      true: {
        selectors: {
          "&::before": {
            borderTopRightRadius: 999,
            borderBottomRightRadius: 999,
          },
        },
      },
    },
  },
  defaultVariants: {
    inRange: false,
    rangeStart: false,
    rangeEnd: false,
    singleDayRange: false,
    weekStart: false,
    weekEnd: false,
  },
});

export const dayButtonStyle = recipe({
  base: {
    position: "relative",
    zIndex: 1,
    width: 36,
    height: 36,
    border: 0,
    borderRadius: 999,
    background: "transparent",
    color: "#191F28",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 650,
    justifySelf: "center",
    transition: "background 160ms ease, color 160ms ease",
    selectors: {
      "&:hover:not(:disabled)": {
        background: "#F2F4F6",
      },
      "&:focus-visible": {
        outline: "3px solid rgba(49, 130, 246, 0.22)",
        outlineOffset: 2,
      },
      "&:disabled": {
        color: "#D1D6DB",
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    outside: {
      true: {
        color: "#B0B8C1",
      },
    },
    today: {
      true: {
        boxShadow: "inset 0 0 0 1px #3182F6",
      },
    },
    inRange: {
      true: {
        color: "#1B64DA",
      },
    },
    selected: {
      true: {
        background: "#3182F6",
        color: "#FFFFFF",
        selectors: {
          "&:hover:not(:disabled)": {
            background: "#1B64DA",
          },
        },
      },
    },
  },
  defaultVariants: {
    outside: false,
    today: false,
    inRange: false,
    selected: false,
  },
});
