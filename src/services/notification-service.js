export const NOTIF_WISHLIST_CHANGED = 'notif_wishlist_changed';

// Observer pattern will register to be notified by the system
// An array would  be very inefficient because looping would be required
var observers = {};
let instance = null;

// Singleton pattern
class NotificationService {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  postNotification = (notifName, data) => {
    let obs = observers[notifName];
    for (var x = 0; x < obs.length; x++) {
      var obj = obs[x];
      obj.callBack(data);
    }
  }

  removeObserver = (observer, notifName) => {
    var obs = observers[notifName];

    // Go through the notification you care about, i.e. notifName
    if (obs) {
      for (var x = 0; x < obs.length; x++) {
        // if the same, then remove it from memory and reset the array
        if (observer === obs[x].observer) {
          obs.splice(x, 1);
          observers[notifName] = obs;
          break;
        }
      }
    }
  }

  // add an observer to listen with
  // 1) type of notification 2) component that wants to listen--register spot in memory 3) then what to call
  addObserver = (notifName, observer, callBack) => {
    // access the object by unique key
    let obs = observers[notifName];

    if (!obs) {
      observers[notifName] = [];
    }

    let obj = {observer: observer, callBack: callBack};
    observers[notifName].push(obj);
  }
}

export default NotificationService;
