type BaseApiResponseType = {
  status: boolean;
  message: string;
  error?: string | unknown;
};

export type GetAllUserResponseType = BaseApiResponseType & {
  data: {
    count: number;
    users: {
      createdAt: string;
      email: string;
      id: string;
      name: string;
      password: string;
      role: "ADMIN" | "TEACHER";
      status: true;
    }[];
  };
};

export type CreateUserApiResponseType = BaseApiResponseType;

export type GetAllTeacherResponseType = BaseApiResponseType & {
  data: {
    count: number;
    teachers: {
      status: boolean;
      id: string;
      createdAt: Date;
      gender: "MALE" | "FEMALE";
      full_name: string;
    }[];
  };
};

export type GetTeacherDetailsByIdType = BaseApiResponseType & {
  data: {
    id: string;
    name: string;
    gender: "FEMALE" | "MALE";
    country: string;
    image_url: string;
    biography: string;
    language: string;
    createdAt: string;
    course: {
      id: string;
      title: string;
    }[];
  };
};

export type GetDashboardApiReponseType = BaseApiResponseType & {
  data: {
    totalStudents: number;
    last3DaysStudents: number;
    totalTeachers: number;
    totalActiveCourses: number;
    totalTransaction: number;
    totalAmount: number;
    totalTax: number;
    totalGrandTotal: number;
  };
};

export type GetAllCourseResponseType = BaseApiResponseType & {
  data: {
    count: number;
    courses: {
      id: string;
      title: string;
      image_url: string;
      teacher_name: string;
      price: number;
      discounted_price: number;
      duration: string;
    }[];
  };
};

export type CreateCourseApiResponseType = BaseApiResponseType & {
  data: {
    course_id: string;
  };
};
