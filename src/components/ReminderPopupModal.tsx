import React from 'react';
import { Droplet, Clock, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HydrationItem, Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface ReminderPopupModalProps {
  isOpen: boolean;
  item: HydrationItem | null;
  language: Language;
  onComplete: (itemId: string) => void;
  onSnooze: (itemId: string, minutes: number) => void;
  onClose: () => void;
}

export const ReminderPopupModal: React.FC<ReminderPopupModalProps> = ({
  isOpen,
  item,
  language,
  onComplete,
  onSnooze,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  const t = (key: string, params?: Record<string, string>) => getTranslation(language, key, params);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md" id="reminder-modal-backdrop">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl text-white overflow-hidden"
          id="reminder-modal-card"
        >
          {/* Top Decorative Water Glow */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/60 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            id="reminder-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mt-2">
            <div className="w-20 h-20 rounded-full bg-teal-400/20 text-teal-300 flex items-center justify-center mb-5 border border-teal-300/40 shadow-glow animate-pulse">
              <Droplet className="w-10 h-10 fill-teal-300" />
            </div>

            <h3 className="text-2xl font-extrabold tracking-tight text-white">
              {t('reminderTitle')}
            </h3>

            <p className="text-sm text-white/80 mt-2 max-w-sm">
              {t('reminderBody')}
            </p>

            <div className="my-6 px-5 py-4 bg-white/10 border border-white/20 rounded-2xl w-full flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-teal-300" />
                <span className="font-bold text-white text-base">{item.displayTime} IST</span>
              </div>
              <span className="text-sm font-extrabold text-teal-950 bg-teal-300 px-4 py-1.5 rounded-full shadow-glow">
                {item.amountMl} ml
              </span>
            </div>

            <div className="w-full space-y-4">
              <button
                onClick={() => {
                  onComplete(item.id);
                  onClose();
                }}
                className="w-full py-4 px-6 bg-teal-400 hover:bg-teal-300 text-teal-950 font-extrabold rounded-2xl shadow-lg shadow-teal-500/30 transition-all flex items-center justify-center space-x-2 text-sm"
                id="reminder-complete-now-btn"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-950" />
                <span>{t('markCompleteBtn')}</span>
              </button>

              <div className="pt-2">
                <p className="text-xs text-white/70 mb-2 font-semibold">{t('snoozeBtn')}:</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onSnooze(item.id, 5);
                      onClose();
                    }}
                    className="py-2.5 text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl transition-all"
                    id="snooze-5m-btn"
                  >
                    {t('snooze5m')}
                  </button>
                  <button
                    onClick={() => {
                      onSnooze(item.id, 10);
                      onClose();
                    }}
                    className="py-2.5 text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl transition-all"
                    id="snooze-10m-btn"
                  >
                    {t('snooze10m')}
                  </button>
                  <button
                    onClick={() => {
                      onSnooze(item.id, 15);
                      onClose();
                    }}
                    className="py-2.5 text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl transition-all"
                    id="snooze-15m-btn"
                  >
                    {t('snooze15m')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
