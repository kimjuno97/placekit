import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Badge } from "./Badge";

const meta = {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    children: "기본",
    variant: "neutral",
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText("기본");

    await expect(badge).toBeVisible();
    await expect(getComputedStyle(badge).borderRadius).toBe("999px");
  },
};

export const Info: Story = {
  args: {
    children: "정보",
    variant: "info",
  },
};

export const Success: Story = {
  args: {
    children: "성공",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "주의",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "위험",
    variant: "danger",
  },
};

export const Outline: Story = {
  args: {
    children: "외곽선",
    variant: "outline",
  },
};

export const Small: Story = {
  args: {
    children: "작게",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "크게",
    size: "large",
  },
};
