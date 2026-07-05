import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Spinner } from "./Spinner";

const meta = {
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  argTypes: {
    label: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    tone: {
      control: "inline-radio",
      options: ["primary", "neutral", "inverse", "warning"],
    },
    variant: {
      control: "inline-radio",
      options: ["ring", "dots"],
    },
  },
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

export const Dots: Story = {
  args: {
    label: "결제 상태를 확인하는 중",
    variant: "dots",
  },
};

export const Neutral: Story = {
  args: {
    tone: "neutral",
  },
};

export const WarningDots: Story = {
  args: {
    label: "결제 상태를 확인하는 중",
    tone: "warning",
    variant: "dots",
  },
};

export const Inverse: Story = {
  args: {
    label: "어두운 배경에서 로딩 중",
    tone: "inverse",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          alignItems: "center",
          background: "#191F28",
          borderRadius: 8,
          display: "flex",
          height: 72,
          justifyContent: "center",
          width: 96,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
