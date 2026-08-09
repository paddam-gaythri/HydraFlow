import React, { useState } from 'react';
import { Sparkles, Check, Info, X } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface UpgradeViewProps {
  language: Language;
}

export const UpgradeView: React.FC<UpgradeViewProps> = ({ language }) => {
  const t = (key: string) => getTranslation(language, key);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const plans = [
    {
      id: 'free',
      name: t('freePlanName'),
      price: t('freePlanPrice'),
      period: t('freePlanPeriod'),
      popular: false,
      btnLabel: t('currentPlanBtn'),
      isCurrent: true,
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
      btnLabel: t('upgradeToProBtn'),
      isCurrent: false,
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
      btnLabel: t('upgradeToAnnualBtn'),
      isCurrent: false,
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
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-200 bg-teal-950/60 border border-teal-300/30 px-3.5 py-1.5 rounded-full shadow-glow">
          HydraIST SaaS Plans
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight">
          {t('pricingTitle')}
        </h2>
        <p className="text-sm text-white/80">
          {t('pricingSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between transition-all backdrop-blur-2xl ${
              plan.popular
                ? 'bg-white/20 border-2 border-teal-300 shadow-glow scale-102'
                : 'bg-white/10 border border-white/20 shadow-2xl'
            }`}
            id={`pricing-plan-card-${plan.id}`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-300 text-teal-950 text-[11px] font-black px-4 py-1 rounded-full shadow-glow uppercase tracking-wider">
                {t('mostPopularTag')}
              </span>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                {plan.popular && <Sparkles className="w-5 h-5 text-teal-300" />}
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
                if (!plan.isCurrent) {
                  setDemoModalOpen(true);
                }
              }}
              disabled={plan.isCurrent}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all ${
                plan.isCurrent
                  ? 'bg-white/10 text-white/50 border border-white/10 cursor-not-allowed'
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

      {/* Demo Payment Notice Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md" id="demo-payment-modal">
          <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl text-center text-white">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              id="demo-payment-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-teal-400/20 text-teal-300 border border-teal-300/40 flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Info className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-white">
              {t('demoPaymentModalTitle')}
            </h3>

            <p className="text-xs text-white/80 my-4 leading-relaxed">
              {t('demoPaymentModalBody')}
            </p>

            <button
              onClick={() => setDemoModalOpen(false)}
              className="w-full py-3 bg-teal-400 hover:bg-teal-300 text-teal-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/30 transition-all"
              id="demo-payment-ok-btn"
            >
              {t('closeBtn')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
