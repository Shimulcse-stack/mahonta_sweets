
import React from 'react';
import { SiteSettings } from '../types.ts';

interface HeroProps {
  settings: SiteSettings;
}

const Hero: React.FC<HeroProps> = ({ settings }) => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const title = settings?.hero_title || 'মহন্ত সুইট এন্ড রেস্টুরেন্ট';
  const titleWords = title.split(' ');
  const firstWord = titleWords[0];
  const restTitle = titleWords.slice(1).join(' ');

  return (
    <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 -left-20 w-80 h-80 honey-shape opacity-30"></div>
      <div className="absolute bottom-20 right-[35%] w-40 h-40 honey-shape opacity-20"></div>
      <div className="absolute top-40 left-10 w-32 h-40 dot-pattern opacity-30"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 py-16">
        <div className="space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-5 py-1.5 bg-[#FEF3E2] rounded-full text-[#F9A03F] font-bold text-xs uppercase tracking-widest border border-[#F9A03F]/20">
             খাঁটি মধুর স্বাদ
          </div>
          
          <h2 className="text-6xl md:text-9xl font-black leading-[1.05] tracking-tight">
            <span className="text-[#F9A03F]">{firstWord}</span> <br />
            <span className="text-[#1A1A1A]">{restTitle}</span>
          </h2>
          
          <p className="text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {settings?.hero_subtitle || ''}
          </p>

          <div className="pt-6">
            <button 
              onClick={() => handleScrollTo('sweets')}
              className="btn-premium px-14 py-6 rounded-full font-black text-xl"
            >
              প্রোডাক্ট দেখুন
            </button>
          </div>
        </div>

        <div className="relative mt-20 lg:mt-0 flex justify-center">
          <div className="relative w-[340px] h-[340px] md:w-[620px] md:h-[620px] animate-float">
            <div className="absolute inset-0 bg-[#F9A03F] honey-circle-mask opacity-80 scale-105"></div>
            <div className="absolute inset-0 bg-white honey-circle-mask scale-[0.98] z-10 overflow-hidden shadow-[0_50px_100px_rgba(249,160,63,0.15)]">
              <img 
                src="/dist/assets/image/heroSection.png" 
                alt="Honey Sweets" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Details */}
            <div className="absolute -bottom-10 -right-5 w-48 h-48 md:w-64 md:h-64 z-20 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl rotate-6">
              <img src="https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=500&auto=format&fit=crop" alt="Small Detail" className="w-full h-full object-cover" />
            </div>

            <div className="absolute -top-10 -right-10 w-40 h-40 dot-pattern opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
