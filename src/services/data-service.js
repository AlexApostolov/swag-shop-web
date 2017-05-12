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
  }

  removeWishListItem = item => {
    for (var x = 0; x < wishList.length; x++) {
      
    }
  }
}

export default DataService;
