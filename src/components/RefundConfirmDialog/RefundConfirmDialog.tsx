import { useState } from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Toast } from "../Toast/Toast";
import {
  labelStyle,
  summaryRowStyle,
  summaryStyle,
  valueStyle,
  warningStyle,
} from "./RefundConfirmDialog.css";

type RefundConfirmDialogProps = {
  amount: number;
  paymentId: string;
  open: boolean;
  onConfirm: () => Promise<void> | void;
  onOpenChange: (open: boolean) => void;
};

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  currency: "KRW",
  maximumFractionDigits: 0,
  style: "currency",
});

export function RefundConfirmDialog({
  amount,
  paymentId,
  open,
  onConfirm,
  onOpenChange,
}: RefundConfirmDialogProps) {
  const [confirming, setConfirming] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);

  const handleConfirm = async () => {
    setConfirming(true);

    try {
      await onConfirm();
      setToast("success");
      onOpenChange(false);
    } catch {
      setToast("error");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={!confirming}
        description="환불을 진행하기 전에 결제 ID와 환불 금액을 확인해 주세요."
        footer={
          <>
            <Button
              disabled={confirming}
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button
              loading={confirming}
              variant="danger"
              onClick={handleConfirm}
            >
              환불하기
            </Button>
          </>
        }
        open={open}
        title="환불을 진행할까요?"
        onOpenChange={onOpenChange}
      >
        <div className={summaryStyle}>
          <div className={summaryRowStyle}>
            <span className={labelStyle}>환불 금액</span>
            <strong className={valueStyle}>
              {currencyFormatter.format(amount)}
            </strong>
          </div>
          <div className={summaryRowStyle}>
            <span className={labelStyle}>결제 ID</span>
            <strong className={valueStyle}>{paymentId}</strong>
          </div>
        </div>
        <p className={warningStyle}>
          환불 요청 후에는 결제 승인 상태로 되돌릴 수 없습니다.
        </p>
      </Modal>
      <Toast
        description="환불 내역은 정산 화면에서 확인할 수 있습니다."
        duration={3000}
        open={toast === "success"}
        title="환불이 완료됐습니다."
        variant="success"
        onOpenChange={(nextOpen) => setToast(nextOpen ? "success" : null)}
      />
      <Toast
        description="잠시 후 다시 시도하거나 결제 상태를 확인해 주세요."
        duration={null}
        open={toast === "error"}
        title="환불 요청에 실패했습니다."
        variant="error"
        onOpenChange={(nextOpen) => setToast(nextOpen ? "error" : null)}
      />
    </>
  );
}
