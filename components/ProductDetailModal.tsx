
import React, { useState, useEffect } from 'react';
import { Product } from '../types.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const handleQtyChange = (val: string) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 1) {
      setQuantity(num);
    } else if (val === "") {
      setQuantity(1);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-white rounded-[4rem] overflow-hidden shadow-2xl animate-slide-in max-h-[90vh] flex flex-col lg:flex-row border border-[#F9A03F]/20">
        <button onClick={onClose} className="absolute top-8 right-8 z-50 p-3 bg-white/20 hover:bg-white text-[#F9A03F] rounded-full shadow-lg transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="lg:w-1/2 relative min-h-[400px]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 text-white space-y-2">
            <span className="bg-[#F9A03F] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg inline-block">
              {product.category}
            </span>
            <h2 className="text-5xl font-black">{product.name}</h2>
          </div>
        </div>

        <div className="lg:w-1/2 p-12 lg:p-16 overflow-y-auto bg-white">
          <div className="space-y-10">
            <section>
              <h4 className="text-[#F9A03F] font-black text-xs uppercase tracking-widest mb-4">পণ্যের বর্ণনা ও গল্প</h4>
              <p className="text-xl text-gray-500 leading-relaxed font-medium italic">
                "{product.story || 'খাঁটি স্বাদের এক অনন্য নিদর্শন। আমরা ঐতিহ্যের সাথে আধুনিক মানের সমন্বয় করি।'}"
              </p>
            </section>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <h4 className="text-[#F9A03F] font-black text-xs uppercase tracking-widest mb-4">প্রধান উপকরণ</h4>
                <ul className="space-y-2">
                  {product.ingredients && product.ingredients.length > 0 ? product.ingredients.map((ing, i) => (
                    <li key={i} className="text-gray-500 font-bold flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#F9A03F]"></div>
                      {ing}
                    </li>
                  )) : (
                    <li className="text-gray-400 italic">উপকরণ সংরক্ষিত</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="text-[#F9A03F] font-black text-xs uppercase tracking-widest mb-4">পুষ্টিগুণ</h4>
                <p className="text-gray-500 font-bold">{product.nutrition || 'টাটকা ও স্বাস্থ্যসম্মত'}</p>
              </div>
            </div>

            <section className="bg-[#FEF3E2] p-8 rounded-[2.5rem] border border-[#F9A03F]/10">
              <h4 className="text-[#F9A03F] font-black text-sm uppercase mb-3 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                শুদ্ধতার নিশ্চয়তা
              </h4>
              <p className="text-gray-500 font-medium">
                {product.authenticity_note || 'আমরা শতভাগ খাঁটি উপকরণ ব্যবহারের নিশ্চয়তা দিচ্ছি। প্রতিটি মিষ্টি আমাদের কারিগরদের ভালোবাসা দিয়ে তৈরি।'}
              </p>
            </section>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                  <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-12 h-12 rounded-xl bg-white text-[#F9A03F] font-black text-2xl flex items-center justify-center hover:bg-[#F9A03F] hover:text-white transition-all shadow-sm"> − </button>
                  <input type="text" value={quantity} onChange={(e) => handleQtyChange(e.target.value)} className="w-16 bg-transparent text-center font-black text-[#1A1A1A] text-xl focus:outline-none" />
                  <button onClick={() => setQuantity(prev => prev + 1)} className="w-12 h-12 rounded-xl bg-white text-[#F9A03F] font-black text-2xl flex items-center justify-center hover:bg-[#F9A03F] hover:text-white transition-all shadow-sm"> + </button>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest">মোট মূল্য</p>
                  <p className="text-3xl font-black text-[#F9A03F]">৳{totalPrice}</p>
                </div>
              </div>
              <button 
                onClick={() => { onAddToCart(product, quantity); onClose(); }}
                className="w-full sm:w-auto bg-[#F9A03F] text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl hover:shadow-[#F9A03F]/30 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                ব্যাগে যোগ করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
