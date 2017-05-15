import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

let ns = new NotificationService();

// singleton pattern (only 1 instance in memory)
let instance = null;
var wishList = [];

class DataService {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  addWishListItem = item => {
    wishList.push(item);
    // (notifName, data)
    ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
  }

  // remove item from wish list if x clicked on wish list or remove button clicked
  // then go through list to find matching item
  removeWishListItem = item => {
    for (var x = 0; x < wishList.length; x++) {
      if (wishList[x]._id === item._id) {
        wishList.splice(x, 1);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
        break;
      }
    }
  }
}

export default DataService;
