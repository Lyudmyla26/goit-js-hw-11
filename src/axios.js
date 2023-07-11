import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://pixabay.com/api';

  page = 1;
  query = null;

  async fetchPhotos() {
    return await axios.get(`${this.#BASE_URL}/`, {
      params: {
        q: this.query,
        key: '38174659-9b0c55b9f6b140ee944fe291a',
        page: this.page,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
  }
}
