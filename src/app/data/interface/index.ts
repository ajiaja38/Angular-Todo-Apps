export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface TodoDto {
  author: string;
  content: string;
  id: string;
  image: string;
  status: boolean;
  title: string;
}
