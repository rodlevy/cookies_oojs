// Pseudocode

// Cookie model
// knows about its state, kind, "done time"

// Prep table / tray
// has to be able to hold cookies
// has to be able to transfer cookies to oven

// Oven model
// has to be able to bake things (mess with the state of the cookies)
// identify state of cookies

// current_status --> e.g. raw
// baking_time --> 4 minutes
// time on oven --> 2 minutes

// Oven -> Cookie: Bake!
// Cookie.timeInOven ++ 1
// Oven --> Cookie : whats ur status?
// Cookie.current_status
 // if timeInOven = cookie.baking_time/4 --> xxx


// Bakery Item Model
var BakeryItem = function (type, name, time) {
    this.attributes = {
      type: type,
      name: name,
      bakingTime: time,
      timeInOven: 0
    };
};


BakeryItem.prototype = {
    // Left this in for later reference
    // getName: function() {
    //   return this.attributes.name;
    // },
    bake: function () {
        this.attributes.timeInOven++;
    },
    current_status: function () {
        if (this.attributes.timeInOven === 0) {
            return 'Raw';
        } else if (this.attributes.timeInOven < this.attributes.bakingTime) {
            return 'still_gooey';
        } else if (this.attributes.timeInOven === this.attributes.bakingTime) {
            return 'just_right';
        } else {
            return 'crispy';
        }
    }
};
