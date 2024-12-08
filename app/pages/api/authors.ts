// pages/api/users.js
import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('authors').select('*');
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  }
}
