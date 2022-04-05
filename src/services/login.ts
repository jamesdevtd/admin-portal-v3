import axios from 'axios';

export interface userLoginInterface {
  email: string;
  password: string;
}

export const handleLogin = async ({ email, password }: userLoginInterface) => {
  const credentials = { email, password };
  const reponse = await axios.post('/api/auth/login', credentials);
  if (reponse.data.message === 'Success!') {
    return true;
  } else {
    return false;
  }
};

export const handleGetUser = async () => {
  const user = await axios.get('/api/user');
  // eslint-disable-next-line
  console.log(user);
};

export const handleLogOut = async () => {
  const user = await axios.get('/api/auth/logout');
  // eslint-disable-next-line
  console.log(user);
};
