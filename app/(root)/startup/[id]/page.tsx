import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { fetchStartupById } from '@/lib/supabase'
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const { data: startup, error } = await fetchStartupById(id);

  if (error) {
    console.error('Error fetching startup:', error.message, error.details);
    return <div>Error loading startup. Please try again later.</div>;
  }
  
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">
          {formatDate(startup.createdat)}
        </p>
        <h1 className="heading">
          {startup.title}
        </h1>
        <p className="sub-heading !max-w-5xl">
          {startup.description}
        </p>
      </section>

      <section className="section_container">
        <img src={startup.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${startup.authors.id}`} className='flex gap-2 items-center mb-3'>
              <Image src={startup.authors.image} alt='avatar' width={64} height={64} className='rounded-full drop-shadow-lg' />
              <div>
                <p className="text-20-medium">
                  {startup.authors.name}
                </p>
                <p className="text-16-medium !text-black-300">
                  @{startup.authors.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{startup.category}</p>
          </div>
          <h3 className="text-30-bold">
            Pitch Details
          </h3>
          <p className="prose max-w-4xl font-work-sans break-all">
            {startup.pitch}
          </p>
        </div>
        <hr className="divider" />
        {/* TODO: EDITOR SELECTED STARTUPS */}
        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          <View id={startup.id} />
        </Suspense>
      </section>
    </>
  )
}

export default page