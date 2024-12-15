import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';


const API_BASE_URL = 'https://larek-api.nomoreparties.co/api/weblarek';
const api = new LarekApi(API_BASE_URL);

console.log(api.getProducts()
    .then((catalog) => {
        console.log('direct api call');
        console.log(catalog);
    })
    .catch(() => {
        console.log('somthing wrong');
    }));


const app : AppState = new AppState(api);

app.loadProducts();