import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "결제하기",
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /결제하기/i }));

    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "취소",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "삭제",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "작게",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "크게",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비",
  },
  parameters: {
    layout: "padded",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "저장",
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /처리 중/i });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성",
  },
};
