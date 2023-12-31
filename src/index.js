import { UnsplashAPI } from '../src/axios';
import Notiflix from 'notiflix';
import { lightbox } from '../src/simplelightbox';
const form = document.querySelector('.search-form');
const galery = document.querySelector('.galery-list');
const load = document.querySelector('.load-more');
const alertPopup = document.querySelector('.alert');
load.style.display = 'none';
const request = new UnsplashAPI();
let isAlertVisible = false;
async function handleFormSubmit(e) {
  e.preventDefault();
  const info = e.currentTarget.elements['searchQuery'].value.trim();
  request.query = info;
  request.page = 1;
  galery.innerHTML = '';
  request.per_page = 40;
  try {
    const dates = await request.fetchPhotos();
    const { data } = dates;

    if (!data.hits.length) {
      load.style.display = 'none';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.!'
      );
      throw new Error();
    }
    if (info === '') {
      Notiflix.Notify.info('Ведіть дані пошуку');
    }

    createGallery(data.hits);
    load.style.display = 'block';
  } catch (err) {
    console.log(err);
  }
}
const handleClick = async () => {
  request.page += 1;

  try {
    const { data } = await request.fetchPhotos();
    const totalPages = data.totalHits / 40;
    console.log(totalPages);
    if (request.page > totalPages) {
      load.style.display = 'none';
      return toggleAlertPopup();
    }
    // if (totalImages === data.totalHits) {
    //   load.style.display = 'none';
    //   Notiflix.Notify.info(
    //     ' Were sorry, but youve reached the end of search results'
    //   );
    // }
    createGallery(data.hits);
  } catch (err) {
    console.log(err.message);
  }
};
function toggleAlertPopup() {
  if (isAlertVisible) {
    return;
  }
  isAlertVisible = true;
  alertPopup.classList.add('is-visible');
  setTimeout(() => {
    alertPopup.classList.remove('is-visible');
    isAlertVisible = false;
  }, 3000);
}
form.addEventListener('submit', handleFormSubmit);
load.addEventListener('click', handleClick);
function createGallery(arry) {
  const markup = arry
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
      }
    )
    .join('');
  galery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
