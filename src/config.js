export const BASE_URL = 'https://memory-backend-production-1b1e.up.railway.app';

const res = await fetch(`${BASE_URL}/api/auth`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});
