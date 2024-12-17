import { updateViews, fetchStartupById } from '@/lib/supabase';
import Ping from './Ping';
import { after } from 'next/server';

const View = async ({ id }: { id: string }) => {
  const { data: startup, error } = await fetchStartupById(id);
  if (error) {
    console.error('Error fetching startup:', error.message, error.details);
    return <div>Error loading startup. Please try again later.</div>;
  }

  after(async () => await updateViews(id, startup.views))

  return (
    <div className="view-container">
      <div className="absolute -top-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-semibold">
          {startup.views} {startup.views > 1 ? 'views' : 'view'}
        </span>
      </p>
    </div>
  )
}

export default View