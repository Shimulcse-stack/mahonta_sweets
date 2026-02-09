
import React, { useState, useRef } from 'react';
import { Product, AboutContent, SiteSettings, Category } from '../types.ts';
import { supabase } from '../supabase.ts';

interface AdminPanelProps {
  products: Product[];
  snacks: Product[];
  categories: Category[];
  aboutContent: AboutContent;
  siteSettings: SiteSettings;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateSnacks: (snacks: Product[]) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onUpdateAbout: (about: AboutContent) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  snacks, 
  categories,
  aboutContent, 
  siteSettings,
  onUpdateProducts, 
  onUpdateSnacks, 
  onUpdateCategories,
  onUpdateAbout,
  onUpdateSettings,
  onClose 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [activeTab, setActiveTab] = useState<'sweets' | 'snacks' | 'categories' | 'about' | 'settings'>('sweets');
  const [isSaving, setIsSaving] = useState(false);
  
  const [tempAbout, setTempAbout] = useState<AboutContent>(aboutContent);
  const [tempSettings, setTempSettings] = useState<SiteSettings>(siteSettings);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categoryFileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('ভুল পাসওয়ার্ড!');
    }
  };

  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'product' | 'logo' | 'category') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await resizeImage(file, 800, 800);
        if (target === 'product' && editingProduct) {
          setEditingProduct({ ...editingProduct, image: compressedBase64 });
        } else if (target === 'logo') {
          setTempSettings({ ...tempSettings, logo: compressedBase64 });
        } else if (target === 'category' && editingCategory) {
          setEditingCategory({ ...editingCategory, image: compressedBase64 });
        }
      } catch (err) {
        alert("ছবি আপলোড করতে সমস্যা হয়েছে।");
      }
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    const is_snack = activeTab === 'snacks';
    const payload = { ...editingProduct, is_snack };
    
    try {
      const { data, error } = await supabase.from('products').upsert(payload).select();
      if (!error) {
        if (is_snack) {
          onUpdateSnacks(editingProduct.id ? snacks.map(p => p.id === editingProduct.id ? (data[0] as Product) : p) : [...snacks, data[0] as Product]);
        } else {
          onUpdateProducts(editingProduct.id ? products.map(p => p.id === editingProduct.id ? (data[0] as Product) : p) : [...products, data[0] as Product]);
        }
        setEditingProduct(null);
        alert('সফলভাবে সেভ হয়েছে!');
      } else {
        alert('ত্রুটি: ' + error.message);
      }
    } catch (err) {
      alert('সিস্টেম এরর!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setIsSaving(true);
    
    const payload = { 
      ...editingCategory,
      slug: editingCategory.name?.toLowerCase().replace(/\s+/g, '-') || 'cat' 
    };

    try {
      const { data, error } = await supabase.from('categories').upsert(payload).select();
      if (!error && data) {
        onUpdateCategories(editingCategory.id && categories.some(c => c.id === editingCategory.id)
          ? categories.map(c => c.id === editingCategory.id ? data[0] as Category : c) 
          : [...categories, data[0] as Category]
        );
        setEditingCategory(null);
        alert('ক্যাটাগরি সফলভাবে সেভ হয়েছে!');
      } else {
        alert('ত্রুটি: ' + error.message);
      }
    } catch (err) {
      alert('সিস্টেম এরর!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase.from('about_content').upsert({ ...tempAbout, id: 1 });
      if (!error) {
        onUpdateAbout(tempAbout);
        alert('তথ্য আপডেট হয়েছে!');
      } else {
        alert(error.message);
      }
    } catch (err) {
      alert('সেভ করতে সমস্যা হয়েছে।');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase.from('site_settings').upsert({ ...tempSettings, id: 1 });
      if (!error) {
        onUpdateSettings(tempSettings);
        alert('সাইট সেটিংস আপডেট হয়েছে!');
      } else {
        alert(error.message);
      }
    } catch (err) {
      alert('সেভ করতে সমস্যা হয়েছে।');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) return;
    setIsSaving(true);
    try {
      const table = activeTab === 'categories' ? 'categories' : 'products';
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (!error) {
        if (activeTab === 'categories') onUpdateCategories(categories.filter(c => c.id !== id));
        else if (activeTab === 'sweets') onUpdateProducts(products.filter(p => p.id !== id));
        else onUpdateSnacks(snacks.filter(p => p.id !== id));
        alert('আইটেমটি ডিলিট করা হয়েছে।');
      } else {
        alert('ডিলিট করা যায়নি: ' + error.message);
      }
    } catch (err) {
      alert('সিস্টেম এরর!');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClasses = "w-full p-4 rounded-2xl border border-gray-200 mt-2 bg-white text-gray-900 focus:ring-2 focus:ring-[#F9A03F] outline-none shadow-sm transition-all";

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/90 backdrop-blur-xl p-6">
        <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-[#F9A03F] rounded-2xl mx-auto flex items-center justify-center text-white font-black text-3xl shadow-lg mb-4">ম</div>
            <h2 className="text-2xl font-black text-[#1A1A1A]">অ্যাডমিন লগইন</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" placeholder="পাসওয়ার্ড দিন" className={inputClasses} value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
            <div className="flex gap-4">
              <button type="button" onClick={onClose} className="flex-1 py-4 font-bold text-gray-400">বাতিল</button>
              <button type="submit" className="flex-1 bg-[#F9A03F] text-white py-4 rounded-2xl font-black shadow-xl hover:bg-[#E88E2E] transition-all">লগইন</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-gray-50 overflow-y-auto">
      {isSaving && (
        <div className="fixed inset-0 z-[300] bg-black/10 flex items-center justify-center backdrop-blur-sm">
           <div className="bg-white px-10 py-5 rounded-3xl shadow-2xl flex items-center gap-5">
             <div className="w-6 h-6 border-3 border-[#F9A03F] border-t-transparent rounded-full animate-spin"></div>
             <span className="font-black text-[#F9A03F]">লোড হচ্ছে...</span>
           </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black text-[#1A1A1A]">কন্ট্রোল প্যানেল</h1>
          <button onClick={onClose} className="bg-white p-4 rounded-3xl shadow-lg text-gray-400 hover:text-red-500 transition-all hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {['sweets', 'snacks', 'categories', 'about', 'settings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)} 
              className={`px-8 py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-sm ${activeTab === tab ? 'bg-[#F9A03F] text-white shadow-xl scale-105' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
            >
              {tab === 'sweets' ? 'মিষ্টিসমূহ' : tab === 'snacks' ? 'স্ন্যাকস' : tab === 'categories' ? 'ক্যাটাগরি' : tab === 'about' ? 'পরিচিতি' : 'সেটিংস'}
            </button>
          ))}
          
          {['sweets', 'snacks', 'categories'].includes(activeTab) && (
            <button 
              onClick={() => {
                if(activeTab === 'categories') setEditingCategory({ id: Date.now() });
                else setEditingProduct({ id: Date.now(), category: activeTab === 'sweets' ? 'মিষ্টি' : 'Snacks' });
              }} 
              className="ml-auto bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg flex items-center gap-3 hover:bg-green-600 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              নতুন আইটেম
            </button>
          )}
        </div>

        <div className="bg-white rounded-[3.5rem] shadow-xl overflow-hidden p-8">
          {activeTab === 'categories' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-8 py-6">ছবি</th>
                    <th className="px-8 py-6">নাম</th>
                    <th className="px-8 py-6 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {categories.map(cat => (
                    <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-4"><img src={cat.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100" /></td>
                      <td className="px-8 py-4 font-black text-[#1A1A1A] text-xl">{cat.name}</td>
                      <td className="px-8 py-4 text-right flex items-center justify-end gap-4">
                        <button onClick={() => setEditingCategory(cat)} className="bg-blue-50 text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">এডিট</button>
                        <button onClick={() => handleDelete(cat.id)} className="bg-red-50 text-red-500 px-6 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">ডিলিট</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'settings' ? (
            <form onSubmit={handleSaveSettings} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">দোকানের নাম</label>
                  <input className={inputClasses} value={tempSettings.shop_name} onChange={e => setTempSettings({...tempSettings, shop_name: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">হোয়াটসঅ্যাপ নম্বর</label>
                  <input className={inputClasses} value={tempSettings.whatsapp_number} onChange={e => setTempSettings({...tempSettings, whatsapp_number: e.target.value})} />
                </div>
                <div className="col-span-full border-t border-gray-100 pt-6">
                  <h3 className="text-xl font-black text-[#F9A03F] mb-6">হিরো সেকশন এডিট</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">প্রধান টাইটেল</label>
                      <input className={inputClasses} value={tempSettings.hero_title} onChange={e => setTempSettings({...tempSettings, hero_title: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">সাবটাইটেল</label>
                      <input className={inputClasses} value={tempSettings.hero_subtitle} onChange={e => setTempSettings({...tempSettings, hero_subtitle: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                   <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">দোকানের ঠিকানা</label>
                   <input className={inputClasses} value={tempSettings.address} onChange={e => setTempSettings({...tempSettings, address: e.target.value})} />
                </div>
                <div className="col-span-full">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">ফুটার বর্ণনা</label>
                  <textarea className={`${inputClasses} resize-none`} rows={3} value={tempSettings.footer_description} onChange={e => setTempSettings({...tempSettings, footer_description: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="bg-[#F9A03F] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-[#E88E2E] transition-all">সব সেভ করুন</button>
            </form>
          ) : activeTab === 'about' ? (
            <form onSubmit={handleSaveAbout} className="space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="col-span-full">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">টাইটেল</label>
                    <input className={inputClasses} value={tempAbout.title} onChange={e => setTempAbout({...tempAbout, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">ঐতিহ্য (বছরের সংখ্যা)</label>
                    <input className={inputClasses} value={tempAbout.years_legacy} onChange={e => setTempAbout({...tempAbout, years_legacy: e.target.value})} />
                  </div>
                  <div className="col-span-full">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">বর্ণনা</label>
                    <textarea className={`${inputClasses} resize-none`} rows={4} value={tempAbout.description} onChange={e => setTempAbout({...tempAbout, description: e.target.value})} />
                  </div>
               </div>
               <button type="submit" className="bg-[#F9A03F] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl">তথ্য সেভ করুন</button>
            </form>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-8 py-6">আইটেম</th>
                    <th className="px-8 py-6">মূল্য</th>
                    <th className="px-8 py-6 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(activeTab === 'sweets' ? products : snacks).map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-4 flex items-center gap-6">
                        <img src={p.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100" />
                        <div>
                           <div className="font-black text-[#1A1A1A] text-xl">{p.name}</div>
                           <div className="text-sm text-gray-400">{p.weight}</div>
                        </div>
                      </td>
                      <td className="px-8 py-4 font-black text-[#F9A03F] text-2xl">৳{p.price}</td>
                      <td className="px-8 py-4 text-right flex items-center justify-end gap-4">
                        <button onClick={() => setEditingProduct(p)} className="bg-blue-50 text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">এডিট</button>
                        <button onClick={() => handleDelete(p.id)} className="bg-red-50 text-red-500 px-6 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">ডিলিট</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-[#1A1A1A]/80 p-6 backdrop-blur-xl">
          <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl relative border border-[#F9A03F]/20">
            <h2 className="text-3xl font-black text-[#F9A03F] mb-8">ক্যাটাগরি এডিট</h2>
            <form onSubmit={handleSaveCategory} className="space-y-6">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">ক্যাটাগরির নাম</label>
                <input required className={inputClasses} value={editingCategory.name || ''} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 block mb-3">ছবি</label>
                <div className="flex flex-col gap-4">
                  {editingCategory.image && (
                    <img src={editingCategory.image} className="w-full h-48 rounded-3xl object-cover shadow-md" />
                  )}
                  <button type="button" onClick={() => categoryFileInputRef.current?.click()} className="bg-[#FEF3E2] text-[#F9A03F] py-3 rounded-2xl font-bold border border-[#F9A03F]/10">নতুন ছবি সিলেক্ট করুন</button>
                  <input type="file" ref={categoryFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'category')} />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setEditingCategory(null)} className="flex-1 py-4 font-bold text-gray-400">বাতিল</button>
                <button type="submit" disabled={isSaving} className="flex-1 bg-[#F9A03F] text-white py-4 rounded-2xl font-black shadow-xl">সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-[#1A1A1A]/80 p-6 backdrop-blur-xl">
          <div className="bg-white w-full max-w-2xl p-10 rounded-[4rem] shadow-2xl max-h-[90vh] overflow-y-auto relative border border-[#F9A03F]/20">
            <h2 className="text-3xl font-black text-[#F9A03F] mb-10">পণ্য এডিট</h2>
            <form onSubmit={handleSaveProduct} className="grid grid-cols-2 gap-8">
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">নাম</label>
                <input required className={inputClasses} value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">দাম (৳)</label>
                <input type="number" required className={inputClasses} value={editingProduct.price || ''} onChange={e => setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})} />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">ওজন/পরিমাণ</label>
                <input className={inputClasses} value={editingProduct.weight || ''} onChange={e => setEditingProduct({...editingProduct, weight: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">শুদ্ধতার নোট (Authenticity Note)</label>
                <input className={inputClasses} value={editingProduct.authenticity_note || ''} onChange={e => setEditingProduct({...editingProduct, authenticity_note: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 block mb-3">ছবি</label>
                <div className="relative group">
                   {editingProduct.image ? (
                     <div className="relative w-full h-72 rounded-[2.5rem] overflow-hidden">
                        <img src={editingProduct.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                           <span className="text-white font-black uppercase">পরিবর্তন করুন</span>
                        </div>
                     </div>
                   ) : (
                     <div onClick={() => fileInputRef.current?.click()} className="w-full h-72 border-4 border-dashed border-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-300 hover:border-[#F9A03F] transition-all cursor-pointer">
                        <span className="font-black uppercase tracking-widest">ছবি সিলেক্ট করুন</span>
                     </div>
                   )}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'product')} />
              </div>
              <div className="col-span-2 flex gap-4 pt-10">
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-4 font-bold text-gray-400">বাতিল</button>
                <button type="submit" disabled={isSaving} className="flex-1 bg-[#F9A03F] text-white py-4 rounded-2xl font-black shadow-xl">সব সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
