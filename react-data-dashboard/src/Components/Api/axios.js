import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8000/api/'
});
// Path: react-data-dashboard/src/Components/Api/axios.js