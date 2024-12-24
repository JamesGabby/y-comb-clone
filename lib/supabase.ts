// CONNECT TO SUPABASE

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SUPABASE QUERIES

export const fetchStartupsByQuery = async (query?: string) => {
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

export const fetchStartupById = async (id?: string) => {
  const selectFields = `
    id,
    title,
    createdat,
    views,
    description,
    category,
    image,
    pitch,
    authors (id, name, image, username)
  `;

  const queryBuilder = supabase.from('startups').select(selectFields).eq('id', id).single();

  return await queryBuilder;
};

export const updateViews = async (id: string, currentViews: number) => {
  const { error } = await supabase
    .from('startups') 
    .update({ views: currentViews + 1 }) // The column(s) to update
    .eq('id', id); // Condition to match rows (update where `id` is 1)

  if (error) {
    console.error('Error updating column:', error);
  } else {
    console.log(`Updated record: id=${id} views=${currentViews+1}`);
  }
}

export const fetchAuthorById = async (id: string) => {
  const { data, error } = await supabase
    .from('authors') 
    .select('*') 
    .eq('id', id); // Condition to match rows (update where `id` is 1)

  if (error) {
    console.error('Error fetching author:', error);
  } 

  return data
}

export async function fetchAuthorByEmail(email: string | null | undefined) {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("email", email)
    .single(); // Expect a single record

  if (error) {
    console.error("Error fetching author by email:", error);
    return null;
  }
  return data;
}

export async function createAuthor({ id, name, username, email, image, bio }: { id: number, name: string | null | undefined, username: Object, email: string | null | undefined, image: string | null | undefined, bio: Object }) {
  const { data, error } = await supabase
    .from("authors")
    .insert([{ id, name, username, email, image, bio }]);

  if (error) {
    console.error("Error creating author:", error);
    return null;
  }
  return data;
}

export const fetchLastAuthor = async () => {
  const { data, error } = await supabase
    .from('authors') // Replace with your table name
    .select('*') // Specify columns or use '*' for all columns
    .order('id', { ascending: false }) // Order by the 'id' column in descending order
    .limit(1); // Limit the result to the last row

  if (error) {
    console.error('Error fetching the last row:', error);
    return null;
  }

  return data[0]; // The last row will be the first (and only) item in the array
}

