import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button } from "../Button/Button";
import { RefundConfirmDialog } from "./RefundConfirmDialog";

const meta = {
  component: RefundConfirmDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onConfirm: fn(),
    onOpenChange: fn(),
  },
  argTypes: {
    open: { control: "boolean" },
    amount: { control: { type: "number", min: 0, step: 1000 } },
    paymentId: { control: "text" },
    onConfirm: { action: "confirmed" },
    onOpenChange: { action: "open changed" },
  },
} satisfies Meta<typeof RefundConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function RefundDialogExample({
  shouldFail = false,
}: {
  shouldFail?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>환불 요청</Button>
      <RefundConfirmDialog
        amount={32000}
        open={open}
        paymentId="P-20260629-001"
        onConfirm={async () => {
          await new Promise((resolve) => window.setTimeout(resolve, 200));

          if (shouldFail) {
            throw new Error("refund failed");
          }
        }}
        onOpenChange={setOpen}
      />
    </>
  );
}

export const Basic: Story = {
  args: {
    amount: 32000,
    open: true,
    paymentId: "P-20260629-001",
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(
      body.getByRole("dialog", { name: "환불을 진행할까요?" }),
    ).toBeVisible();
    await expect(body.getByText("₩32,000")).toBeVisible();
    await expect(body.getByText("P-20260629-001")).toBeVisible();
  },
};

export const SuccessFlow: Story = {
  args: {
    amount: 32000,
    open: false,
    paymentId: "P-20260629-001",
  },
  render: () => <RefundDialogExample />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "환불 요청" }));

    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole("button", { name: "환불하기" }));

    await expect(
      await body.findByRole("status", { name: "환불이 완료됐습니다." }),
    ).toBeVisible();
  },
};

export const FailureFlow: Story = {
  args: {
    amount: 32000,
    open: false,
    paymentId: "P-20260629-001",
  },
  render: () => <RefundDialogExample shouldFail />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "환불 요청" }));

    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole("button", { name: "환불하기" }));

    await waitFor(() => {
      expect(
        body.getByRole("alert", { name: "환불 요청에 실패했습니다." }),
      ).toBeVisible();
    });
  },
};
