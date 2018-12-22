let api_address;
const dev = true;

if (dev) {
  api_address = 'http://localhost:8000/api';
} else {
  api_address = 'https://goclutch.io/api';
}

export default api_address;
