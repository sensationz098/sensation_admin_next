export type TeacherType = {
  id: string;
  name: string;
  email: string;
  phone_no: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  state: string;

  // Teaching related
  subject: string;              // e.g. "Maths", "Kathak", "Web Dev"
  experience_years: number;     // total years of experience
  qualification?: string;       // optional (B.Tech, M.Tech, MA Dance etc.)
  specialization?: string;      // optional (Advanced Kathak, Backend Dev etc.)

  // UI/Avatar
  image_url: string;

  // Metadata
  join_date: string;            // "2024-02-01"
  createdAt?: string | Date;    // if using database
  updatedAt?: string | Date;    // optional
};
