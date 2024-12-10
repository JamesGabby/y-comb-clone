type Author = {
  id: number
  name: string
} 

export type StartupCardType = {
  id: number
  title: string
  createdat: string
  views: number
  description: string
  category: string
  image: string
  pitch: string
  authors: Author
}
