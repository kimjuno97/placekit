import { useState } from "react";
import { TextField } from "../TextField/TextField";
import type { TextFieldProps } from "../TextField/TextField";

type BusinessNumberFieldProps = Omit<
  TextFieldProps,
  | "defaultValue"
  | "helperText"
  | "inputMode"
  | "label"
  | "maxLength"
  | "onChange"
  | "pattern"
  | "type"
  | "value"
> & {
  label?: string;
  value?: string;
  defaultValue?: string;
  helperText?: string;
  onValueChange?: (value: string) => void;
};

const MAX_BUSINESS_NUMBER_LENGTH = 10;

function formatBusinessNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, MAX_BUSINESS_NUMBER_LENGTH);
}

export function BusinessNumberField({
  label = "사업자등록번호",
  value,
  defaultValue = "",
  helperText = "하이픈 없이 10자리 숫자를 입력해 주세요.",
  onValueChange,
  ...props
}: BusinessNumberFieldProps) {
  const [internalValue, setInternalValue] = useState(() =>
    formatBusinessNumber(defaultValue),
  );
  const isControlled = value !== undefined;
  const inputValue = isControlled
    ? formatBusinessNumber(value)
    : internalValue;

  return (
    <TextField
      {...props}
      label={label}
      helperText={helperText}
      inputMode="numeric"
      maxLength={MAX_BUSINESS_NUMBER_LENGTH}
      pattern="[0-9]*"
      placeholder="0000000000"
      type="text"
      value={inputValue}
      onChange={(event) => {
        const nextValue = formatBusinessNumber(event.currentTarget.value);

        if (!isControlled) {
          setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
      }}
    />
  );
}
