// "services" folder is for integrating with the swag-shop-api
import 'whatwg-fetch';

class HttpService {
  // fetch a list of products from the API
  getProducts = () => {
    var promise = new Promise((resolve, reject) => {
      // use whatwg-fetch polyfill
      fetch('http://localhost:3004/product')
      .then(res => {
        resolve(res.json());
      });
    });
    // hold on to a promise until request is done
    return promise;
  }
}

export default HttpService;
