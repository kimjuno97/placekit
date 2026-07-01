import type { HTMLAttributes } from "react";
import {
  bannerStyle,
  contentStyle,
  descriptionStyle,
  iconStyle,
  titleStyle,
} from "./NetworkBanner.css";

export type NetworkBannerStatus = "offline" | "unstable" | "reconnected";

type NetworkBannerProps = {
  status: NetworkBannerStatus;
  title?: string;
  description?: string;
} & HTMLAttributes<HTMLDivElement>;

const networkBannerMeta: Record<
  NetworkBannerStatus,
  { icon: string; title: string; description: string; role: "alert" | "status" }
> = {
  offline: {
    icon: "!",
    title: "인터넷 연결이 끊겼어요.",
    description: "연결이 복구되면 결제 상태를 다시 확인합니다.",
    role: "alert",
  },
  unstable: {
    icon: "~",
    title: "인터넷 연결이 불안정해요.",
    description: "결제 상태가 늦게 반영될 수 있습니다.",
    role: "status",
  },
  reconnected: {
    icon: "✓",
    title: "연결이 복구되었어요.",
    description: "결제 상태를 다시 확인하고 있습니다.",
    role: "status",
  },
};

export function NetworkBanner({
  status,
  title,
  description,
  className,
  ...props
}: NetworkBannerProps) {
  const meta = networkBannerMeta[status];
  const rootClassName = bannerStyle({ status });

  return (
    <div
      className={className ? `${rootClassName} ${className}` : rootClassName}
      role={meta.role}
      {...props}
    >
      <div aria-hidden="true" className={iconStyle({ status })}>
        {meta.icon}
      </div>
      <div className={contentStyle}>
        <p className={titleStyle}>{title ?? meta.title}</p>
        <p className={descriptionStyle}>
          {description ?? meta.description}
        </p>
      </div>
    </div>
  );
}
