import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';

// Services
import HttpService from '../services/http-service';

const http = new HttpService();

class App extends Component {
  constructor(props) {
    super(props);

    // Init default state
    this.state = {products: []}

    // Bind functions
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);

    this.loadData();
  }

  loadData = () => {
    // Because it's inside of a Promise (async),
    // "this" breaks and points to the Promise instead
    // create a reference to the "this" before the Promise is loaded
    let self = this;

    // To make the child components refresh use setState on the parent component
    http.getProducts().then(data => {
      self.setState({products: data})
    }, err => {

    });
  }

  productList = () => {
    const list = this.state.products.map((product) =>
      <div className="col-sm-4" key={product._id}>
        <Product title={product.title} price={product.price} imgUrl={product.imgUrl} />
      </div>
    );
    return (list);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to The Swag Shop</h2>
        </div>
        <div className="container-fluid App-main">
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
                {this.productList()}
              </div>
            </div>
            <div className="col-sm-4">
              <WishList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
