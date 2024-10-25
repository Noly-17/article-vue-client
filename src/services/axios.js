import axios from 'axios';
const base_url = process.env.VUE_APP_API_URL;

export const POST = async (url, data, config = {}) => {
  try {
    const response = await axios.post(`${base_url}${url}`, data, config);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
    throw error;
  }
};

export const GET = async (url, config = {}) => {
  try {
    const response = await axios.get(`${base_url}${url}`, config);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
    throw error;
  }
};

export const PUT = async (url, data, config = {}) => {
  try {
    const response = await axios.put(`${base_url}${url}`, data, config);
    return response.data;
  } catch (error) {
    console.error('PUT Error:', error);
    throw error;
  }
};

export const DELETE = async (url, config = {}) => {
  try {
    const response = await axios.delete(`${base_url}${url}`, config);
    return response.data;
  } catch (error) {
    console.error('DELETE Error:', error);
    throw error;
  }
};
