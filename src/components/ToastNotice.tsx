import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastNoticeProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ToastNotice: React.FC<ToastNoticeProps> = ({ title, message, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-amber-500/20 backdrop-blur-2xl border border-amber-300/40 text-amber-100 p-5 rounded-2xl shadow-2xl flex items-start space-x-3"
          id="early-completion-toast"
        >
          <AlertCircle className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-extrabold text-sm text-amber-200">{title}</h4>
            <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-amber-200 hover:text-white p-1 rounded-lg transition-colors bg-white/10 hover:bg-white/20"
            id="toast-close-btn"
            aria-label="Close warning"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
