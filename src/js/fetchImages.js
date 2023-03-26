import axios from 'axios';



export async function fetchImages(value, page) {
    const url = 'https://pixabay.com/api/';
    const key = '34748858-d31d3a783fed40cd5b22b2555';
    const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  
    return await axios.get(`${url}${filter}`).then(response => response.data);
  }

  


