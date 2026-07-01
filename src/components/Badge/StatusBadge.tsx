import { Badge } from "./Badge";
import type { BadgeProps } from "./Badge";

export type StatusBadgeStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "network_error";

type StatusBadgeProps = {
  status: StatusBadgeStatus;
} & Omit<BadgeProps, "children" | "variant">;

const statusLabel: Record<StatusBadgeStatus, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  failed: "결제 실패",
  refunded: "환불 완료",
  network_error: "네트워크 오류",
};

const statusVariant: Record<StatusBadgeStatus, BadgeProps["variant"]> = {
  pending: "warning",
  paid: "success",
  failed: "danger",
  refunded: "neutral",
  network_error: "info",
};

export function StatusBadge({ status, ...props }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariant[status]} {...props}>
      {statusLabel[status]}
    </Badge>
  );
}
