import { fetchStartupById } from '@/lib/supabase'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const { data: startup, error } = await fetchStartupById(id);

  if (error) {
    console.error('Error fetching startup:', error.message, error.details);
    return <div>Error loading startup. Please try again later.</div>;
  }
  
  return (
    <div>{startup.id}</div>
  )
}

export default page