import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Skeleton, SkeletonText } from "./Skeleton";

const meta = {
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Block: Story = {
  args: {
    height: 120,
    width: 320,
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector("[aria-hidden='true']");

    await expect(skeleton).toHaveAttribute("aria-hidden", "true");
    await expect(skeleton).toHaveStyle({ height: "120px", width: "320px" });
  },
};

export const Round: Story = {
  args: {
    height: 48,
    radius: "round",
    width: 48,
  },
};

export const SmallRadius: Story = {
  args: {
    height: 36,
    radius: "small",
    width: 240,
  },
};

export const TextLines: Story = {
  render: () => <SkeletonText lines={4} width={320} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("status", { name: "콘텐츠를 불러오는 중" }),
    ).toBeVisible();
  },
};
