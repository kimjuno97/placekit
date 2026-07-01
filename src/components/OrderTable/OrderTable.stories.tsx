import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { OrderTable } from "./OrderTable";
import type { Order } from "./OrderTable";

const orders: Order[] = [
  {
    amount: 32000,
    customerName: "김토스",
    id: "O-1001",
    orderedAt: "2026-07-01T10:12:00+09:00",
    paymentMethod: "카드",
    status: "paid",
  },
  {
    amount: 18500,
    customerName: "이플레이스",
    id: "O-1002",
    orderedAt: "2026-07-01T10:16:00+09:00",
    paymentMethod: "간편결제",
    status: "pending",
  },
  {
    amount: 42000,
    customerName: "박매장",
    id: "O-1003",
    orderedAt: "2026-07-01T10:21:00+09:00",
    paymentMethod: "카드",
    status: "network_error",
  },
];

const meta = {
  component: OrderTable,
  parameters: {
    layout: "padded",
  },
  tags: ["ai-generated"],
  args: {
    onRowClick: fn(),
  },
} satisfies Meta<typeof OrderTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orders,
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText("₩32,000")).toBeVisible();
    await expect(canvas.getByText("결제 완료")).toBeVisible();

    await userEvent.click(canvas.getByText("O-1001"));

    await expect(args.onRowClick).toHaveBeenCalledWith(orders[0]);
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("table", { name: "주문 목록 로딩 중" }),
    ).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    orders: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("아직 주문이 없습니다.")).toBeVisible();
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "주문 목록을 불러오지 못했습니다.",
    );
  },
};
