import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Calendar } from "./Calendar";

const meta = {
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onDateSelect: fn(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    referenceDate: new Date(2026, 6, 1),
    value: new Date(2026, 6, 2),
  },
  parameters: {
    docs: {
      source: {
        code: '<Calendar referenceDate={new Date(2026, 6, 1)} value={new Date(2026, 6, 2)} />',
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    const dateButton = canvas.getByRole("gridcell", {
      name: "2026년 7월 15일 수요일",
    });

    await userEvent.click(dateButton);

    await expect(args.onDateSelect).toHaveBeenCalledWith(new Date(2026, 6, 15));
  },
};

export const Range: Story = {
  args: {
    referenceDate: new Date(2026, 6, 1),
    rangeStart: new Date(2026, 6, 8),
    rangeEnd: new Date(2026, 6, 14),
  },
  parameters: {
    docs: {
      source: {
        code: '<Calendar referenceDate={new Date(2026, 6, 1)} rangeStart={startDate} rangeEnd={endDate} />',
      },
    },
  },
};

export const ContinuedFromPreviousMonth: Story = {
  args: {
    referenceDate: new Date(2026, 6, 1),
    rangeStart: new Date(2026, 5, 28),
    rangeEnd: new Date(2026, 6, 2),
  },
  parameters: {
    docs: {
      source: {
        code: '<Calendar referenceDate={new Date(2026, 6, 1)} rangeStart={new Date(2026, 5, 28)} rangeEnd={new Date(2026, 6, 2)} />',
      },
    },
  },
  play: async ({ canvas }) => {
    const previousMonthStart = canvas.getByRole("gridcell", {
      name: "2026년 6월 28일 일요일",
    });
    const currentMonthEnd = canvas.getByRole("gridcell", {
      name: "2026년 7월 2일 목요일",
    });

    await expect(previousMonthStart).toHaveAttribute("aria-selected", "false");
    await expect(currentMonthEnd).toHaveAttribute("aria-selected", "true");
  },
};

export const WithDisabledDates: Story = {
  args: {
    referenceDate: new Date(2026, 6, 1),
    minDate: new Date(2026, 6, 5),
    maxDate: new Date(2026, 6, 25),
  },
  parameters: {
    docs: {
      source: {
        code: '<Calendar referenceDate={new Date(2026, 6, 1)} minDate={minDate} maxDate={maxDate} />',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    referenceDate: new Date(2026, 6, 1),
    value: new Date(2026, 6, 12),
  },
  parameters: {
    docs: {
      source: {
        code: '<Calendar readOnly referenceDate={new Date(2026, 6, 1)} value={new Date(2026, 6, 12)} />',
      },
    },
  },
};
