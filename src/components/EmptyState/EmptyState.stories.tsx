import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "../Button/Button";
import { EmptyState } from "./EmptyState";

const meta = {
  component: EmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoOrders: Story = {
  args: {
    title: "아직 주문이 없습니다.",
    description: "새 주문이 들어오면 이 화면에서 바로 확인할 수 있습니다.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "아직 주문이 없습니다." }))
      .toBeVisible();
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: "-",
    title: "검색 결과가 없습니다.",
    description: "검색어를 줄이거나 다른 주문 상태를 선택해 보세요.",
  },
};

export const WithAction: Story = {
  args: {
    action: <Button>첫 주문 등록</Button>,
    icon: "+",
    title: "등록된 주문이 없습니다.",
    description: "직접 주문을 등록해 테스트 플로우를 확인할 수 있습니다.",
  },
};

export const Compact: Story = {
  args: {
    size: "compact",
    title: "내역 없음",
    description: "선택한 기간에 표시할 내역이 없습니다.",
  },
};

export const Spacious: Story = {
  args: {
    size: "spacious",
    title: "표시할 정산 데이터가 없습니다.",
    description: "정산이 완료되면 매출, 환불, 수수료 내역이 표시됩니다.",
  },
};
