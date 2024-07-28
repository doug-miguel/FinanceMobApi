export interface CreateUserRequest {
  Body: {
    full_name: string;
    username: string;
    email: string;
    phone: string;
    birthday: string;
    password: string;
    security_question: string;
    security_response: string;
  };
}

export interface GetUserRequest {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  security_question: string;
  security_response: string;
}

export interface DecodeTokenProps {
  id: number
  name: string
  email: string
  username: string
  iat: number
  exp: number
}

export interface UpdateUserRequest {
  Body: {
    full_name?: string;
    username?: string;
    email?: string;
    phone?: string;
    birthday?: string;
    password?: string;
    security_question?: string;
    security_response?: string;
  };
}

export interface ResetRequest {
  Body: {
    security_question: string;
    security_response: string;
  };
}

export interface Params {
  id: string;
}