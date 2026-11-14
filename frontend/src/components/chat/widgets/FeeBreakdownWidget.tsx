import React, { useState } from 'react';
import { 
  CreditCard, 
  Receipt, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  X, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { FeeWidgetData } from '@/types/chat';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface FeeBreakdownWidgetProps {
  data?: Partial<FeeWidgetData>;
}

const DEFAULT_FEE_DATA: FeeWidgetData = {
  totalFee: 125000,
  paidAmount: 125000,
  currentDue: 0,
  dueDate: 'Jan 15, 2027',
  receiptNumber: 'RCP-2026-9041',
  status: 'Cleared',
  breakdown: [
    { category: 'Semester 5 Tuition', amount: 85000, status: 'Paid' },
    { category: 'Computer Lab & Cloud Credits', amount: 20000, status: 'Paid' },
    { category: 'Library & Digital Journals', amount: 10000, status: 'Paid' },
    { category: 'Examination & Campus Amenities', amount: 10000, status: 'Paid' },
  ],
};

export function FeeBreakdownWidget({ data }: FeeBreakdownWidgetProps) {
  const [feeState, setFeeState] = useState<FeeWidgetData>({
    ...DEFAULT_FEE_DATA,
    ...data,
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const isCleared = feeState.status === 'Cleared' || feeState.currentDue === 0;

  const handleDownloadReceipt = () => {
    toast.success(`Official Fee Receipt #${feeState.receiptNumber} downloaded!`);
  };

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1600));

    setIsProcessing(false);
    setShowCheckout(false);

    // Update state to paid
    setFeeState((prev) => ({
      ...prev,
      currentDue: 0,
      paidAmount: prev.totalFee,
      status: 'Cleared',
      receiptNumber: `RCP-${Date.now().toString().slice(-6)}`,
    }));

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    toast.success('Payment authorized! Institutional receipt generated with instant clearance.');
  };

  return (
    <div className="mt-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5 text-amber-700">
          <CreditCard className="w-4 h-4 text-amber-600" />
          <span>Fee &amp; Finance Ledger · Semester 5</span>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isCleared
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {isCleared ? 'Full Clearance (₹0 Due)' : `₹${feeState.currentDue.toLocaleString()} Due`}
        </span>
      </div>

      {/* Summary Box */}
      <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-medium">Verified Paid Total:</span>
            <div className="text-base font-black text-slate-900 font-mono">
              ₹{feeState.paidAmount.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 font-medium">Receipt Reference:</span>
            <div className="text-xs font-mono font-bold text-amber-700">
              #{feeState.receiptNumber}
            </div>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
          {feeState.breakdown.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600">{item.category}</span>
              <span className="font-mono font-semibold text-slate-800">
                ₹{item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownloadReceipt}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition cursor-pointer"
        >
          <Receipt className="w-3.5 h-3.5 text-slate-500" />
          <span>Download Receipt</span>
        </button>

        {!isCleared ? (
          <button
            type="button"
            onClick={() => setShowCheckout(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Due (₹{feeState.currentDue})</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              // Allow simulating a test payment transaction
              setFeeState((prev) => ({
                ...prev,
                currentDue: 15000,
                status: 'Pending',
              }));
              setShowCheckout(true);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100/80 rounded-lg border border-amber-200 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Simulate Fee Payment</span>
          </button>
        )}
      </div>

      {/* Razorpay Simulation Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden space-y-4 p-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-black text-xs">
                  R
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Razorpay Smart Gateway</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Secured 256-bit Institutional Gateway</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Amount Banner */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500">Payable Amount:</span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  ₹{feeState.currentDue > 0 ? feeState.currentDue.toLocaleString() : '15,000'}
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Zero Convenience Fee
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Select Payment Method</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-800'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-800'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-800'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* Simulated UPI Input */}
            {paymentMethod === 'upi' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <label className="text-[11px] font-medium text-slate-600">Enter Virtual Payment Address (VPA)</label>
                <input
                  type="text"
                  readOnly
                  value="alex.student@okhdfcbank"
                  className="w-full text-xs font-mono p-2 rounded-lg bg-white border border-slate-200 text-slate-800"
                />
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSimulatePayment}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-soft-sm transition disabled:opacity-60 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Secure Authorization...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Complete Payment &amp; Verify Clearance</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
