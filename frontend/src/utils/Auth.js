export const BASE_URL = 
'https://api.foxalice.nomoredomains.rocks';
//  'http://localhost:3000';

export const onResponse = (res) => {
  return res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err));
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(onResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(onResponse)
    .then((res) => {
      localStorage.setItem('jwt', res.token)
      return res;
    })
    };

export const checkToken = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
    .then(onResponse);
}