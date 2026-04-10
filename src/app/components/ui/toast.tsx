import { Info } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-8 right-8 backdrop-blur-md rounded-2xl p-6 shadow-2xl z-50 max-w-sm animate-slide-up cursor-pointer border"
      style={{
        background: 'var(--brand-modal)',
        borderColor: 'var(--brand-active-border)',
      }}
      onClick={onClose}
    >
      <div className="flex items-start gap-3">
        <div
          className="rounded-full p-2 flex-shrink-0"
          style={{ background: 'var(--brand-active)' }}
        >
          <Info className="w-5 h-5" style={{ color: 'var(--brand-accent)' }} />
        </div>
        <div className="flex-1">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-text)' }}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
