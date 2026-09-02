import React from 'react';
import { X, BookOpen, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-[#1a1a1b] border border-[#2e2e30] rounded-2xl max-w-md w-full p-5 sm:p-6 text-gray-100 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#2e2e30] transition-colors cursor-pointer"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 id="modal-title" className="text-xl font-bold text-white font-sans">
            วิธีเล่น Wordle
          </h2>
        </div>

        {/* Instructions in Thai */}
        <div className="space-y-3.5 text-sm text-gray-300 leading-relaxed">
          <p>
            ทายคำศัพท์ภาษาอังกฤษ <strong>5 ตัวอักษร</strong> ให้ถูกต้องภายใน <strong>6 รอบ</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 text-xs sm:text-sm pl-1">
            <li>คำที่ทายแต่ละคำต้องเป็นคำศัพท์ภาษาอังกฤษ 5 ตัวอักษรที่มีความหมาย</li>
            <li>กดปุ่ม <strong>ENTER</strong> เพื่อส่งคำตอบ</li>
            <li>หลังจากส่งคำตอบ สีของกล่องตัวอักษรจะเปลี่ยนไปเพื่อบอกใบ้</li>
            <li>สามารถกดปุ่ม <strong>💡 คำใบ้</strong> เพื่อสุ่มใบ้ตัวอักษรที่ยังไม่เคยเปิดเผยได้ 1 ครั้งต่อเกม</li>
          </ul>

          <div className="border-t border-[#2e2e30] pt-3.5">
            <h3 className="font-bold text-white text-sm mb-3">ตัวอย่างความหมายของสี</h3>

            {/* Example 1 - Green */}
            <div className="mb-4 space-y-1.5">
              <div className="flex gap-1.5 justify-start">
                <div className="w-9 h-9 bg-[#538d4e] border-2 border-[#538d4e] text-white font-black flex items-center justify-center rounded text-base">
                  W
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  E
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  A
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  R
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  Y
                </div>
              </div>
              <p className="text-xs text-gray-300">
                ตัวอักษร <span className="text-emerald-400 font-bold">W</span> อยู่ในคำ และ<strong>อยู่ถูกตำแหน่ง</strong>
              </p>
            </div>

            {/* Example 2 - Yellow */}
            <div className="mb-4 space-y-1.5">
              <div className="flex gap-1.5 justify-start">
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  P
                </div>
                <div className="w-9 h-9 bg-[#b59f3b] border-2 border-[#b59f3b] text-white font-black flex items-center justify-center rounded text-base">
                  I
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  L
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  L
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  S
                </div>
              </div>
              <p className="text-xs text-gray-300">
                ตัวอักษร <span className="text-amber-400 font-bold">I</span> มีอยู่ในคำนี้ แต่<strong>อยู่ผิดตำแหน่ง</strong>
              </p>
            </div>

            {/* Example 3 - Gray */}
            <div className="mb-4 space-y-1.5">
              <div className="flex gap-1.5 justify-start">
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  V
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  A
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  G
                </div>
                <div className="w-9 h-9 bg-[#3a3a3c] border-2 border-[#3a3a3c] text-gray-400 font-black flex items-center justify-center rounded text-base">
                  U
                </div>
                <div className="w-9 h-9 border-2 border-[#3a3a3c] text-white font-bold flex items-center justify-center rounded text-base">
                  E
                </div>
              </div>
              <p className="text-xs text-gray-300">
                ตัวอักษร <span className="text-gray-400 font-bold">U</span> <strong>ไม่มีอยู่ในคำตอบ</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Start button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>เข้าใจแล้ว เริ่มเล่นเลย!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
