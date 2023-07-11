import { UnsplashAPI } from '../src/axios';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const galery = document.querySelector('.galery-list');
const load = document.querySelector('.load-more');
load.style.display = 'none';
const request = new UnsplashAPI();

async function handleFormSubmit(e) {
  e.preventDefault();
  const info = e.currentTarget.elements['searchQuery'].value.trim();
  request.query = info;
  request.page = 1;
  try {
    const date = await request.fetchPhotos();
    const { hits, total } = date;
    if (!hits.length) {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.!'
      );
      throw new Error();
    }
    createGallery(hits);
    load.style.display = 'block';
  } catch (err) {
    console.log(err);
  }
}
async function handleClick() {}
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
}
