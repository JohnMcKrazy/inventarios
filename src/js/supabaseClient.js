
// Supabase Client Configuration
// PLEASE PASTE YOUR SUPABASE CREDENTIALS HERE
const SUPABASE_URL = 'https://rdykbalwnruhrjtqzlum.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkeWtiYWx3bnJ1aHJqdHF6bHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODkxMTUsImV4cCI6MjA3OTM2NTExNX0.2qEUVfvkQRZqO3nGRgs-2Lr5uPolqbIwMMgG5nlYRrU';

if (SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    try {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Supabase client initialized");
    } catch (error) {
        console.error("Error initializing Supabase client:", error);
    }
} else {
    console.warn("Supabase credentials not found. Please update src/js/supabaseClient.js");
}
