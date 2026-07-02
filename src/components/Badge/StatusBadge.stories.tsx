import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { StatusBadge } from "./StatusBadge";

const meta = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  argTypes: {
    status: {
      control: "select",
      options: [
        "pending",
        "paid",
        "failed",
        "canceled",
        "refunded",
        "network_error",
      ],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: "pending",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("결제 대기")).toBeVisible();
  },
};

export const Paid: Story = {
  args: {
    status: "paid",
  },
};

export const Failed: Story = {
  args: {
    status: "failed",
  },
};

export const Canceled: Story = {
  args: {
    status: "canceled",
  },
};

export const Refunded: Story = {
  args: {
    status: "refunded",
  },
};

export const NetworkError: Story = {
  args: {
    status: "network_error",
  },
};

export const LargePaid: Story = {
  args: {
    size: "large",
    status: "paid",
  },
};
