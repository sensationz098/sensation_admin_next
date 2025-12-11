export interface StudentType {
  id?: string;
  name?: string;
  email?: string;
  phone_no?: string;
  gender?: "MALE" | "FEMALE";
  state?: string;
  image_url?: string;
  enrolled_courses?: string[];
  join_date?: string;
}