import { supabase } from "@/lib/supabase"

const page = async () => {
  const { data, error } = await supabase.from('authors').select('*')
    if (error) {
      console.error('Error adding user:', error.message)
    } else {
      console.log('Authors:', data)
    }
  return (
    <div>{data?.map(author => ( author.name ))}</div>
  )
}

export default page