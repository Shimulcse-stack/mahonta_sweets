
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Categories from './components/Categories.tsx';
import ProductGrid from './components/ProductGrid.tsx';
import Footer from './components/Footer.tsx';
import AboutUs from './components/AboutUs.tsx';
import CartModal from './components/CartModal.tsx';
import ProductDetailModal from './components/ProductDetailModal.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { Product, CartItem, AboutContent, SiteSettings, Category } from './types.ts';
import { PRODUCTS as INITIAL_PRODUCTS, SNACKS as INITIAL_SNACKS, CATEGORIES as INITIAL_CATEGORIES } from './constants.ts';
import { supabase } from './supabase.ts';

const INITIAL_ABOUT: AboutContent = {
  title: 'মহন্ত সুইট এন্ড রেস্টুরেন্ট-এর ঐতিহ্যের গল্প',
  description: '১৯৯৬ সাল থেকে আমরা মিষ্টির জগতে শুদ্ধতা ও ঐতিহ্যের স্বাক্ষর রেখে আসছি। আমাদের প্রতিটি মিষ্টি তৈরির পেছনে রয়েছে বছরের পর বছর ধরে অর্জিত অভিজ্ঞতা এবং খাঁটি উপকরণের ভালোবাসা।',
  years_legacy: '২৬ বছরের ঐতিহ্য',
  image: 'https://www.thestatesman.com/wp-content/uploads/2022/05/Misti-Hub1.jpg',
  features: ['খাঁটি গরুর দুধের ছানা', 'প্রাকৃতিক উপাদান', 'নিজস্ব কারিগর', 'প্রতিদিন টাটকা পরিবেশন']
};

const INITIAL_SETTINGS: SiteSettings = {
  shop_name: 'মহন্ত সুইট',
  hero_title: 'মহন্ত সুইট এন্ড রেস্টুরেন্ট',
  hero_subtitle: 'স্বাদ ও ঐতিহ্যের এক অপূর্ব মিলনমেলা। ১৯৯৬ সাল থেকে আমরা আপনাদের সেবায় নিয়োজিত।',
  whatsapp_number: '8801619184281',
  address: 'পুলহাট ,সদর ,দিনাজপুর, বাংলাদেশ',
  logo: '', 
  footer_description: '"ঐতিহ্যবাহী স্বাদে খাঁটি মিষ্টির বিশ্বস্ত ঠিকানা। আমরা পৌঁছে দিই আপনার খুশিতে বাড়তি মিষ্টির আমেজ।"'
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [snacks, setSnacks] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent>(INITIAL_ABOUT);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Fetch data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch Categories
        const { data: catData, error: cError } = await supabase.from('categories').select('*').order('id', { ascending: true });
        if (!cError && catData && catData.length > 0) {
          setCategories(catData);
        } else {
          setCategories(INITIAL_CATEGORIES);
        }

        // Fetch Products
        const { data: productsData, error: pError } = await supabase.from('products').select('*');
        if (!pError && productsData && productsData.length > 0) {
          setProducts(productsData.filter((p: any) => !p.is_snack));
          setSnacks(productsData.filter((p: any) => p.is_snack));
        } else {
          setProducts(INITIAL_PRODUCTS);
          setSnacks(INITIAL_SNACKS);
        }

        // Fetch About
        const { data: aboutData, error: aError } = await supabase.from('about_content').select('*').single();
        if (!aError && aboutData) {
          setAboutContent({ ...INITIAL_ABOUT, ...aboutData });
        }

        // Fetch Settings
        const { data: settingsData, error: sError } = await supabase.from('site_settings').select('*').single();
        if (!sError && settingsData) {
          setSiteSettings({ ...INITIAL_SETTINGS, ...settingsData });
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCartItems((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSnacks = snacks.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F9A03F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#F9A03F] font-bold">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        settings={siteSettings}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main>
        {/* Home Section */}
        <div id="home">
          <Hero settings={siteSettings} />
        </div>
        
        {/* Only show categories if not searching */}
        {!searchQuery && <Categories categories={categories} />}
        
        {/* Sweets Section */}
        <div id="sweets">
          <ProductGrid 
            products={filteredProducts}
            searchQuery={searchQuery}
            onAddToCart={(product) => handleAddToCart(product, 1)} 
            onViewDetail={(product) => setSelectedProduct(product)}
            onClearSearch={() => setSearchQuery('')}
          />
        </div>

        {/* Snacks Section */}
        <section id="snacks" className="py-24 bg-white border-y border-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div className="space-y-2">
                <span className="text-[#F9A03F] font-bold tracking-widest text-xs uppercase">গরম ও মুচমুচে</span>
                <h3 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">বিকেলের স্ন্যাকস</h3>
              </div>
            </div>

            {filteredSnacks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {filteredSnacks.map((snack) => (
                  <div key={snack.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img src={snack.image} alt={snack.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <button onClick={() => setSelectedProduct(snack)} className="bg-white text-[#1A1A1A] font-bold px-6 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-[#F9A03F] hover:text-white">বিস্তারিত</button>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h4 className="text-xl font-bold text-[#1A1A1A] mb-1 group-hover:text-[#F9A03F] transition-colors">{snack.name}</h4>
                      <p className="text-sm text-gray-400 mb-6 font-medium">{snack.weight}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">মূল্য</span>
                          <span className="text-2xl font-black text-[#F9A03F]">৳{snack.price}</span>
                        </div>
                        <button onClick={() => handleAddToCart(snack, 1)} className="w-12 h-12 bg-[#FEF3E2] text-[#F9A03F] hover:bg-[#F9A03F] hover:text-white rounded-2xl transition-all duration-300 flex items-center justify-center shadow-sm">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-bold">এই নামে কোনো স্ন্যাকস খুঁজে পাওয়া যায়নি।</p>
              </div>
            )}
          </div>
        </section>
        
        {/* About Section */}
        <AboutUs content={aboutContent} />
      </main>

      <Footer settings={siteSettings} onOpenAdmin={() => setIsAdminOpen(true)} />

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        whatsapp_number={siteSettings.whatsapp_number}
        onRemove={handleRemoveFromCart} 
        onUpdateQty={handleUpdateQty} 
      />
      
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />

      {isAdminOpen && (
        <AdminPanel 
          products={products} 
          snacks={snacks}
          categories={categories}
          aboutContent={aboutContent}
          siteSettings={siteSettings}
          onUpdateProducts={setProducts} 
          onUpdateSnacks={setSnacks}
          onUpdateCategories={setCategories}
          onUpdateAbout={setAboutContent}
          onUpdateSettings={setSiteSettings}
          onClose={() => setIsAdminOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
