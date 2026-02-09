
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://cwjihhkqakvfpqznaegk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3amloaGtxYWt2ZnBxem5hZWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzUxMjgsImV4cCI6MjA4NjE1MTEyOH0.uR474K5xA5wMl-h7Re-4GVeC3d2XAwxG219SnbKXweQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
