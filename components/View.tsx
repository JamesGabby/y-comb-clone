import { fetchStartupById } from '@/lib/supabase';
import React from 'react'

const View = async ({ id }: { id: string }) => {
  const { data: startup, error } = await fetchStartupById(id);
  
  if (error) {
    console.error('Error fetching startup:', error.message, error.details);
    return <div>Error loading startup. Please try again later.</div>;
  }
  return (
    <div>Views: {startup.views}</div>
  )
}

export default View