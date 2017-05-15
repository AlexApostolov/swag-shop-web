import React, {Component} from 'react';
import './wishlist.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

import ProductCondensed from '../product-condensed/product-condensed';

let ns = new NotificationService();

class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = {wishList: []};

    // Bind functions
    this.createWishList = this.createWishList.bind(this);
    this.onWishListChanged = this.onWishListChanged.bind(this);
  }

  componentDidMount() {
    // Add the observer name, then the object itself that is observing--this component,
    // finally the callback when it's time to be notified
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
  }

  // Avoid memory leak
  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  // Reset items in the wish list
  onWishListChanged(newWishList) {
    this.setState({wishList: newWishList});
  }

  createWishList = () => {
    const list = this.state.wishList.map((product) =>
      <ProductCondensed product={product} key={product._id} />
    );

    return (list);
  }

  render() {
    return (
      <div className="card">
        <div>
          <h4 className="card-title">Wish List</h4>
          <ul className="list-group">
            {this.createWishList()}
          </ul>
        </div>
      </div>
    )
  }
}

export default WishList;
