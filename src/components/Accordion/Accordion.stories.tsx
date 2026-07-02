import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Accordion } from "./Accordion";

const orderFaqItems = [
  {
    id: "settlement",
    title: "정산 예정 금액은 언제 확인할 수 있나요?",
    content: "영업일 기준 다음 날 오전에 전일 결제 금액과 수수료를 반영해 표시됩니다.",
  },
  {
    id: "refund",
    title: "환불 처리 후 주문 상태는 어떻게 바뀌나요?",
    content: "환불 요청이 승인되면 주문 상태가 환불 완료로 변경되고 정산 금액에서 차감됩니다.",
  },
  {
    id: "receipt",
    title: "현금영수증 발급 내역도 확인할 수 있나요?",
    content: "주문 상세 화면에서 결제 수단, 승인번호, 현금영수증 발급 여부를 함께 확인할 수 있습니다.",
  },
  {
    id: "tax",
    title: "세금계산서 발행 설정은 어디에서 바꾸나요?",
    content: "관리자 권한이 있는 계정에서만 사업자 정보와 세금계산서 설정을 변경할 수 있습니다.",
    disabled: true,
  },
];

const meta = {
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  argTypes: {
    items: { control: "object" },
    defaultOpenIds: { control: "object" },
    allowMultiple: { control: "boolean" },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleOpen: Story = {
  args: {
    items: orderFaqItems,
    defaultOpenIds: ["settlement"],
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion items={orderFaqItems} defaultOpenIds={["settlement"]} />`,
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    const refundTrigger = canvas.getByRole("button", {
      name: "환불 처리 후 주문 상태는 어떻게 바뀌나요?",
    });

    await userEvent.click(refundTrigger);

    await expect(refundTrigger).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByText("영업일 기준 다음 날 오전에 전일 결제 금액과 수수료를 반영해 표시됩니다."),
    ).not.toBeVisible();
  },
};

export const MultipleOpen: Story = {
  args: {
    items: orderFaqItems,
    defaultOpenIds: ["settlement", "refund"],
    allowMultiple: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion items={orderFaqItems} defaultOpenIds={["settlement", "refund"]} allowMultiple />`,
      },
    },
  },
};
