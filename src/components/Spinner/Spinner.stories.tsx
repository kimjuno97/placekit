import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Spinner } from "./Spinner";

const meta = {
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "결제 상태를 확인하는 중",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("status", { name: "결제 상태를 확인하는 중" }),
    ).toBeVisible();
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Neutral: Story = {
  args: {
    tone: "neutral",
  },
};

export const Inverse: Story = {
  args: {
    tone: "inverse",
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#191F28" }],
    },
  },
};
