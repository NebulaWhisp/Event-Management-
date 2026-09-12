import React from 'react';
import { ToastNotification } from '../types';

interface ToastProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm pointer-events-none flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#2b2836]/95 backdrop-blur-xl shadow-2xl text-[#e6e0f2] transition-all duration-300 transform border-l-4 ${
            toast.isAccent ? 'border-[#ffb2ba]' : 'border-[#00dce6]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] shrink-0 ${
              toast.isAccent ? 'text-[#ffb2ba]' : 'text-[#00dce6]'
            }`}
          >
            {toast.icon || 'check_circle'}
          </span>
          <span className="font-medium text-xs text-[#e6e0f2] flex-1 leading-snug">
            {toast.message}
          </span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#ccc3d8] hover:text-[#e6e0f2] p-0.5 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
