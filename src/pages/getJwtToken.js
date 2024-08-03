// 임시 토큰 얻기
import axios from 'axios';

let token = null;

const getJwtToken = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_TEST_URL}/api/v1/test/jwt-token`
    );
    token = response.data.data.accessToken;
    localStorage.setItem('token', token); // Store the token in local storage
    return token;
  } catch (error) {
    console.error('Error fetching JWT token:', error);
    return null;
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

export { getJwtToken, getToken };
