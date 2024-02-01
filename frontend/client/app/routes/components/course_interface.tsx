export interface Course {
  course_Id: number;
  course_Name: string;
  department_Name: string;
  course_Description: string;
}

export interface Registration {
  user_course_Id: number;
  user_Id: number;
  course_Id: number;
  course_Name: string;
}
