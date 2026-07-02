import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { NetworkBanner } from "./NetworkBanner";

const meta = {
  component: NetworkBanner,
  parameters: {
    layout: "padded",
  },
  tags: ["ai-generated"],
  argTypes: {
    status: {
      control: "inline-radio",
      options: ["offline", "unstable", "reconnected"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof NetworkBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Offline: Story = {
  args: {
    status: "offline",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "인터넷 연결이 끊겼어요.",
    );
  },
};

export const Unstable: Story = {
  args: {
    status: "unstable",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "결제 상태가 늦게 반영될 수 있습니다.",
    );
  },
};

export const Reconnected: Story = {
  args: {
    status: "reconnected",
  },
};

export const CustomMessage: Story = {
  args: {
    description: "승인 결과를 다시 가져오는 중입니다.",
    status: "reconnected",
    title: "매장 네트워크가 다시 연결됐어요.",
  },
};
