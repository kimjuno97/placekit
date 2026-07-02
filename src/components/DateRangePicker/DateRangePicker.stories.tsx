import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { DateRangePicker } from "./DateRangePicker";

const meta = {
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onRangeChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    defaultStartDate: { control: "date" },
    defaultEndDate: { control: "date" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
    value: { control: false },
    onRangeChange: { action: "range changed" },
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultStartDate: new Date(2026, 6, 1),
    defaultEndDate: new Date(2026, 6, 7),
  },
  parameters: {
    docs: {
      source: {
        code: "<DateRangePicker defaultStartDate={new Date(2026, 6, 1)} defaultEndDate={new Date(2026, 6, 7)} />",
      },
    },
  },
};

export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: "<DateRangePicker />",
      },
    },
  },
};

export const WithBounds: Story = {
  args: {
    defaultStartDate: new Date(2026, 6, 8),
    defaultEndDate: new Date(2026, 6, 14),
    minDate: new Date(2026, 6, 1),
    maxDate: new Date(2026, 6, 31),
  },
  parameters: {
    docs: {
      source: {
        code: "<DateRangePicker minDate={new Date(2026, 6, 1)} maxDate={new Date(2026, 6, 31)} />",
      },
    },
  },
};

export const Shortcut: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: "<DateRangePicker />",
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "조회 기간" });

    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("button", { name: "최근 7일" }));

    await expect(args.onRangeChange).toHaveBeenCalled();
  },
};

export const FieldValidation: Story = {
  args: {
    defaultStartDate: new Date(2026, 6, 15),
    defaultEndDate: new Date(2026, 6, 20),
  },
  parameters: {
    docs: {
      source: {
        code: "<DateRangePicker defaultStartDate={new Date(2026, 6, 15)} defaultEndDate={new Date(2026, 6, 20)} />",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "조회 기간" });

    await userEvent.click(trigger);
    await userEvent.clear(canvas.getByLabelText("종료일"));
    await userEvent.type(canvas.getByLabelText("종료일"), "2026-07-10");

    await expect(canvas.getByLabelText("종료일")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  },
};
