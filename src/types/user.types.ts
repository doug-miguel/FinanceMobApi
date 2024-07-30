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
};

export interface GetUserRequest {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  security_question: string;
  security_response: string;
};

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
};

export interface ResetRequest {
  Body: {
    security_question: string;
    security_response: string;
  };
};