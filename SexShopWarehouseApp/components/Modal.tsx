import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 backdrop-blur-sm p-4 md:inset-0">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-pink-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-pink-100 p-4 md:p-5">
            <h3 className="text-xl font-semibold text-pink-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-pink-400 hover:bg-pink-100 hover:text-pink-900"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Body */}
          <div className="p-4 md:p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};