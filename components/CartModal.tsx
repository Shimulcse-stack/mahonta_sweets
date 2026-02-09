
import React, { useState } from 'react';
import { CartItem } from '../types.ts';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  whatsapp_number: string;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
}

type CheckoutStep = 'cart' | 'form' | 'success';

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, whatsapp_number, onRemove, onUpdateQty }) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    area: 'inside'
  });
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = formData.area === 'inside' ? 60 : 120;
  const total = subtotal + deliveryCharge;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      setFormData({ name: '', phone: '', address: '', area: 'inside' });
    }, 300);
  };

  const handleConfirmOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('দয়া করে সব তথ্য পূরণ করুন।');
      return;
    }

    const newOrderId = 'MS-' + Math.floor(10000 + Math.random() * 90000);
    setOrderId(newOrderId);

    const cleanNumber = (whatsapp_number || "").replace(/\D/g, ''); 
    const itemsList = items.map(item => `- ${item.name} (${item.weight}) x ${item.quantity}: ৳${item.price * item.quantity}`).join('\n');
    
    const message = `*নতুন অর্ডার*\n` +
      `অর্ডার নম্বর: #${newOrderId}\n\n` +
      `*কাস্টমার ডিটেইলস:*\n` +
      `নাম: ${formData.name}\n` +
      `মোবাইল: ${formData.phone}\n` +
      `ঠিকানা: ${formData.address}\n` +
      `এলাকা: ${formData.area === 'inside' ? 'দিনাজপুরের ভেতরে' : 'দিনাজপুরের বাইরে'}\n\n` +
      `*অর্ডার লিস্ট:*\n${itemsList}\n\n` +
      `*পেমেন্ট ডিটেইলস:*\n` +
      `সাব-টোটাল: ৳${subtotal}\n` +
      `ডেলিভারি চার্জ: ৳${deliveryCharge}\n` +
      `*মোট দেয়: ৳${total}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank');
    
    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        
        <div className="p-8 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-black text-[#1A1A1A]">
            {step === 'cart' && 'আপনার ব্যাগ'}
            {step === 'form' && 'অর্ডার সম্পন্ন করুন'}
            {step === 'success' && 'ধন্যবাদ!'}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {step === 'cart' && (
            items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <div className="w-24 h-24 bg-[#FEF3E2] rounded-full flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#F9A03F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                   </svg>
                </div>
                <p className="font-bold text-lg">আপনার ব্যাগটি খালি!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-20 h-20 rounded-3xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-[#1A1A1A] text-lg">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-red-300 hover:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{item.weight}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all font-black text-[#F9A03F]"> − </button>
                          <span className="px-4 font-black text-[#1A1A1A]">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all font-black text-[#F9A03F]"> + </button>
                        </div>
                        <span className="font-black text-[#F9A03F] text-xl">৳{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {step === 'form' && (
            <div className="space-y-8">
              <section className="space-y-6">
                <h3 className="text-[#F9A03F] font-black text-sm uppercase tracking-widest">ডেলিভারি তথ্য</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">আপনার নাম</label>
                    <input 
                      type="text" 
                      placeholder="যেমন: আরমান হোসেন"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#F9A03F] focus:ring-2 focus:ring-[#F9A03F]/20 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">মোবাইল নম্বর</label>
                    <input 
                      type="tel" 
                      placeholder="০১XXXXXXXXX"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#F9A03F] focus:ring-2 focus:ring-[#F9A03F]/20 outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-3 ml-1">ডেলিভারি এরিয়া</label>
                    <div className="flex gap-4">
                      <button onClick={() => setFormData({...formData, area: 'inside'})} className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${formData.area === 'inside' ? 'border-[#F9A03F] bg-[#FEF3E2] text-[#F9A03F]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>দিনাজপুরের ভেতর</button>
                      <button onClick={() => setFormData({...formData, area: 'outside'})} className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${formData.area === 'outside' ? 'border-[#F9A03F] bg-[#FEF3E2] text-[#F9A03F]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>দিনাজপুরের বাইরে</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">বিস্তারিত ঠিকানা</label>
                    <textarea 
                      rows={3}
                      placeholder="বাসা নং, রাস্তা নং, এলাকা..."
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#F9A03F] focus:ring-2 focus:ring-[#F9A03F]/20 outline-none transition-all resize-none"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </section>

              <section className="bg-[#FEF3E2] p-8 rounded-[2.5rem] space-y-4">
                <h3 className="text-[#F9A03F] font-black text-sm uppercase">অর্ডার সামারি</h3>
                <div className="space-y-3 font-bold text-gray-600">
                  <div className="flex justify-between"><span>সাব-টোটাল</span><span>৳{subtotal}</span></div>
                  <div className="flex justify-between"><span>ডেলিভারি চার্জ</span><span>৳{deliveryCharge}</span></div>
                  <div className="pt-4 border-t border-[#F9A03F]/20 flex justify-between text-[#1A1A1A] text-xl font-black">
                    <span>মোট</span><span>৳{total}</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-[#1A1A1A] mb-4">অর্ডারটি সফল হয়েছে!</h3>
              <p className="text-[#F9A03F] font-bold text-lg mb-4">অর্ডার নম্বর: #{orderId}</p>
              <p className="text-gray-500 leading-relaxed mb-10 font-medium">
                আপনার অর্ডারের তথ্যগুলো আমরা WhatsApp-এ পাঠিয়েছি। আমাদের প্রতিনিধি খুব শীঘ্রই যোগাযোগ করবেন।
              </p>
              <button onClick={handleClose} className="w-full bg-[#F9A03F] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:shadow-[#F9A03F]/30 transition-all active:scale-95">ঠিক আছে</button>
            </div>
          )}
        </div>

        {items.length > 0 && step !== 'success' && (
          <div className="p-8 border-t bg-gray-50/50">
            {step === 'cart' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">মোট মূল্য</span>
                  <span className="text-4xl font-black text-[#1A1A1A]">৳{subtotal}</span>
                </div>
                <button 
                  onClick={() => setStep('form')}
                  className="w-full bg-[#F9A03F] text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:shadow-[#F9A03F]/30 transition-all flex items-center justify-center gap-4"
                >
                  চেকআউট করুন
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                 <button 
                  onClick={handleConfirmOrder}
                  className="w-full bg-[#25D366] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-4"
                >
                  অর্ডার কনফার্ম করুন
                </button>
                <button onClick={() => setStep('cart')} className="w-full text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-[#F9A03F]">ব্যাগে ফিরে যান</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
