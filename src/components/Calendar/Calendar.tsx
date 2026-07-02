import { useEffect, useMemo, useState } from "react";
import {
  calendarHeaderStyle,
  calendarRootStyle,
  dayButtonStyle,
  dayCellStyle,
  dayGridStyle,
  monthLabelStyle,
  navButtonStyle,
  weekdayGridStyle,
  weekdayStyle,
} from "./Calendar.css";

type CalendarProps = {
  value?: Date;
  defaultValue?: Date;
  referenceDate?: Date;
  month?: Date;
  selectedDate?: Date;
  rangeStart?: Date;
  rangeEnd?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  onChange?: (date: Date) => void;
  onDateSelect?: (date: Date) => void;
};

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

const monthFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  year: "numeric",
});

const dateLabelFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "full",
});

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(left?: Date, right?: Date) {
  return Boolean(
    left &&
      right &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate(),
  );
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function createCalendarDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
}

function isWithinRange(date: Date, start?: Date, end?: Date) {
  if (!start || !end) {
    return false;
  }

  const time = startOfDay(date).getTime();
  return time >= startOfDay(start).getTime() && time <= startOfDay(end).getTime();
}

function isDisabled(date: Date, minDate?: Date, maxDate?: Date) {
  const time = startOfDay(date).getTime();

  return (
    (minDate ? time < startOfDay(minDate).getTime() : false) ||
    (maxDate ? time > startOfDay(maxDate).getTime() : false)
  );
}

export function Calendar({
  value,
  defaultValue,
  referenceDate,
  month,
  selectedDate,
  rangeStart,
  rangeEnd,
  minDate,
  maxDate,
  disabled = false,
  readOnly = false,
  className,
  onChange,
  onDateSelect,
}: CalendarProps) {
  const controlledValue = value ?? selectedDate;
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );
  const activeDate = controlledValue ?? internalValue;
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfDay(month ?? activeDate ?? rangeStart ?? referenceDate ?? new Date()),
  );
  const days = useMemo(() => createCalendarDays(visibleMonth), [visibleMonth]);
  const today = startOfDay(new Date());
  const rootClassName = className
    ? `${calendarRootStyle} ${className}`
    : calendarRootStyle;

  useEffect(() => {
    if (month) {
      setVisibleMonth(startOfDay(month));
    }
  }, [month]);

  const selectDate = (date: Date) => {
    if (disabled || readOnly) {
      return;
    }

    const nextDate = startOfDay(date);

    if (value === undefined && selectedDate === undefined) {
      setInternalValue(nextDate);
    }

    onChange?.(nextDate);
    onDateSelect?.(nextDate);
  };

  return (
    <div
      aria-disabled={disabled || undefined}
      aria-readonly={readOnly || undefined}
      className={rootClassName}
    >
      <div className={calendarHeaderStyle}>
        <button
          aria-label="이전 달"
          className={navButtonStyle}
          disabled={disabled}
          type="button"
          onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
        >
          ‹
        </button>
        <strong aria-live="polite" className={monthLabelStyle}>
          {monthFormatter.format(visibleMonth)}
        </strong>
        <button
          aria-label="다음 달"
          className={navButtonStyle}
          disabled={disabled}
          type="button"
          onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
        >
          ›
        </button>
      </div>
      <div aria-hidden="true" className={weekdayGridStyle}>
        {weekdays.map((weekday) => (
          <span className={weekdayStyle} key={weekday}>
            {weekday}
          </span>
        ))}
      </div>
      <div aria-label="날짜 선택" className={dayGridStyle} role="grid">
        {days.map((date) => {
          const outside = date.getMonth() !== visibleMonth.getMonth();
          const rangeStartSelected = isSameDay(date, rangeStart);
          const rangeEndSelected = isSameDay(date, rangeEnd);
          const singleDayRange =
            !outside &&
            Boolean(rangeStart && rangeEnd) &&
            isSameDay(rangeStart, rangeEnd);
          const inRange = isWithinRange(date, rangeStart, rangeEnd);
          const selectedRangeEndpoint =
            !outside && (rangeStartSelected || rangeEndSelected);
          const selected =
            (!outside && isSameDay(date, activeDate)) || selectedRangeEndpoint;
          const dayDisabled = disabled || isDisabled(date, minDate, maxDate);

          return (
            <span
              className={dayCellStyle({
                inRange,
                rangeEnd: !outside && rangeEndSelected,
                rangeStart: !outside && rangeStartSelected,
                singleDayRange,
                weekEnd: date.getDay() === 6,
                weekStart: date.getDay() === 0,
              })}
              key={date.toISOString()}
            >
              <button
                aria-label={dateLabelFormatter.format(date)}
                aria-selected={selected}
                className={dayButtonStyle({
                  inRange: inRange && !selected,
                  outside,
                  selected,
                  today: isSameDay(date, today),
                })}
                disabled={dayDisabled}
                role="gridcell"
                type="button"
                onClick={() => selectDate(date)}
              >
                {date.getDate()}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
