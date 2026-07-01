import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "../Button/Button";
import { ErrorState } from "./ErrorState";

const meta = {
  component: ErrorState,
  parameters: {
    layout: "padded",
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaymentFailed: Story = {
  args: {
    action: <Button>다시 시도</Button>,
    code: "PAYMENT_FAILED",
    title: "결제를 완료하지 못했습니다.",
    description: "카드 정보나 한도를 확인한 뒤 다시 결제를 시도해 주세요.",
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole("alert");

    await expect(alert).toHaveTextContent("결제를 완료하지 못했습니다.");
    await expect(canvas.getByRole("button", { name: "다시 시도" })).toBeVisible();
  },
};

export const NetworkWarning: Story = {
  args: {
    action: <Button variant="secondary">새로고침</Button>,
    code: "NETWORK_DELAY",
    description: "일부 주문 상태가 늦게 반영될 수 있습니다.",
    severity: "warning",
    title: "네트워크 연결이 불안정합니다.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "네트워크 연결이 불안정합니다.",
    );
  },
};

export const Compact: Story = {
  args: {
    code: "LOAD_FAILED",
    size: "compact",
    title: "내역을 불러오지 못했습니다.",
  },
};

export const Spacious: Story = {
  args: {
    action: (
      <>
        <Button>다시 불러오기</Button>
        <Button variant="secondary">문의하기</Button>
      </>
    ),
    code: "SETTLEMENT_ERROR",
    description: "정산 데이터 요청이 실패했습니다. 잠시 후 다시 시도해 주세요.",
    size: "spacious",
    title: "정산 화면을 표시할 수 없습니다.",
  },
};
