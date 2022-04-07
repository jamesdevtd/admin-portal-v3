import axios from 'axios';

export interface userLoginInterface {
  username: string;
  password: string;
}

export const handleLogin = async ({
  username,
  password,
}: userLoginInterface) => {
  const credentials = { username, password };
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
