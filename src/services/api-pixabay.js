const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 12;
const SEARCH_PARAMS = new URLSearchParams({
  key: '29138945-719dfadf34447ae392f9f2b7e',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: `${PER_PAGE}`,
});

export function fetchImages(query, page) {
  SEARCH_PARAMS.append('q', query);
  SEARCH_PARAMS.append('page', page);

  return fetch(`${BASE_URL}?${SEARCH_PARAMS}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    console.log('error');
    return Promise.reject(
      new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
  });
}
