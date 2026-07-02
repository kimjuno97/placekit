import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import {
  clearButtonStyle,
  fieldRootStyle,
  helperTextStyle,
  iconStyle,
  inputStyle,
  inputWrapStyle,
  labelStyle,
} from "./DateField.css";

export type DateFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "defaultValue"
  | "inputMode"
  | "max"
  | "min"
  | "onChange"
  | "pattern"
  | "size"
  | "type"
  | "value"
> & {
  label: string;
  value?: string;
  defaultValue?: string;
  helperText?: string;
  errorMessage?: string;
  minDate?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
  clearable?: boolean;
  onChange?: (value: string, date?: Date) => void;
  onValueChange?: (value: string, date?: Date) => void;
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
});

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDateValue(value: string) {
  if (!DATE_PATTERN.test(value)) {
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

function getValidationMessage(value: string, minDate?: Date, maxDate?: Date) {
  if (!value) {
    return undefined;
  }

  const parsedDate = parseDateValue(value);

  if (!parsedDate) {
    return "YYYY-MM-DD 형식의 올바른 날짜를 입력해 주세요.";
  }

  if (minDate && parsedDate.getTime() < startOfDay(minDate).getTime()) {
    return `${dateFormatter.format(minDate)} 이후 날짜를 입력해 주세요.`;
  }

  if (maxDate && parsedDate.getTime() > startOfDay(maxDate).getTime()) {
    return `${dateFormatter.format(maxDate)} 이전 날짜를 입력해 주세요.`;
  }

  return undefined;
}

function normalizeDateInput(value: string) {
  return value.replace(/[^\d-]/g, "").slice(0, 10);
}

export function DateField({
  id,
  label,
  value,
  defaultValue = "",
  helperText = "YYYY-MM-DD 형식으로 입력해 주세요.",
  errorMessage: externalErrorMessage,
  minDate,
  maxDate,
  fullWidth = false,
  clearable = true,
  disabled,
  readOnly,
  className,
  onChange,
  onValueChange,
  placeholder = "YYYY-MM-DD",
  ...props
}: DateFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [internalValue, setInternalValue] = useState(() =>
    normalizeDateInput(defaultValue),
  );
  const isControlled = value !== undefined;
  const inputValue = isControlled ? normalizeDateInput(value) : internalValue;
  const validationMessage = getValidationMessage(inputValue, minDate, maxDate);
  const errorMessage = externalErrorMessage ?? validationMessage;
  const descriptionId =
    errorMessage || helperText ? `${inputId}-description` : undefined;
  const tone = disabled ? "disabled" : errorMessage ? "error" : "default";
  const rootClassName = fieldRootStyle({ fullWidth });

  const updateValue = (nextValue: string) => {
    const normalizedValue = normalizeDateInput(nextValue);
    const nextDate = parseDateValue(normalizedValue);

    if (!isControlled) {
      setInternalValue(normalizedValue);
    }

    onChange?.(normalizedValue, nextDate);
    onValueChange?.(normalizedValue, nextDate);
  };

  return (
    <div className={className ? `${rootClassName} ${className}` : rootClassName}>
      <label className={labelStyle({ tone })} htmlFor={inputId}>
        {label}
      </label>
      <span className={inputWrapStyle({ tone })}>
        <input
          {...props}
          aria-describedby={descriptionId}
          aria-invalid={Boolean(errorMessage) || undefined}
          className={inputStyle}
          disabled={disabled}
          id={inputId}
          inputMode="numeric"
          pattern="\d{4}-\d{2}-\d{2}"
          placeholder={placeholder}
          readOnly={readOnly}
          type="text"
          value={inputValue}
          onChange={(event) => updateValue(event.currentTarget.value)}
        />
        {clearable && inputValue && !disabled && !readOnly ? (
          <button
            aria-label={`${label} 지우기`}
            className={clearButtonStyle}
            type="button"
            onClick={() => updateValue("")}
          >
            ×
          </button>
        ) : null}
        <span aria-hidden="true" className={iconStyle}>
          ◦
        </span>
      </span>
      {descriptionId ? (
        <span
          className={helperTextStyle({ tone: errorMessage ? "error" : "helper" })}
          id={descriptionId}
        >
          {errorMessage ?? helperText}
        </span>
      ) : null}
    </div>
  );
}
