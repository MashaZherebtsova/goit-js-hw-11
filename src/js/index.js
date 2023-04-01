import featchImages from '../js/fetchImages';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from '../js/news-service';

const form = document.querySelector('#search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.style.display = 'none';

const lightbox = new SimpleLightbox(".gallery a", {'captionsData': 'alt', 'captionDelay': 250});
const newsApiService = new NewsApiService;

let per_page = 40;
let page = 0;

loadMore.addEventListener('click', addOnePoingPage);
form.addEventListener('submit', onSeachInput);

async function onSeachInput(event) {
    event.preventDefault()
    if (!input.value.trim())
    { return;
    } 
       newsApiService.query = input.value.trim();
    loadMore.style.display = 'none';
    gallery.innerHTML = '';
    page = 1;
    
    try {
        const name =await featchImages(newsApiService.query, page, per_page); 
        let totalPages = name.totalHits / per_page;
        
        if (name.hits.length > 0) {
            createMarkup(name);
            lightbox.refresh();
            Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
            if (page < totalPages) {
                loadMore.style.display = 'block';
            } else {
                loadMore.style.display = 'none';
                Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
                );
            }
        } else {
                gallery.innerHTML = '';
                Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }  
    } catch (error) {
        console.log(error.message);
      }
}

function createMarkup(name) {
    const markup = name.hits.map(hit => { 
        return `
        <div class="photo-card">
            <a href='${hit.largeImageURL}'>
                <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>likes</b>${hit.likes.toLocaleString()}
                </p>
                <p class="info-item">
                    <b>views</b>${hit.views}
                </p>
                <p class="info-item">
                    <b>comments</b>${hit.comments}
                </p>
                <p class="info-item">
                    <b> dowloads </b>${hit.downloads}
                </p>
            </div>
        </div>`
    }).join('');
    gallery.insertAdjacentHTML('beforeend', markup)
};

async function addOnePoingPage() {
  page += 1;
  newsApiService.query = input.value.trim();
  try {
const name =await featchImages (newsApiService.query, page, per_page);
 
    let totalPages = name.totalHits / per_page;
      createMarkup(name);
      lightbox.refresh();
      if (page >= totalPages) {
          loadMore.style.display = 'none';
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
  } catch (error) {
    console.log(error.message);
  }
}
