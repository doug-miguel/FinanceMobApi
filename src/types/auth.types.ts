export interface DecodeTokenProps {
  id: number
  name: string
  email: string
  username: string
  iat: number
  exp: number
};

export interface ResetRequest {
  Body: {
    email: string;
    security_question: string;
    security_response: string;
  };
};