import axios from 'axios';

export async function fetchImages(searchQuery) {
  const BASE_URL = 'https://pixabay.com/api/'
  const API_KEY = '34748858-d31d3a783fed40cd5b22b2555'
  const searchParams = new URLSearchParams ({
    q: searchQuery,
    image_type: 'photo',
    orietation: 'horizontal',
    safesearch: true,
  })
  
try {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${searchParams}`);
  return response.data;
  
} catch (error) {
  console.error(error);
}
};


