export interface IImage {
  id: number;
  album_id: number;
  user_id: { id: number; first_name: string; last_name: string };
  src: string;
  src_mini: string;
  title: string;
  created_at: string;
  updated_at: string;
  host: string;

  selected?: boolean;
}

/** 
 * 
 * 
 * album_id: 0
created_at: "2020-06-04 12:44:08"
host: "showu.zzz.com.ua"
id: 149
src: {src: "/uploads/image/f421080050a47ffc83920d8ab973443e_mam-ba-mamba-01.jpg",…}
src: "/uploads/image/f421080050a47ffc83920d8ab973443e_mam-ba-mamba-01.jpg"
src_mini: "/uploads/image/f421080050a47ffc83920d8ab973443e_minimize_mam-ba-mamba-01.jpg"
title: "mam-ba-mamba-01"
updated_at: null
user_id: {id: 1, first_name: "first", last_name: "last"}
*/
