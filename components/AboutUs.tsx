
import React from 'react';
import { AboutContent } from '../types.ts';

interface AboutUsProps {
  content: AboutContent;
}

const AboutUs: React.FC<AboutUsProps> = ({ content }) => {
  const coreValues = [
    {
      title: 'শতভাগ খাঁটি',
      desc: 'আমরা আমাদের প্রতিটি মিষ্টিতে খাঁটি গরুর দুধ ও সেরা উপকরণ ব্যবহার করি।',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.158-2.046-.452-2.991z" />
        </svg>
      )
    },
    {
      title: 'ঐতিহ্যবাহী স্বাদ',
      desc: '1996 সাল থেকে আমরা একই স্বাদ ও মান বজায় রেখে চলেছি।',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'টাটকা পরিবেশন',
      desc: 'আমাদের নিজস্ব কারখানায় প্রতিদিন টাটকা মিষ্টি তৈরি করা হয়।',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 honey-shape opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 w-full relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#F9A03F] honey-circle-mask opacity-80 scale-105 rotate-3"></div>
              <img 
                src={content.image} 
                alt="Our Heritage" 
                className="honey-circle-mask shadow-2xl relative z-10 w-full h-[600px] object-cover border-8 border-white transition-transform group-hover:-translate-y-2 duration-500"
              />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#F9A03F] rounded-[3rem] z-20 flex items-center justify-center text-white text-center p-8 shadow-2xl border-8 border-white">
                <div className="flex flex-col">
                  <span className="font-black text-2xl leading-tight">{content.years_legacy}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-80">১৯৯৬ থেকে</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <span className="text-[#F9A03F] font-black tracking-widest text-xs uppercase block">আমাদের গল্প</span>
              <h3 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-tight">
                {content.title}
              </h3>
            </div>
            
            <p className="text-xl text-gray-500 leading-relaxed font-medium italic">
              "{content.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#FEF3E2] p-4 rounded-2xl border border-[#F9A03F]/10">
                  <div className="w-8 h-8 rounded-full bg-[#F9A03F] flex items-center justify-center text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-black text-[#1A1A1A]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 group text-center hover:-translate-y-3">
              <div className="w-20 h-20 bg-[#FEF3E2] text-[#F9A03F] rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#F9A03F] group-hover:text-white transition-all duration-500 shadow-inner">
                {val.icon}
              </div>
              <h5 className="text-2xl font-black text-[#1A1A1A] mb-4">{val.title}</h5>
              <p className="text-gray-500 leading-relaxed font-medium">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
