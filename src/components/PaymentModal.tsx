import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  QrCode,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface PaymentModalProps {
  isOpen: boolean;
  planId: 'pro' | 'annual';
  language: Language;
  onClose: () => void;
  onPaymentSuccess: (planId: 'pro' | 'annual', paymentId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  planId,
  language,
  onClose,
  onPaymentSuccess,
}) => {
  const t = (key: string, params?: Record<string, string>) => getTranslation(language, key, params);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(23);

  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const merchantUpiId = '9391700862@ybl';
  const amountInInr = planId === 'annual' ? 799 : 99;

  // Construct official UPI Deep Link URI
  const upiUri = `upi://pay?pa=${merchantUpiId}&pn=HydraFlow&am=${amountInInr}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUri)}`;

  // Stop active countdown timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Initialize fresh 23-second timestamp-based countdown timer
  const startSimulationTimer = useCallback(() => {
    stopTimer();
    setIsSuccess(false);
    const now = Date.now();
    startTimeRef.current = now;
    setRemainingSeconds(23);

    timerRef.current = setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, 23 - elapsed);
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        stopTimer();
        setIsSuccess(true);
      }
    }, 200);
  }, [stopTimer]);

  useEffect(() => {
    if (isOpen) {
      startSimulationTimer();
    } else {
      stopTimer();
      setIsSuccess(false);
    }
    return () => {
      stopTimer();
    };
  }, [isOpen, startSimulationTimer, stopTimer]);

  // Copy UPI ID handler
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(merchantUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Continue to HydraFlow handler after success
  const handleContinue = () => {
    onPaymentSuccess(planId, `demo_pay_${Date.now()}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      id="payment-modal-backdrop"
    >
      <div
        className="relative w-full max-w-lg bg-slate-900/95 border border-white/20 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl text-white overflow-hidden my-8 animate-fade-in"
        id="payment-modal-card"
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200" />

        {/* Close / Cancel Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
          id="payment-modal-close-btn"
          aria-label={t('cancel')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="flex items-center space-x-3 mb-5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-400/20 text-teal-300 border border-teal-300/40 flex items-center justify-center shrink-0 shadow-glow">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>💧 HydraFlow Demo Payment</span>
            </h3>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300 bg-teal-950/90 border border-teal-300/30 px-2.5 py-0.5 rounded-full">
                {planId === 'annual' ? t('annualPlan') : t('proPlan')}
              </span>
              <span className="text-sm font-bold text-white/90">
                ₹{amountInInr} {planId === 'annual' ? '/ year' : '/ month'}
              </span>
            </div>
          </div>
        </div>

        {!isSuccess ? (
          /* ACTIVE PAYMENT SIMULATION FLOW */
          <div className="space-y-5">
            {/* Demo Payment Notice Banner */}
            <div className="bg-amber-500/15 border border-amber-300/40 rounded-2xl p-3 flex items-center space-x-3 text-amber-200 text-xs font-semibold shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
              <span>Demo Payment — No real money will be charged.</span>
            </div>

            {/* Instruction */}
            <p className="text-xs text-white/80 font-medium text-center">
              Scan the QR code using any UPI app.
            </p>

            {/* QR Code Container */}
            <div className="bg-white/10 border border-white/15 rounded-2xl p-5 flex flex-col items-center text-center space-y-3">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-teal-300 uppercase tracking-wider">
                <QrCode className="w-4 h-4" />
                <span>Scan QR Code</span>
              </div>

              <div className="p-3 bg-white rounded-2xl shadow-2xl border border-white/40">
                <img
                  src={qrCodeUrl}
                  alt="HydraFlow UPI QR Code"
                  className="w-44 h-44 object-contain rounded-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* UPI ID Field & Copy Button */}
              <div className="w-full space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-medium text-white/70 px-1">
                  <span>UPI ID:</span>
                  <span className="font-mono text-teal-300 font-bold">{merchantUpiId}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={merchantUpiId}
                    className="flex-1 bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs font-mono text-teal-200 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyUpi}
                    className="px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl text-xs font-bold text-white flex items-center space-x-1.5 transition-all shadow-sm"
                    id="copy-upi-btn"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-300" />
                        <span className="text-teal-300">UPI ID copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Open UPI App Button for Mobile */}
                <a
                  href={upiUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-teal-400/20 hover:bg-teal-400/30 border border-teal-300/40 rounded-xl text-xs font-extrabold text-teal-200 flex items-center justify-center space-x-2 transition-all mt-2"
                >
                  <span>Open UPI App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Timestamp Countdown Timer Display */}
            <div className="bg-teal-950/70 border border-teal-300/30 rounded-2xl p-4 text-center space-y-2 relative overflow-hidden shadow-glow">
              <div className="flex items-center justify-center space-x-2 text-teal-300 text-xs font-extrabold uppercase tracking-wide">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>Payment simulation will complete in:</span>
              </div>

              <div className="text-3xl font-black text-white tracking-tight">
                {remainingSeconds} <span className="text-sm font-normal text-teal-200/80">seconds</span>
              </div>

              {/* Countdown Progress Bar */}
              <div className="w-full bg-teal-950 h-2 rounded-full overflow-hidden border border-teal-300/20 mt-2">
                <div
                  className="bg-gradient-to-r from-teal-400 to-cyan-300 h-full transition-all duration-200"
                  style={{ width: `${(remainingSeconds / 23) * 100}%` }}
                />
              </div>
            </div>

            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs rounded-2xl transition-all"
              id="cancel-modal-btn"
            >
              Cancel
            </button>
          </div>
        ) : (
          /* DEMO PAYMENT SUCCESSFUL SCREEN */
          <div className="py-4 space-y-6 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-teal-400/20 border border-teal-300/60 text-teal-300 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle2 className="w-10 h-10 fill-teal-300 text-teal-950" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">🎉 Demo Payment Successful!</h4>
              <p className="text-sm font-bold text-teal-300">
                {planId === 'annual'
                  ? 'Your Annual Plan is now active.'
                  : 'Your Pro Plan is now active.'}
              </p>
            </div>

            {/* Transaction Summary Details */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-xs space-y-2.5 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-white/70 font-medium">Payment Type:</span>
                <span className="font-extrabold text-teal-300">Demo / Simulation</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-white/70 font-medium">UPI ID:</span>
                <span className="font-mono text-white font-bold">{merchantUpiId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70 font-medium">Amount:</span>
                <span className="font-extrabold text-white">₹{amountInInr}</span>
              </div>
            </div>

            <p className="text-[11px] text-white/60 italic">
              Demo payment completed successfully. No real money was charged.
            </p>

            <button
              onClick={handleContinue}
              className="w-full py-4 px-6 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-teal-950 font-black rounded-2xl shadow-lg shadow-teal-500/30 transition-all text-base flex items-center justify-center space-x-2"
              id="continue-hydraflow-btn"
            >
              <Sparkles className="w-5 h-5 fill-teal-950" />
              <span>Continue to HydraFlow</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
