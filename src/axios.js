import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://pixabay.com/api';

  page = 1;
  query = null;
  per_page = 40;
  async fetchPhotos() {
    return await axios.get(`${this.#BASE_URL}/`, {
      params: {
        q: this.query,
        key: '38174659-9b0c55b9f6b140ee944fe291a',
        page: this.page,
        per_page: this.per_page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
  }
}
