import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "../Button/Button";
import { PaymentStatus } from "./PaymentStatus";

const meta = {
  component: PaymentStatus,
  parameters: {
    layout: "padded",
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
    title: { control: "text" },
    description: { control: "text" },
    action: { control: false },
  },
} satisfies Meta<typeof PaymentStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: "pending",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "결제를 확인하고 있어요",
    );
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
    action: <Button>다시 결제하기</Button>,
    status: "failed",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "결제를 완료하지 못했어요",
    );
    await expect(
      canvas.getByRole("button", { name: "다시 결제하기" }),
    ).toBeVisible();
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
    action: <Button>다시 확인하기</Button>,
    description: "네트워크 연결 후 다시 확인해 주세요.",
    status: "network_error",
    title: "결제 상태를 확인하지 못했어요",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "결제 상태를 확인하지 못했어요",
    );
    await expect(canvas.getByText("네트워크 오류")).toBeVisible();
  },
};
