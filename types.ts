
export interface Product {
  id: number;
  name: string;
  category: string;
  weight: string;
  price: number;
  image: string;
  ingredients?: string[];
  specialties?: string[];
  nutrition?: string;
  story?: string;
  authenticity_note?: string;
  is_snack?: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AboutContent {
  id?: number;
  title: string;
  description: string;
  years_legacy: string;
  features: string[];
  image: string;
}

export interface SiteSettings {
  id?: number;
  shop_name: string;
  hero_title: string;
  hero_subtitle: string;
  whatsapp_number: string;
  address: string;
  logo: string;
  footer_description: string;
}
