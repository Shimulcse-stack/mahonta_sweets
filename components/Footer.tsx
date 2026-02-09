
import React, { useState } from 'react';
import { SiteSettings } from '../types.ts';
import InfoModal, { InfoType } from './InfoModal.tsx';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const [activeInfo, setActiveInfo] = useState<InfoType>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="contact" className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-12 h-12 bg-[#F9A03F] rounded-xl flex items-center justify-center shadow-lg text-white font-black text-2xl">ম</div>
              <h5 className="text-3xl font-black text-[#1A1A1A]">{settings.shop_name}</h5>
            </div>
            <p className="text-gray-500 leading-relaxed font-medium">
              {settings.footer_description}
            </p>
          </div>

          <div className="text-center md:text-left">
            <h6 className="text-sm font-black mb-10 text-[#1A1A1A] uppercase tracking-[0.3em]">মেনু</h6>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleScrollTo(e, 'home')}
                  className="hover:text-[#F9A03F] transition-colors"
                >
                  হোম
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleScrollTo(e, 'about')}
                  className="hover:text-[#F9A03F] transition-colors"
                >
                  আমাদের পরিচিতি
                </a>
              </li>
              <li>
                <a 
                  href="#sweets" 
                  onClick={(e) => handleScrollTo(e, 'sweets')}
                  className="hover:text-[#F9A03F] transition-colors"
                >
                  মিষ্টিসমূহ
                </a>
              </li>
              <li>
                <a 
                  href="#snacks" 
                  onClick={(e) => handleScrollTo(e, 'snacks')}
                  className="hover:text-[#F9A03F] transition-colors"
                >
                  স্ন্যাকস
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h6 className="text-sm font-black mb-10 text-[#1A1A1A] uppercase tracking-[0.3em]">সাহায্য</h6>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li>
                <button 
                  onClick={() => setActiveInfo('delivery')}
                  className="hover:text-[#F9A03F] transition-colors text-left"
                >
                  ডেলিভারি তথ্য
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveInfo('privacy')}
                  className="hover:text-[#F9A03F] transition-colors text-left"
                >
                  প্রাইভেসী পলিসি
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveInfo('terms')}
                  className="hover:text-[#F9A03F] transition-colors text-left"
                >
                  শর্তাবলী
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-8 text-center md:text-left">
            <h6 className="text-sm font-black mb-10 text-[#1A1A1A] uppercase tracking-[0.3em]">যোগাযোগ</h6>
            <p className="text-gray-500 font-medium leading-relaxed">{settings.address}</p>
            <div className="text-3xl font-black text-[#F9A03F]">+{settings.whatsapp_number}</div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-[13px] font-bold">
            &copy; ২০২৫ {settings.shop_name}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-10">
            <span 
              onClick={onOpenAdmin} 
              className="text-[10px] text-gray-200 cursor-pointer hover:text-[#F9A03F] transition-all uppercase font-black"
            >
              অ্যাডমিন এক্সেস
            </span>
          </div>
        </div>
      </div>

      <InfoModal type={activeInfo} onClose={() => setActiveInfo(null)} />
    </footer>
  );
};

export default Footer;
