import { EmptyState } from "../EmptyState/EmptyState";
import { ErrorState } from "../ErrorState/ErrorState";
import { Skeleton } from "../Skeleton/Skeleton";
import { StatusBadge } from "../Badge/StatusBadge";
import type { StatusBadgeStatus } from "../Badge/StatusBadge";
import {
  amountStyle,
  cellStyle,
  headerCellStyle,
  rowStyle,
  skeletonCellStyle,
  tableStyle,
  tableWrapStyle,
} from "./OrderTable.css";

export type Order = {
  id: string;
  customerName: string;
  orderedAt: string;
  paymentMethod: string;
  amount: number;
  status: StatusBadgeStatus;
};

export type OrderTableProps = {
  orders?: Order[];
  loading?: boolean;
  error?: boolean;
  onRowClick?: (order: Order) => void;
};

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  currency: "KRW",
  maximumFractionDigits: 0,
  style: "currency",
});

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  month: "2-digit",
  day: "2-digit",
});

export function OrderTable({
  orders = [],
  loading = false,
  error = false,
  onRowClick,
}: OrderTableProps) {
  if (loading) {
    return (
      <div className={tableWrapStyle}>
        <table aria-label="주문 목록 로딩 중" className={tableStyle}>
          <tbody>
            {Array.from({ length: 5 }, (_, index) => (
              <tr key={index}>
                {Array.from({ length: 6 }, (_, cellIndex) => (
                  <td className={skeletonCellStyle} key={cellIndex}>
                    <Skeleton height={18} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        action={null}
        code="ORDERS_LOAD_FAILED"
        description="네트워크 상태를 확인한 뒤 주문 목록을 다시 불러와 주세요."
        title="주문 목록을 불러오지 못했습니다."
      />
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        description="새 주문이 들어오면 결제 상태와 함께 이곳에 표시됩니다."
        title="아직 주문이 없습니다."
      />
    );
  }

  return (
    <div className={tableWrapStyle}>
      <table className={tableStyle}>
        <thead>
          <tr>
            <th className={headerCellStyle} scope="col">
              주문 ID
            </th>
            <th className={headerCellStyle} scope="col">
              고객
            </th>
            <th className={headerCellStyle} scope="col">
              주문 시간
            </th>
            <th className={headerCellStyle} scope="col">
              결제 수단
            </th>
            <th className={headerCellStyle} scope="col">
              상태
            </th>
            <th className={headerCellStyle} scope="col">
              금액
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              className={rowStyle}
              key={order.id}
              onClick={() => onRowClick?.(order)}
            >
              <td className={cellStyle}>{order.id}</td>
              <td className={cellStyle}>{order.customerName}</td>
              <td className={cellStyle}>
                {dateFormatter.format(new Date(order.orderedAt))}
              </td>
              <td className={cellStyle}>{order.paymentMethod}</td>
              <td className={cellStyle}>
                <StatusBadge status={order.status} />
              </td>
              <td className={`${cellStyle} ${amountStyle}`}>
                {currencyFormatter.format(order.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
