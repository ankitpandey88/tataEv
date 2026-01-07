import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabase = {
    auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signInWithPassword: async () => ({ error: new Error('Supabase is disabled') }),
        signUp: async () => ({ error: new Error('Supabase is disabled') }),
        signOut: async () => ({ error: null }),
    },
    from: () => ({
        insert: async () => ({ error: null }),
        select: async () => ({ data: [], error: null }),
    })
} as any;
