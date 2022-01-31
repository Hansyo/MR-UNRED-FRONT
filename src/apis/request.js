const BASE_URL = 'http://localhost/api';

export const requestPost = async (path, body) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const requestGet = async (path) => {
  const res = await fetch(`${BASE_URL}${path}`);
  return res.json();
};