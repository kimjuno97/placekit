import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Modal } from "./Modal";
import type { ModalProps } from "./Modal";

const meta = {
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

type ModalExampleProps = Omit<ModalProps, "onOpenChange">;

function ControlledModalExample({
  open: _open,
  ...modalProps
}: ModalExampleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal {...modalProps} open={open} onOpenChange={setOpen} />
    </>
  );
}

export const Basic: Story = {
  args: {
    open: true,
    title: "주문 취소",
    description: "진행 중인 주문을 취소하면 결제 요청도 함께 중단됩니다.",
    children: "취소 후에는 주문 상태를 되돌릴 수 없습니다.",
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = body.getByRole("dialog", { name: "주문 취소" });

    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toHaveAccessibleDescription(
      "진행 중인 주문을 취소하면 결제 요청도 함께 중단됩니다.",
    );
    await expect(args.onOpenChange).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");

    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    title: "결제 승인",
    description: "선택한 주문의 결제를 승인합니다.",
    children: "승인 후 고객에게 결제 완료 알림이 전송됩니다.",
    footer: (
      <>
        <Button variant="secondary">취소</Button>
        <Button>승인</Button>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    open: true,
    title: "단말기 연결",
    description: "새 단말기와 매장을 연결합니다.",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    open: true,
    title: "정산 내역 확인",
    description: "오늘 발생한 결제와 환불 내역을 확인합니다.",
    size: "large",
    children:
      "정산 금액, 결제 수단, 환불 상태를 확인한 뒤 이상 내역이 있으면 운영팀에 문의해 주세요.",
  },
};

export const Controlled: Story = {
  args: {
    open: false,
    title: "영업 시작",
    description: "버튼을 누르면 모달이 닫힙니다.",
    children: "오늘의 첫 주문을 받을 준비가 완료되었습니다.",
  },
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal
        open={open}
        title="영업 시작"
        description="버튼을 누르면 모달이 닫힙니다."
        onOpenChange={setOpen}
      >
        오늘의 첫 주문을 받을 준비가 완료되었습니다.
      </Modal>
    </>
  );
}`,
      },
    },
  },
  render: ({ onOpenChange: _onOpenChange, ...args }) => (
    <ControlledModalExample {...args} />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "모달 열기" }));

    const body = within(canvasElement.ownerDocument.body);
    await expect(
      body.getByRole("dialog", { name: "영업 시작" }),
    ).toBeVisible();

    await userEvent.click(body.getByRole("button", { name: "닫기" }));

    await expect(
      body.queryByRole("dialog", { name: "영업 시작" }),
    ).not.toBeInTheDocument();
  },
};
