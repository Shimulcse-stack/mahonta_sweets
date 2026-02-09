
import React from 'react';
import { Product } from '../types.ts';

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
  onClearSearch: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, searchQuery, onAddToCart, onViewDetail, onClearSearch }) => {
  return (
    <section id="sweets" className="py-24 bg-[#FEF3E2]/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[#F9A03F] font-bold tracking-widest text-xs uppercase">তাজা ও সুস্বাদু</span>
            <h3 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">
              {searchQuery ? `"${searchQuery}" এর ফলাফল` : 'সেরা মিষ্টিসমূহ'}
            </h3>
          </div>
          {searchQuery && (
            <button 
              onClick={onClearSearch}
              className="text-gray-400 font-bold border-b-2 border-gray-200 pb-1 hover:text-[#F9A03F] hover:border-[#F9A03F] transition-all"
            >
              সবগুলো মিষ্টি দেখুন
            </button>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="bg-[#F9A03F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {product.category}
                     </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                     <button 
                       onClick={() => onViewDetail(product)}
                       className="bg-white text-[#1A1A1A] font-bold px-6 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-[#F9A03F] hover:text-white"
                     >
                       বিস্তারিত
                     </button>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-[#1A1A1A] mb-1 group-hover:text-[#F9A03F] transition-colors">{product.name}</h4>
                  <p className="text-sm text-gray-400 mb-6 font-medium">{product.weight}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">মূল্য</span>
                      <span className="text-2xl font-black text-[#F9A03F]">৳{product.price}</span>
                    </div>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-12 h-12 bg-[#FEF3E2] text-[#F9A03F] hover:bg-[#F9A03F] hover:text-white rounded-2xl transition-all duration-300 flex items-center justify-center shadow-sm"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[4rem] shadow-sm border border-gray-50 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <h4 className="text-2xl font-black text-[#1A1A1A] mb-2">দুঃখিত, কোনো মিষ্টি পাওয়া যায়নি!</h4>
            <p className="text-gray-400 font-medium max-w-sm">আপনার সার্চের সাথে মেলে এমন কোনো খাবার এই মুহূর্তে আমাদের তালিকায় নেই। দয়া করে অন্য কোনো নাম লিখে ট্রাই করুন।</p>
            <button 
              onClick={onClearSearch}
              className="mt-8 bg-[#FEF3E2] text-[#F9A03F] px-8 py-3 rounded-2xl font-black hover:bg-[#F9A03F] hover:text-white transition-all"
            >
              সব মিষ্টি দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
