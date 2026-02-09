
import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types.ts';

interface HeaderProps {
  settings: SiteSettings;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ settings, cartCount, onOpenCart, searchQuery, onSearchChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full z-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-6 py-2.5 flex justify-end items-center gap-10 text-[13px] font-bold text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#F9A03F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>{settings.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#F9A03F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>{settings.whatsapp_number}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`w-full transition-all duration-300 bg-white ${isScrolled ? 'fixed top-0 shadow-lg py-3' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F9A03F] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-white font-black text-xl md:text-2xl">ম</span>
            </div>
            <h1 className="text-xl md:text-3xl font-black text-[#1A1A1A] tracking-tight hidden sm:block">{settings.shop_name}</h1>
          </div>

          <nav className="hidden lg:flex items-center gap-10 font-bold text-gray-700">
            {['হোম', 'মিষ্টিসমূহ', 'স্ন্যাকস', 'পরিচিতি'].map((link, idx) => (
              <a 
                key={idx}
                href={`#${['home', 'sweets', 'snacks', 'about'][idx]}`} 
                onClick={(e) => handleScrollTo(e, ['home', 'sweets', 'snacks', 'about'][idx])}
                className="hover:text-[#F9A03F] transition-all relative group whitespace-nowrap"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F9A03F] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative group hidden sm:block">
            <input 
              type="text" 
              placeholder="পছন্দের মিষ্টি খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-full py-2.5 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-[#F9A03F]/20 focus:border-[#F9A03F] transition-all font-medium text-[#1A1A1A]"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              )}
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Mobile Search Icon Toggle could go here, but keeping it simple for now */}
            <button onClick={onOpenCart} className="relative p-3 bg-[#FEF3E2] text-[#F9A03F] rounded-full hover:bg-[#F9A03F] hover:text-white transition-all shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF7E5F] text-white text-[11px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
