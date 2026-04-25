
import React from 'react';
import { Category } from '../types.ts';

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[#F9A03F] font-black tracking-widest text-xs uppercase block">আমাদের স্পেশাল কালেকশন</span>
          <h3 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">ক্যাটাগরি সমূহ</h3>
          <div className="w-20 h-1.5 bg-[#F9A03F] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative cursor-pointer">
              <div className="relative h-96 rounded-[3rem] overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border-2 border-transparent group-hover:border-[#F9A03F]/20">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                  <h4 className="text-white font-bold text-2xl tracking-tight mb-2 group-hover:text-[#F9A03F] transition-colors">{cat.name}</h4>
                  <div className="h-1 w-0 group-hover:w-16 bg-[#F9A03F] mx-auto transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
