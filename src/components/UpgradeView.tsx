import React, { useState } from 'react';
import { Sparkles, Check, ShieldCheck, Crown } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { PaymentModal } from './PaymentModal';
import { UserSubscription } from '../services/payment';

interface UpgradeViewProps {
  language: Language;
  subscription: UserSubscription;
  onPaymentSuccess: (planId: 'pro' | 'annual', paymentId: string) => void;
}

export const UpgradeView: React.FC<UpgradeViewProps> = ({
  language,
  subscription,
  onPaymentSuccess,
}) => {
  const t = (key: string, params?: Record<string, string>) => getTranslation(language, key, params);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'pro' | 'annual'>('pro');

  const currentPlan = subscription.plan || 'free';

  const handleOpenPayment = (planId: 'pro' | 'annual') => {
    setSelectedPlanId(planId);
    setPaymentModalOpen(true);
  };

  const plans = [
    {
      id: 'free',
      name: t('freePlanName'),
      price: t('freePlanPrice'),
      period: t('freePlanPeriod'),
      popular: false,
      btnLabel: currentPlan === 'free' ? t('currentPlanBtn') : 'Free Tier',
      isCurrent: currentPlan === 'free',
      features: [
        t('featFree1'),
        t('featFree2'),
        t('featFree3'),
        t('featFree4'),
        t('featFree5'),
        t('featFree6'),
      ],
    },
    {
      id: 'pro',
      name: t('proPlanName'),
      price: t('proPlanPrice'),
      period: t('proPlanPeriod'),
      popular: false,
      btnLabel: currentPlan === 'pro' ? 'Pro Plan Active' : t('upgradeToProBtn'),
      isCurrent: currentPlan === 'pro',
      features: [
        t('featFree1'),
        t('featPro1'),
        t('featPro2'),
        t('featPro3'),
        t('featPro4'),
        t('featPro5'),
      ],
    },
    {
      id: 'annual',
      name: t('annualPlanName'),
      price: t('annualPlanPrice'),
      period: t('annualPlanPeriod'),
      popular: true,
      btnLabel: currentPlan === 'annual' ? 'Annual Plan Active' : t('upgradeToAnnualBtn'),
      isCurrent: currentPlan === 'annual',
      features: [
        t('featAnnual1'),
        t('featAnnual2'),
        t('featPro1'),
        t('featPro2'),
        t('featPro3'),
        t('featAnnual3'),
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-white" id="upgrade-view-container">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        {currentPlan !== 'free' ? (
          <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-teal-950 bg-teal-300 border border-teal-200 px-4 py-1.5 rounded-full shadow-glow">
            <Crown className="w-4 h-4 fill-teal-950" />
            <span>
              {currentPlan === 'annual' ? t('annualActiveTitle') : t('proActiveTitle')}
            </span>
          </div>
        ) : (
          <span className="text-xs font-bold uppercase tracking-wider text-teal-200 bg-teal-950/60 border border-teal-300/30 px-3.5 py-1.5 rounded-full shadow-glow">
            HydraIST SaaS Plans
          </span>
        )}

        <h2 className="text-3xl font-black text-white tracking-tight">
          {t('pricingTitle')}
        </h2>
        <p className="text-sm text-white/80">
          {t('pricingSubtitle')}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between transition-all backdrop-blur-2xl ${
              plan.isCurrent
                ? 'bg-teal-950/40 border-2 border-teal-300 shadow-glow scale-102'
                : plan.popular
                ? 'bg-white/20 border-2 border-teal-300/70 shadow-2xl scale-102'
                : 'bg-white/10 border border-white/20 shadow-xl'
            }`}
            id={`pricing-plan-card-${plan.id}`}
          >
            {plan.popular && !plan.isCurrent && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-300 text-teal-950 text-[11px] font-black px-4 py-1 rounded-full shadow-glow uppercase tracking-wider">
                {t('mostPopularTag')}
              </span>
            )}

            {plan.isCurrent && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-400 text-teal-950 text-[11px] font-black px-4 py-1 rounded-full shadow-glow uppercase tracking-wider flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Active Plan</span>
              </span>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                {(plan.popular || plan.isCurrent) && <Sparkles className="w-5 h-5 text-teal-300" />}
              </div>

              <div className="my-5">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-xs text-white/70 ml-1">/ {plan.period}</span>
              </div>

              <div className="space-y-3 my-6">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-white/90">
                    <Check className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (plan.id === 'pro' || plan.id === 'annual') {
                  handleOpenPayment(plan.id);
                }
              }}
              disabled={plan.isCurrent}
              className={`w-full py-4 rounded-2xl font-black text-xs transition-all ${
                plan.isCurrent
                  ? 'bg-teal-400/20 text-teal-300 border border-teal-300/30 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-teal-400 hover:bg-teal-300 text-teal-950 shadow-lg shadow-teal-500/30'
                  : 'bg-white hover:bg-teal-100 text-teal-950 shadow-lg'
              }`}
              id={`plan-btn-${plan.id}`}
            >
              {plan.btnLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Notice */}
      <div className="max-w-md mx-auto text-center space-y-2 pt-4">
        <div className="flex items-center justify-center space-x-2 text-xs text-white/70">
          <ShieldCheck className="w-4 h-4 text-teal-300" />
          <span>Demonstration UPI QR Payment Flow</span>
        </div>
        <p className="text-[11px] text-white/50">
          Supports Google Pay, PhonePe, Paytm, BHIM and all major UPI apps in India.
        </p>
      </div>

      {/* Razorpay UPI Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        planId={selectedPlanId}
        language={language}
        onClose={() => setPaymentModalOpen(false)}
        onPaymentSuccess={onPaymentSuccess}
      />
    </div>
  );
};
