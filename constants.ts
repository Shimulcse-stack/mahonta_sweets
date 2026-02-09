
import { Product, Category } from './types.ts';

const JALEBI_IMG = "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=800&auto=format&fit=crop";
const ROSOGOLLA_IMG = "https://images.unsplash.com/photo-1593708602862-cf441440a81d?q=80&w=800&auto=format&fit=crop";
const MIXED_SWEETS_IMG = "https://images.unsplash.com/photo-1589113103503-49655819036d?q=80&w=800&auto=format&fit=crop";
const DOI_IMG = "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=800&auto=format&fit=crop";
const SNACKS_IMG = "https://images.unsplash.com/photo-1601050690597-df056fb04791?q=80&w=800&auto=format&fit=crop";

export const CATEGORIES: Category[] = [
  { id: 1, name: 'রসগোল্লা', slug: 'rosogolla', image: ROSOGOLLA_IMG },
  { id: 2, name: 'জিলাপি', slug: 'jalebi', image: JALEBI_IMG },
  { id: 3, name: 'দই', slug: 'curd', image: DOI_IMG },
  { id: 4, name: 'স্ন্যাকস', slug: 'snacks', image: SNACKS_IMG }
];

export const PRODUCTS: Product[] = [
  { 
    id: 101, 
    name: 'স্পেশাল রসগোল্লা', 
    category: 'রসগোল্লা', 
    weight: '১ কেজি', 
    price: 450, 
    image: ROSOGOLLA_IMG,
    ingredients: ['খাঁটি গরুর দুধের ছানা', 'চিনি', 'এলাচ'],
    specialties: ['স্পঞ্জি টেক্সচার', 'মাঝারি মিষ্টি', 'প্রতিদিন টাটকা'],
    nutrition: 'প্রতি ১০০ গ্রামে প্রায় ৩১০ ক্যালরি',
    story: 'আমাদের রসগোল্লা তৈরির গোপন রহস্য লুকিয়ে আছে ছানা তৈরির পদ্ধতিতে। ২৬ বছর ধরে একই বিশ্বস্ততায় তৈরি হচ্ছে এই অমূল্য স্বাদ।',
    authenticity_note: 'আমরা শুধুমাত্র স্থানীয় খামারিদের থেকে সংগ্রহ করা খাঁটি দুধ ব্যবহার করি।',
    is_snack: false
  },
  { 
    id: 102, 
    name: 'রেশমি জিলাপি (ঘি ভাজা)', 
    category: 'জিলাপি', 
    weight: '৫০০ গ্রাম', 
    price: 200, 
    image: JALEBI_IMG,
    ingredients: ['মাসকলাই ডাল', 'চিনি', 'খাঁটি ঘি'],
    specialties: ['অত্যন্ত মুচমুচে', 'ঘিয়ের সুবাস', 'গোল্ডেন কালার'],
    nutrition: 'প্রতি পিস জিলাপিতে প্রায় ১৫০ ক্যালরি',
    story: 'পুরান ঢাকার ঐতিহ্যবাহী রেসিপিতে তৈরি আমাদের এই জিলাপি এর মুচমুচে স্বাদের জন্য পরিচিত। ঘিয়ে ভাজার কারণে এর সুবাস অতুলনীয়।',
    authenticity_note: 'নিজস্ব ঘানি ভাঙ্গা ঘি দিয়ে ভাজা হয় যা স্বাস্থ্যসম্মত।',
    is_snack: false
  }
];

export const SNACKS: Product[] = [
  { id: 201, name: 'স্পেশাল সিঙাড়া', category: 'Snacks', weight: '৪ পিস', price: 60, image: "https://images.unsplash.com/photo-1601050690597-df056fb04791?q=80&w=800&auto=format&fit=crop", is_snack: true },
  { id: 202, name: 'মুচমুচে সমোসা', category: 'Snacks', weight: '৪ পিস', price: 80, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop", is_snack: true },
];
