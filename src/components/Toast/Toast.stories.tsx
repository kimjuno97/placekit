import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Toast } from "./Toast";
import type { ToastProps } from "./Toast";

const meta = {
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

type ToastExampleProps = Omit<ToastProps, "onOpenChange">;

function ControlledToastExample({
  open: _open,
  ...toastProps
}: ToastExampleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>토스트 표시</Button>
      <Toast {...toastProps} open={open} onOpenChange={setOpen} />
    </>
  );
}

export const Info: Story = {
  args: {
    open: true,
    title: "주문이 접수됐습니다.",
    description: "주방 화면에 새 주문이 추가되었습니다.",
    duration: null,
    variant: "info",
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const toast = body.getByRole("status", { name: "주문이 접수됐습니다." });
    const viewport = toast.parentElement;

    await expect(toast).toHaveAccessibleDescription(
      "주방 화면에 새 주문이 추가되었습니다.",
    );

    const viewportRect = viewport!.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;

    await expect(
      Math.abs(viewportCenter - window.innerWidth / 2),
    ).toBeLessThan(1);
  },
};

export const TopLeft: Story = {
  args: {
    description: "좌측 상단에서 표시됩니다.",
    duration: null,
    open: true,
    position: "top-left",
    title: "새 알림",
    variant: "info",
  },
};

export const BottomCenter: Story = {
  args: {
    description: "하단 중앙에서 표시됩니다.",
    duration: null,
    open: true,
    position: "bottom-center",
    title: "저장 완료",
    variant: "success",
  },
};

export const Success: Story = {
  args: {
    open: true,
    title: "결제가 완료됐습니다.",
    description: "영수증 전송까지 완료되었습니다.",
    duration: null,
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    open: true,
    title: "네트워크가 불안정합니다.",
    description: "결제 상태가 지연될 수 있습니다.",
    duration: null,
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    open: true,
    title: "결제 승인에 실패했습니다.",
    description: "카드 정보를 확인한 뒤 다시 시도해 주세요.",
    duration: null,
    variant: "error",
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(
      body.getByRole("alert", { name: "결제 승인에 실패했습니다." }),
    ).toBeVisible();
  },
};

export const WithAction: Story = {
  args: {
    action: <Button size="small">상세 보기</Button>,
    description: "실패한 주문 3건을 확인해 주세요.",
    duration: null,
    open: true,
    title: "확인이 필요한 주문이 있습니다.",
    variant: "warning",
  },
};

export const Controlled: Story = {
  args: {
    description: "닫기 버튼을 누르면 알림이 사라집니다.",
    duration: null,
    open: false,
    title: "설정이 저장됐습니다.",
    variant: "success",
  },
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>토스트 표시</Button>
      <Toast
        open={open}
        title="설정이 저장됐습니다."
        description="닫기 버튼을 누르면 알림이 사라집니다."
        variant="success"
        position="top-center"
        duration={null}
        onOpenChange={setOpen}
      />
    </>
  );
}`,
      },
    },
  },
  render: ({ onOpenChange: _onOpenChange, ...args }) => (
    <ControlledToastExample {...args} />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "토스트 표시" }));

    const body = within(canvasElement.ownerDocument.body);
    await expect(
      body.getByRole("status", { name: "설정이 저장됐습니다." }),
    ).toBeVisible();

    await userEvent.click(body.getByRole("button", { name: "알림 닫기" }));

    await expect(
      body.queryByRole("status", { name: "설정이 저장됐습니다." }),
    ).not.toBeInTheDocument();
  },
};

export const AutoDismiss: Story = {
  args: {
    description: "잠시 후 자동으로 사라집니다.",
    duration: 300,
    open: true,
    title: "자동 닫힘 알림",
    variant: "info",
  },
  play: async ({ args, canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(
      body.getByRole("status", { name: "자동 닫힘 알림" }),
    ).toBeVisible();

    await waitFor(() => {
      expect(args.onOpenChange).toHaveBeenCalledWith(false);
    });
  },
};
