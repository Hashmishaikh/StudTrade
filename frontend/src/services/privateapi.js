import api from './api';

// Returns an axios instance with the Authorization header set from localStorage
export function privateApi() {
  const token = localStorage.getItem('token');
  return api.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}
