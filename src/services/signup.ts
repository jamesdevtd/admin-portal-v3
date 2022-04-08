export interface userSignupInterface {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  referralCode: string;
}

export const handleSignUp = async (data: userSignupInterface) => {
  // const credentials = { username, firstName, lastName, password, referralCode};
  console.log('init handleSignUp:');
  console.log(data);
  // const reponse = await axios.post('/api/auth/login', credentials);
  // if (reponse.data.message === 'Success!') {
  //   return true;
  // } else {
  //   return false;
  // }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  fetch('/affiliate/signup', requestOptions)
    .then(async (response) => {
      const isJson = response.headers
        .get('content-type')
        ?.includes('application/json');
      const data = isJson && (await response.json());

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      return data;
    })
    .catch((error) => {
      return `Error: ${error}`;
    });
};
