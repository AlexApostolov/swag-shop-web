import React, {Component} from 'react';
import './product.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

class Product extends Component {
  constructor(props) {
    super(props);

    // Check if item on wishlist with boolean
    this.state = {onWishList: ds.itemOnWishList()}

    // Bind functions
    this.onButtonClicked = this.onButtonClicked.bind(this);
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

  onWishListChanged(newWishList) {
    this.setState({onWishList: ds.itemOnWishList(this.props.product)});
  }

  onButtonClicked = () => {
    if (this.state.onWishList) {
      ds.removeWishListItem(this.props.product);
    } else {
      ds.addWishListItem(this.props.product);
    }
  }

  render() {

    var btnClass;
    if (this.state.onWishList) {
      btnClass = "btn btn-danger";
    } else {
      btnClass = "btn btn-primary";
    }

    return (
      <div className="card product">
        <img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: ${this.props.product.price}</p>
          <a href="#" onClick={() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove From Wishlist" : "Add to Wishlist"}</a>
        </div>
      </div>
    )
  }
}

export default Product;
