export interface IReviewUpdate {
  data: {
    id: number,
    product_id: number,
    user_id: string,
    author: string,
    text: string,
    rating: number,
    status: number,
    created_at: string,
    updated_at: string
  },
  host: string
}

// data:
// author: "nazar"
// created_at: "2020-09-15 18:11:44"
// id: 10
// product_id: 18
// rating: 2
// status: 1
// text: "very good!!!!!!!!!!!!"
// updated_at: "2020-10-13 12:57:23"
// user_id: 1
// __proto__: Object
// host: "api.showu.com.ua"