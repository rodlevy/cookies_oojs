// Cookie model
// knows about its state, kind, "done time"

// Prep table / tray
// has to be able to hold cookies
// has to be able to transfer cookies to oven

// Oven model
// has to be able to bake things (mess with the state of the cookies)
// identify state of cookies


var Cookie = function(name, baking_time){
  this.name = name;
  var baking_time = baking_time;
  var timeInOven = 0;
};

Cookie.prototype = {
         bake : function(){
          this.timeInOven ++1;
         },
         current_status : function()
}

Cookie.prototype.current_status = function(){
    if (timeInOven === 0) {
      return 'Raw'
    } else if (this.timeInOven < baking_time){
      return 'still_gooey'
    } else if (this.timeInOven === baking_time){
      return 'just_right'
    } else {
      return 'crispy'
    };

}


// current_status --> e.g. raw
// baking_time --> 4 minutes
// time on oven --> 2 minutes

// Oven -> Cookie: Bake!
// Cookie.timeInOven ++ 1
// Oven --> Cookie : whats ur status?
// Cookie.current_status
 // if timeInOven = cookie.baking_time/4 --> xxx
