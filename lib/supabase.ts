// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase queries
export const fetchStartups = async (query?: string) => {
  const selectFields = `
    id,
    title,
    createdat,
    views,
    description,
    category,
    image,
    pitch,
    authors (id, name)
  `;

  // Base query
  const queryBuilder = supabase.from('startups').select(selectFields);

  // Apply filters if query exists
  if (query) {
    queryBuilder.or(
      `title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
    );
  }

  return await queryBuilder;
};