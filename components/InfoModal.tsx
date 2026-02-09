
import React from 'react';

export type InfoType = 'delivery' | 'privacy' | 'terms' | null;

interface InfoModalProps {
  type: InfoType;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    delivery: {
      title: 'ডেলিভারি তথ্য',
      icon: (
        <svg className="w-12 h-12 text-[#F9A03F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h5l3 3v6a1 1 0 01-1 1h-1m-4-1a1 1 0 01-1 1h-2m4-1a1 1 0 00-1-1h-1.33L9 14h5z" />
        </svg>
      ),
      details: [
        { label: 'ডেলিভারি সময়', value: 'অর্ডার কনফার্ম করার ২৪-৪৮ ঘণ্টার মধ্যে আমরা পণ্য পৌঁছে দিই।' },
        { label: 'ডেলিভারি চার্জ', value: 'ঢাকার ভেতরে ৬০ টাকা এবং ঢাকার বাইরে ১২০ টাকা।' },
        { label: 'অর্ডার ট্র্যাকিং', value: 'অর্ডার করার পর আমাদের কাস্টমার কেয়ার থেকে আপনাকে ট্র্যাকিং নম্বর দেওয়া হবে।' },
        { label: 'ক্যাশ অন ডেলিভারি', value: 'পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা রয়েছে।' }
      ]
    },
    privacy: {
      title: 'প্রাইভেসী পলিসি',
      icon: (
        <svg className="w-12 h-12 text-[#F9A03F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.158-2.046-.452-2.991z" />
        </svg>
      ),
      details: [
        { label: 'তথ্য সুরক্ষা', value: 'আপনার ব্যক্তিগত তথ্য (নাম, ফোন নম্বর, ঠিকানা) আমাদের কাছে শতভাগ নিরাপদ।' },
        { label: 'ব্যবহার', value: 'সংগৃহীত তথ্য শুধুমাত্র অর্ডার প্রসেসিং এবং ডেলিভারির জন্য ব্যবহার করা হয়।' },
        { label: 'গোপনীয়তা', value: 'আমরা তৃতীয় কোনো পক্ষের কাছে আপনার তথ্য শেয়ার বা বিক্রি করি না।' },
        { label: 'কুকিজ পলিসি', value: 'ইউজার এক্সপেরিয়েন্স উন্নত করতে আমরা সাধারণ ব্রাউজার কুকিজ ব্যবহার করতে পারি।' }
      ]
    },
    terms: {
      title: 'শর্তাবলী ও রিফান্ড',
      icon: (
        <svg className="w-12 h-12 text-[#F9A03F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      details: [
        { label: 'অর্ডার বাতিল', value: 'অর্ডার প্রসেসিং শুরু হওয়ার আগে আপনি অর্ডার বাতিল করতে পারবেন।' },
        { label: 'রিফান্ড পলিসি', value: 'পণ্য নষ্ট বা ভুল আইটেম পেলে ৩ দিনের মধ্যে জানালে আমরা দ্রুত রিফান্ড বা রিপ্লেসমেন্ট দেব।' },
        { label: 'পণ্য চেক', value: 'ডেলিভারি ম্যানের সামনে পণ্য চেক করে নেওয়া বাধ্যতামূলক।' },
        { label: 'মূল্য পরিবর্তন', value: 'বাজার পরিস্থিতি অনুযায়ী পণ্যের মূল্য যেকোনো সময় পরিবর্তিত হতে পারে।' }
      ]
    }
  };

  const current = content[type];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-[3.5rem] overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-10 md:p-14">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-[#F9A03F] transition-colors p-2 bg-gray-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-24 h-24 bg-[#FEF3E2] rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
              {current.icon}
            </div>
            <h3 className="text-3xl font-black text-[#1A1A1A]">{current.title}</h3>
            <div className="w-16 h-1.5 bg-[#F9A03F] rounded-full mt-4"></div>
          </div>

          <div className="space-y-6">
            {current.details.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 group hover:border-[#F9A03F]/30 transition-all">
                <h4 className="text-[#F9A03F] font-black text-xs uppercase tracking-widest mb-2">{item.label}</h4>
                <p className="text-gray-600 font-bold leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-[#F9A03F] text-white font-black rounded-2xl shadow-xl hover:shadow-[#F9A03F]/30 transition-all active:scale-95"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
