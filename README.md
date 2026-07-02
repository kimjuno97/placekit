# PlaceKit

오프라인 매장 운영/결제 서비스에서 반복되는 UX 패턴을 컴포넌트와 디자인 토큰으로 정리한 React Design System 프로젝트입니다.

## Why

오프라인 매장 서비스는 빠른 조작, 명확한 상태 피드백, 다양한 디바이스 대응, 네트워크 불안정성 대응이 중요합니다.
PlaceKit은 이러한 문제를 디자인 시스템 관점에서 해결하기 위해 만들었습니다.

## Features

- Design Token
- Reusable Components
- Payment Status UX
- Loading / Empty / Error Pattern
- Date / Date Range Input Pattern
- Responsive Layout
- Keyboard Accessibility
- Storybook Documentation

## Usage

앱 진입점에서 스타일을 한 번만 불러옵니다. 프레임워크별 스타일 import 위치는 다음처럼 구성합니다.

```tsx
// React 앱: main.tsx 또는 App.tsx에서 한 번만 불러옵니다.
import "placekit/style.css";
```

```tsx
// Next.js App Router: app/layout.tsx에서 한 번만 불러옵니다.
import "placekit/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// Next.js Pages Router: pages/_app.tsx에서 한 번만 불러옵니다.
import type { AppProps } from "next/app";
import "placekit/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

컴포넌트가 필요한 파일에서는 사용할 컴포넌트만 import합니다.

```tsx
import { Button, DateRangePicker, OrderTable } from "placekit";

export function SettlementFilter() {
  return (
    <DateRangePicker
      label="정산 기간"
      onRangeChange={(range) => {
        console.log(range.startDate, range.endDate);
      }}
    />
  );
}
```

## Tech Stack

React, TypeScript, Vite Library Mode, Vanilla Extract, Storybook, pnpm

## Components

- Accordion
- Button
- TextField
- DateField
- Calendar
- DateRangePicker
- Modal
- Toast
- Badge
- NetworkBanner
- PaymentStatus
- EmptyState
- ErrorState
- Skeleton
- OrderTable
- RefundConfirmDialog

## UX Principles

1. 중요한 액션은 중복 실행을 방지한다.
2. 결제 상태는 pending, failed, network_error를 명확히 구분한다.
3. Empty와 Error는 다른 의미로 다룬다.
4. 키보드만으로도 주요 플로우를 완료할 수 있어야 한다.
5. 로딩 중에도 레이아웃 흔들림을 최소화한다.
