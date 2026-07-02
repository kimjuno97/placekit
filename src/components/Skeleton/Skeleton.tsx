import type { CSSProperties, HTMLAttributes } from "react";
import { skeletonStyle, skeletonTextGroupStyle } from "./Skeleton.css";

export type SkeletonProps = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: "none" | "small" | "medium" | "round";
} & HTMLAttributes<HTMLDivElement>;

export function Skeleton({
  width = "100%",
  height = 16,
  radius = "medium",
  className,
  style,
  ...props
}: SkeletonProps) {
  const skeletonClassName = skeletonStyle({ radius });

  return (
    <div
      aria-hidden="true"
      className={
        className ? `${skeletonClassName} ${className}` : skeletonClassName
      }
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export type SkeletonTextProps = {
  lines?: number;
  width?: CSSProperties["width"];
  lastLineWidth?: CSSProperties["width"];
} & HTMLAttributes<HTMLDivElement>;

export function SkeletonText({
  lines = 3,
  width = "100%",
  lastLineWidth = "64%",
  className,
  ...props
}: SkeletonTextProps) {
  return (
    <div
      aria-label="콘텐츠를 불러오는 중"
      className={
        className
          ? `${skeletonTextGroupStyle} ${className}`
          : skeletonTextGroupStyle
      }
      role="status"
      {...props}
    >
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          height={14}
          key={index}
          width={index === lines - 1 ? lastLineWidth : width}
        />
      ))}
    </div>
  );
}
