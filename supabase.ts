
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzazenyilvsrhbizagfm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6YXplbnlpbHZzcmhiaXphZ2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMzAyMDUsImV4cCI6MjA5MjcwNjIwNX0.YL6gK1r_OsccnBFGd2HLK4Hy9F7JsmXJYtG9qEA6ubA';

export const supabase = createClient(supabaseUrl, supabaseKey);
