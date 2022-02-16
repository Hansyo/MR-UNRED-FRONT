const BASE_URL = 'http://localhost/api';

export const requestPost = async (path, body) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(JSON.stringify(json));
  }
  return res.json();
};

export const requestGet = async (path) => {
  const res = await fetch(`${BASE_URL}${path}`, {
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(JSON.stringify(json));
  }
  return res.json();
};

export const requestDelete = async (path) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};