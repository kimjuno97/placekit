import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { TextField } from "./TextField";

const meta = {
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    type: {
      control: "select",
      options: ["text", "email", "number", "password", "tel", "url"],
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "매장명",
    placeholder: "예: 잠실 토스플레이스",
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText("매장명");

    await userEvent.type(input, "토스플레이스");

    await expect(input).toHaveValue("토스플레이스");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const WithHelperText: Story = {
  args: {
    label: "매장 별칭",
    helperText: "직원이 구분하기 쉬운 이름으로 입력해 주세요.",
    placeholder: "예: 잠실 1층 포스",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("매장 별칭");
    const helperText = canvas.getByText(
      "직원이 구분하기 쉬운 이름으로 입력해 주세요.",
    );

    await expect(input).toHaveAccessibleDescription(
      "직원이 구분하기 쉬운 이름으로 입력해 주세요.",
    );
    await expect(helperText).toBeVisible();
  },
};

export const Error: Story = {
  args: {
    label: "결제 금액",
    errorMessage: "결제 금액을 입력해 주세요.",
    placeholder: "0",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("결제 금액");

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "결제 금액을 입력해 주세요.",
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "단말기 ID",
    value: "POS-001",
    disabled: true,
    readOnly: true,
  },
};

export const Small: Story = {
  args: {
    label: "짧은 메모",
    size: "small",
    placeholder: "메모",
  },
};

export const Large: Story = {
  args: {
    label: "고객 요청사항",
    size: "large",
    placeholder: "요청사항을 입력하세요",
  },
};

export const FullWidth: Story = {
  args: {
    label: "주소",
    fullWidth: true,
    placeholder: "매장 주소",
  },
  parameters: {
    layout: "padded",
  },
};
