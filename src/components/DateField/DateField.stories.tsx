import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { DateField } from "./DateField";

const meta = {
  component: DateField,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "조회 시작일",
  },
  parameters: {
    docs: {
      source: {
        code: '<DateField label="조회 시작일" onChange={(value, date) => setDate(date)} />',
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText("조회 시작일");

    await userEvent.type(input, "2026-07-02");

    await expect(input).toHaveValue("2026-07-02");
    await expect(args.onValueChange).toHaveBeenCalledWith(
      "2026-07-02",
      new Date(2026, 6, 2)
    );
  },
};

export const InvalidFormat: Story = {
  args: {
    label: "조회 시작일",
    defaultValue: "2026-7-2",
  },
  parameters: {
    docs: {
      source: {
        code: '<DateField label="조회 시작일" defaultValue="2026-7-2" />',
      },
    },
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("조회 시작일");

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "YYYY-MM-DD 형식의 올바른 날짜를 입력해 주세요."
    );
  },
};

export const InvalidDate: Story = {
  args: {
    label: "정산일",
    defaultValue: "2026-02-30",
  },
  parameters: {
    docs: {
      source: {
        code: '<DateField label="정산일" defaultValue="2026-02-30" />',
      },
    },
  },
};

export const WithBounds: Story = {
  args: {
    label: "조회 종료일",
    defaultValue: "2026-08-01",
    minDate: new Date(2026, 6, 1),
    maxDate: new Date(2026, 6, 31),
  },
  parameters: {
    docs: {
      source: {
        code: '<DateField label="조회 종료일" minDate={new Date(2026, 6, 1)} maxDate={new Date(2026, 6, 31)} />',
      },
    },
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("조회 종료일");

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "2026. 7. 31. 이전 날짜를 입력해 주세요."
    );
  },
};
