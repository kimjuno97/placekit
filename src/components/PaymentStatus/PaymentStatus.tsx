import type { HTMLAttributes, ReactNode } from "react";
import { StatusBadge } from "../Badge/StatusBadge";
import type { StatusBadgeStatus } from "../Badge/StatusBadge";
import { Spinner } from "../Spinner/Spinner";
import {
  actionStyle,
  badgeWrapStyle,
  iconGlyphStyle,
  descriptionStyle,
  iconStyle,
  paymentStatusStyle,
  titleStyle,
} from "./PaymentStatus.css";

export type PaymentStatusType = StatusBadgeStatus;

export type PaymentStatusProps = {
  status: PaymentStatusType;
  title?: string;
  description?: string;
  action?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type PaymentStatusMeta = {
  defaultTitle: string;
  defaultDescription: string;
  icon: string;
  tone: "waiting" | "success" | "danger" | "neutral" | "info";
  role: "status" | "alert";
};

const paymentStatusMeta: Record<PaymentStatusType, PaymentStatusMeta> = {
  pending: {
    defaultTitle: "결제를 확인하고 있어요",
    defaultDescription: "승인 결과가 도착하면 자동으로 상태가 업데이트됩니다.",
    icon: "",
    tone: "waiting",
    role: "status",
  },
  paid: {
    defaultTitle: "결제가 완료됐어요",
    defaultDescription: "고객 결제가 정상적으로 승인되었습니다.",
    icon: "✓",
    tone: "success",
    role: "status",
  },
  failed: {
    defaultTitle: "결제를 완료하지 못했어요",
    defaultDescription: "카드 정보나 한도를 확인한 뒤 다시 시도해 주세요.",
    icon: "!",
    tone: "danger",
    role: "alert",
  },
  canceled: {
    defaultTitle: "결제가 취소됐어요",
    defaultDescription: "취소된 결제는 다시 승인할 수 없습니다.",
    icon: "×",
    tone: "neutral",
    role: "status",
  },
  refunded: {
    defaultTitle: "환불이 완료됐어요",
    defaultDescription: "환불 내역은 정산 화면에서 다시 확인할 수 있습니다.",
    icon: "↺",
    tone: "neutral",
    role: "status",
  },
  network_error: {
    defaultTitle: "결제 상태를 확인하지 못했어요",
    defaultDescription: "네트워크 연결 후 다시 확인해 주세요.",
    icon: "?",
    tone: "info",
    role: "alert",
  },
};

export function PaymentStatus({
  status,
  title,
  description,
  action,
  className,
  ...props
}: PaymentStatusProps) {
  const meta = paymentStatusMeta[status];
  const rootClassName = paymentStatusStyle({ tone: meta.tone });

  return (
    <div
      className={className ? `${rootClassName} ${className}` : rootClassName}
      role={meta.role}
      {...props}
    >
      <div
        aria-hidden="true"
        className={iconStyle({ tone: meta.tone })}
        key={status}
      >
        {status === "pending" ? (
          <Spinner
            aria-hidden="true"
            label="결제 상태 확인 중"
            size="large"
            tone="warning"
            variant="dots"
          />
        ) : (
          <span className={iconGlyphStyle}>{meta.icon}</span>
        )}
      </div>
      <div className={badgeWrapStyle}>
        <StatusBadge status={status} />
      </div>
      <h2 className={titleStyle}>{title ?? meta.defaultTitle}</h2>
      <p className={descriptionStyle}>
        {description ?? meta.defaultDescription}
      </p>
      {action ? <div className={actionStyle}>{action}</div> : null}
    </div>
  );
}
