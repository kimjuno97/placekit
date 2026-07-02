import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { BusinessNumberField } from "./BusinessNumberField";

const meta = {
  component: BusinessNumberField,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    onValueChange: { action: "value changed" },
  },
} satisfies Meta<typeof BusinessNumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText("사업자등록번호");

    await userEvent.type(input, "12a-345678901");

    await expect(input).toHaveValue("1234567890");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("1234567890");
  },
};

export const WithInitialValue: Story = {
  args: {
    defaultValue: "123-45-67890",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("사업자등록번호")).toHaveValue(
      "1234567890",
    );
  },
};

export const Error: Story = {
  args: {
    defaultValue: "12345",
    errorMessage: "사업자등록번호 10자리를 모두 입력해 주세요.",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("사업자등록번호");

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "사업자등록번호 10자리를 모두 입력해 주세요.",
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "1234567890",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};
