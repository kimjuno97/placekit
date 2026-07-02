import { useEffect, useId, useRef, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import { DateField } from "../DateField/DateField";
import {
  calendarWrapStyle,
  fieldRowStyle,
  helperTextStyle,
  labelStyle,
  pickerRootStyle,
  popoverStyle,
  shortcutButtonStyle,
  shortcutRowStyle,
  triggerIconStyle,
  triggerStyle,
} from "./DateRangePicker.css";

type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

type DateRangePickerProps = {
  label?: string;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  value?: [Date | undefined, Date | undefined];
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  helperText?: string;
  className?: string;
  onChange?: (range: DateRange) => void;
  onRangeChange?: (range: DateRange) => void;
};

const rangeFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "2-digit",
  day: "2-digit",
});

function formatFieldDate(date?: Date) {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseFieldDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return startOfDay(date);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return startOfDay(nextDate);
}

function formatRange(startDate?: Date, endDate?: Date) {
  if (startDate && endDate) {
    return `${rangeFormatter.format(startDate)} - ${rangeFormatter.format(endDate)}`;
  }

  if (startDate) {
    return `${rangeFormatter.format(startDate)} - 종료일 선택`;
  }

  return "";
}

export function DateRangePicker({
  label = "조회 기간",
  defaultStartDate,
  defaultEndDate,
  value,
  minDate,
  maxDate,
  placeholder = "기간을 선택해 주세요",
  helperText = "주문과 정산 내역을 확인할 기간을 선택합니다.",
  className,
  onChange,
  onRangeChange,
}: DateRangePickerProps) {
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const [internalStartDate, setInternalStartDate] = useState<Date | undefined>(
    defaultStartDate,
  );
  const [internalEndDate, setInternalEndDate] = useState<Date | undefined>(
    defaultEndDate,
  );
  const [startInputValue, setStartInputValue] = useState(() =>
    formatFieldDate(defaultStartDate),
  );
  const [endInputValue, setEndInputValue] = useState(() =>
    formatFieldDate(defaultEndDate),
  );
  const startDate = value?.[0] ?? internalStartDate;
  const endDate = value?.[1] ?? internalEndDate;
  const rootClassName = className
    ? `${pickerRootStyle} ${className}`
    : pickerRootStyle;
  const formattedRange = formatRange(startDate, endDate);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (!isControlled) {
      return;
    }

    setStartInputValue(formatFieldDate(value?.[0]));
    setEndInputValue(formatFieldDate(value?.[1]));
  }, [isControlled, value]);

  const updateRange = (nextRange: DateRange) => {
    if (!isControlled) {
      setInternalStartDate(nextRange.startDate);
      setInternalEndDate(nextRange.endDate);
    }

    setStartInputValue(formatFieldDate(nextRange.startDate));
    setEndInputValue(formatFieldDate(nextRange.endDate));
    onChange?.(nextRange);
    onRangeChange?.(nextRange);
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || endDate) {
      updateRange({ startDate: date });
      return;
    }

    if (date.getTime() < startOfDay(startDate).getTime()) {
      updateRange({ startDate: date, endDate: startDate });
      setOpen(false);
      return;
    }

    updateRange({ startDate, endDate: date });
    setOpen(false);
  };

  const selectShortcut = (days: number) => {
    const today = startOfDay(new Date());
    const nextStartDate = addDays(today, -(days - 1));

    updateRange({ startDate: nextStartDate, endDate: today });
    setOpen(false);
  };

  const updateStartField = (fieldValue: string, date?: Date) => {
    setStartInputValue(fieldValue);

    if (!fieldValue) {
      updateRange({ endDate, startDate: undefined });
      return;
    }

    if (!date) {
      return;
    }

    updateRange({
      endDate,
      startDate: date,
    });
  };

  const updateEndField = (fieldValue: string, date?: Date) => {
    setEndInputValue(fieldValue);

    if (!fieldValue) {
      updateRange({ startDate, endDate: undefined });
      return;
    }

    if (!date) {
      return;
    }

    updateRange({
      startDate,
      endDate: date,
    });
  };

  const parsedEndInputDate = parseFieldDate(endInputValue);
  const endFieldError =
    startDate &&
    parsedEndInputDate &&
    parsedEndInputDate.getTime() < startDate.getTime()
      ? "종료일은 시작일 이후여야 합니다."
      : undefined;

  return (
    <div className={rootClassName} ref={rootRef}>
      <span className={labelStyle} id={labelId}>
        {label}
      </span>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-labelledby={labelId}
        className={triggerStyle}
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        {formattedRange ? (
          <span>{formattedRange}</span>
        ) : (
          <span>{placeholder}</span>
        )}
        <span aria-hidden="true" className={triggerIconStyle}>
          ◦
        </span>
      </button>
      <span className={helperTextStyle}>{helperText}</span>
      {open ? (
        <div aria-label="기간 선택 달력" className={popoverStyle} role="dialog">
          <div className={fieldRowStyle}>
            <DateField
              clearable
              fullWidth
              helperText=""
              label="시작일"
              maxDate={maxDate}
              minDate={minDate}
              value={startInputValue}
              onChange={updateStartField}
            />
            <DateField
              clearable
              errorMessage={endFieldError}
              fullWidth
              helperText=""
              label="종료일"
              maxDate={maxDate}
              minDate={minDate}
              value={endInputValue}
              onChange={updateEndField}
            />
          </div>
          <div className={shortcutRowStyle}>
            <button
              className={shortcutButtonStyle}
              type="button"
              onClick={() => selectShortcut(7)}
            >
              최근 7일
            </button>
            <button
              className={shortcutButtonStyle}
              type="button"
              onClick={() => selectShortcut(14)}
            >
              최근 14일
            </button>
            <button
              className={shortcutButtonStyle}
              type="button"
              onClick={() => selectShortcut(30)}
            >
              최근 30일
            </button>
            <button
              className={shortcutButtonStyle}
              type="button"
              onClick={() => updateRange({})}
            >
              초기화
            </button>
          </div>
          <div className={calendarWrapStyle}>
            <Calendar
              maxDate={maxDate}
              minDate={minDate}
              referenceDate={startDate ?? minDate ?? new Date()}
              value={endDate ?? startDate}
              rangeEnd={endDate}
              rangeStart={startDate}
              onChange={handleDateSelect}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
