import { POST } from '@/services/rest.service';
export interface userSignupInterface {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  referralCode: string;
}

export const handleSignUp = async (data: userSignupInterface) => {
  return await POST('/register', data);
};
