import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mykuckwqopqgoujebchk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15a3Vja3dxb3BxZ291amViY2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzU2ODQsImV4cCI6MjA3MDI1MTY4NH0.2roexrDMZmeP4UBgckI-PYjZ9HaXjHpzzVvWJkWK3Q8';
export const supabase = createClient(supabaseUrl, supabaseKey);