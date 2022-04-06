
//TODO: convert to typscript once once http only cookie token is ready

/* eslint-disable import/no-anonymous-default-export */
export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ message: 'Invalid token!' });
  }

  // TODO: return res.json({ data: "Top secret data!" });
}
