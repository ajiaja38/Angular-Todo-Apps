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

export type PayloadTodoDto = {
  title: string;
  content: string;
  image: string;
};

export interface TodoDto {
  author: string;
  content: string;
  id: string;
  image: string;
  status: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatusTodoDto {
  status: boolean;
}

export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
