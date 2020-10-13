export interface IComment {
  id: number,
  user_id: number,
  parent_id: number,
  author: string,
  text: string,
  status: number,
  like_count: number,
  dislike_count: number,
  created_at: string,
  updated_at: string
}
