import axios from 'utils/axios';

// ⬇️ this is the loader for the detail route
export async function loader() {
  debugger;
  try {
    const response = await axios.get('/data/');
    return response.data.products;
  } catch (error) {
    return error;
  }
}

export async function filterProducts(filter) {
  debugger;
  return await axios.post('/data/filter/', { filter });
}

export async function productLoader({ params }) {
  try {
    debugger;
    const response = await axios.post('/data/details', { id: params.id });
    debugger;
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getRelatedProducts(id) {
  debugger;
  return await axios.post('/api/product/related', { id });
}

export async function getProductReviews() {
  debugger;
  return await axios.get('/api/review/list');
}

export async function getImage(id) {
  debugger;
  //  http://localhost:8000/api/file/430/download/
  try {
    return await axios.get('/api/file/' + { id } + '/download/');
  } catch (error) {
    return null;
  }
}
