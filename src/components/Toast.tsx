import React from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-2.5 rounded-md text-sm font-bold shadow-2xl border text-center select-none
            transform transition-all duration-300 animate-slide-down
            ${
              toast.type === 'error'
                ? 'bg-zinc-100 text-zinc-900 border-zinc-300 shadow-black/80'
                : toast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-950/60'
                : toast.type === 'info'
                ? 'bg-zinc-800 text-zinc-100 border-zinc-600 shadow-black/70'
                : 'bg-zinc-100 text-zinc-900 border-zinc-300 shadow-black/80'
            }
          `}
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
};
