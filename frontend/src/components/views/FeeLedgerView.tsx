import React, { useState } from 'react';
import { 
  CreditCard, 
  Receipt, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Building2, 
  Sparkles, 
  X, 
  Loader2 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_STUDENT_DATA } from '@/lib/mockData';
import { playSuccessChime, playClickTick } from '@/lib/soundEffects';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export function FeeLedgerView() {
  const [currentDue, setCurrentDue] = useState(MOCK_STUDENT_DATA.fees.currentDue);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState(MOCK_STUDENT_DATA.fees.transactions);

  const isCleared = currentDue === 0;

  const handleDownloadReceipt = (receiptNo: string) => {
    playClickTick();
    toast.success(`Official Institutional Receipt #${receiptNo} downloaded!`);
  };

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsProcessing(false);
    setShowCheckout(false);
    setCurrentDue(0);

    const newTx = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      receiptNumber: `RCP-${Date.now().toString().slice(-6)}`,
      description: 'Semester 5 Remaining Clearance & Amenities Fee',
      amount: 15000,
      date: 'Today',
      status: 'paid' as const,
      paymentMode: paymentMethod === 'upi' ? 'UPI (Google Pay)' : paymentMethod === 'card' ? 'Credit Card' : 'Net Banking',
      downloadUrl: '#receipt-new',
    };

    setTransactions([newTx, ...transactions]);
    playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    toast.success('Payment successfully authorized! Official clearance certificate generated.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Financial Bursar &amp; Student Accounts Portal
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Institutional Fee &amp; Transaction Ledger
          </h1>

          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            All accounts for {MOCK_STUDENT_DATA.profile.name} (Roll #{MOCK_STUDENT_DATA.profile.id}). Semester tuition, laboratory allocations, and accommodation clearances.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified by Fee &amp; Finance Agent
            </span>
            <span className="bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-200 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-300" />
              {MOCK_STUDENT_DATA.fees.nextDueNotice}
            </span>
          </div>
        </div>
      </div>

      {/* Top 3 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="pb-1">
            <span className="text-xs text-slate-500 font-semibold uppercase">Current Due</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              ₹{currentDue.toLocaleString()}
            </div>
            <span className={`text-xs font-bold ${isCleared ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isCleared ? '● Full Clearance' : '● Due Outstanding'}
            </span>
          </CardContent>
        </Card>

        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="pb-1">
            <span className="text-xs text-slate-500 font-semibold uppercase">Total Paid This Term</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              ₹1,70,000
            </div>
            <span className="text-xs text-blue-600 font-bold">● Tuition + Hostel Allocated</span>
          </CardContent>
        </Card>

        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="pb-1">
            <span className="text-xs text-slate-500 font-semibold uppercase">Next Invoice Date</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              Jan 15, 2027
            </div>
            <span className="text-xs text-slate-500 font-bold">● Semester 6 Registration</span>
          </CardContent>
        </Card>
      </div>

      {/* Action / Fee Simulator Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl shadow-soft-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <div className="text-xs font-bold text-amber-950">Razorpay Payment Gateway Integration</div>
            <div className="text-[11px] text-amber-800">Test secure card, net banking, or UPI authorization flow</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playClickTick();
            setCurrentDue(15000);
            setShowCheckout(true);
          }}
          className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-2xs transition cursor-pointer"
        >
          Simulate Payment (₹15,000)
        </button>
      </div>

      {/* Past Transactions Ledger */}
      <Card className="border-slate-200/90 shadow-soft-xs overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold text-slate-900">
              Verified Payment History &amp; Official Receipts
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Digital receipts signed with institutional bursar encryption
            </CardDescription>
          </div>
          <Badge variant="agent" agentId="fee">
            Audited Ledger
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Receipt Ref</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3 font-mono font-bold text-amber-700">
                      #{tx.receiptNumber}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">
                      {tx.description}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {tx.date}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₹{tx.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-[11px]">
                      {tx.paymentMode}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownloadReceipt(tx.receiptNumber)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-slate-400" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Razorpay Simulation Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden space-y-4 p-5">
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

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500">Amount Due:</span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  ₹{currentDue.toLocaleString()}
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Zero Convenience Fee
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Payment Option</span>
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
                  <span>UPI</span>
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
                    <span>Authorizing Transaction...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize &amp; Pay (₹{currentDue.toLocaleString()})</span>
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
