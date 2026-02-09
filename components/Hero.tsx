
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
                src="https://lh3.googleusercontent.com/rd-gg/AMW1TPodLx-FP9pIBpMPkYv2xZ28-mkF8Po8BNZe00V3NkasR05AC5rqVoNEqwaW9X-KvScvS3_4E1wvaIkD_Q88y9fJ4E3cYul6f9q4juJT7UIQOQRIXGADqbtgPn4Clp62vYeQdU6Znk5566-nroPc0wTlQYps5AHJZ6vs9YnK6CxIHioUBonQjcdSE7_PrTGV79Tx5g5YSvLLFgt3TNUKXnppgkdhgKnDB8ULIqejLzDlUMux9igf_w7InQ5onzK29Qm9iuOFc5I0gF7qN-m4ujcBap_Ke7ySGOI75zxKtVZTxNio3NtGrAetLfoYHyVlULTG2i2AsmpwemOsbXws-4Q0AoB2U_Bdw8jyCnzstl5ac2HG06cR4R522XRVZLiLYbXp3vx2YKtPEfAMrJ-0XiFrhyQ7upcHd7Row3Vr7lC-bbGTXBtOIHBQCxfEIyBOby1JqhZukUCKimSZDv2nWTDRoCuAWNNj6ZZBpS071DTzt_RQPjx-apSDe6kKBjMyXgdWWedugTBP6VmxKOPUBtVF2BOKOa5rsoL9FlaLfO-22omtc2P_ZpkRBNFyjhn6YGqOwYd26oxsJocDrOA_ajDRo0tF4oRQPkD0llvZgOlvX0CEqBZRKeFhUKeGjM0mqLjA5nf3rJo1T_AVsLqmFLroWTmly--PatpjZZVJwKeTjLcNvZUAy8MrR3QLZkdv6bFKmm_80Dc31cYXtig3ddQEOcNp8SyZUeWesuHSsyH89ZMMHZPY68xsLpVxGU2ik966h76G68iMyLU4-hl8Yjr1RM9OzjaucfMVhpW3wzJMj_YvF0W97bT1fImwyXQST1Q2pIEL6__5ghiaisNgaWrDneNX4orS94e0NSMIfNXt47X03kTelkiryT4vg4He1m9tIqafK308H6Z2S3--oyMOgth_Wwv9WudHMOZOEp1L2PfJNzm4_dRrEBBiviFVj2OHSajItfG0s2n-qJPowg6yT-WZX8lvOdkhZXa_ZeOmca1wKLlGoFCHQZ57J3yjokV1opPBiHrFBFvfl2FiSy28--eeqBkRoht7xFpdt5rkd2h-7c2ZcYbwHQX6IZzcmsAUKAliww1O-qoXzGZ81nxFPnC3oLrvXYkIoP-pZI-ed3L_kAycwagU9-z0ywEmQ-f3EIHtG-gTkj-lkUbGXrhJnvAUPBPrAX1BkR5J8Mi39YTh2exdIdCrwtwYs7QtbKrxCMhcSAMS5g1q2A4zp_xsK1zkHVJKEmhITopKsRUH9hiGx3ndJwH26EGQCwVCtX_NyorBfltLiCNFM-mCmMjzM-JlXfQp6W7HqX3yWHUPDJ8GJOJQ8t_nSc35gmaAoQ6H9lfDkB1Cl2JFIK0=s1024-rj" 
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
