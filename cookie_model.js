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
    getName: function () {
        return this.attributes.name;
    },
    bake: function () {
        this.attributes.timeInOven++;
    },
    current_status: function () {
        if (this.attributes.timeInOven === 0) {
            return 'raw';
        } else if (this.attributes.timeInOven === this.attributes.bakingTime) {
            return 'just_right';
        } else if (this.attributes.timeInOven < this.attributes.bakingTime) {
            return 'still_gooey';
        } else if (this.attributes.timeInOven > this.attributes.bakingTime) {
            return 'crispy';
        }
    }
};


// Oven Model
var Oven = function (mBatches) {
    this.attributes = {
        maxBatches: mBatches || 3,
        batches: []
    };
};

Oven.prototype = {
    insert: function (batch) {
        this.attributes.batches.push(batch);
    },
    bake: function () {
        for (var i = 0; i < this.attributes.batches.length; i++) {
            this.attributes.batches[i].bake();
        }
    },
    check: function () {
        var cookies = []
        for (var i = 0; i < this.attributes.batches.length; i++) {
            cookies.push([i, this.attributes.batches[i].getName(), this.attributes.batches[i].current_status()]);
        }
        return cookies;
    }
};

var Tray = function () {
    this.attributes = {
        sheet: []
    };

};


// Tray Model
Tray.prototype = {
    prepare: function (cookieType, bakingTime) {
        var bakeryItem = new BakeryItem('cookie', cookieType, bakingTime);
        this.addToTray(bakeryItem);
    },
    addToTray: function (bakeryItem) {
        this.attributes.sheet.push(bakeryItem);
    },
    moveToOven: function (bakeryItemIndex, oven) {
        item = this.attributes.sheet[bakeryItemIndex];
        oven.insert(item);
        this.attributes.sheet.splice(bakeryItemIndex, 1);
    }
};

var oven;
var tray;


// View Model
$(document).ready(function () {
    oven = new Oven();
    tray = new Tray();

    $("#new_batch").on('submit', makeBatch);
    $("#prep_batches").on('click', 'button', moveToOven);
    $("#bake").on("click", bake);
});

var makeBatch = function (e) {
    e.preventDefault();
    var type = $(this).children("input").eq(0).val();
    var time = $(this).children("input").eq(1).val();
    tray.prepare(type, time);
    console.log(tray.attributes.sheet);
    addCookieToTable(type);
};

var addCookieToTable = function (type) {
    $("#prep_batches").append("<li>" + type + "<button id='add-to-oven'>Add to Oven</button></li>");
};

var moveToOven = function (e) {
    e.preventDefault();
    var index = $('li').index($(this).parent());
    tray.moveToOven(index, oven);
    removeFromTable($(this).parent());
    checkStatus(oven);
};

var removeFromTable = function (DOMObject) {
    DOMObject.remove();
};


var checkStatus = function (oven) {
    var cookies = oven.check();
    for (var i = 0; i < cookies.length; i++) {
        var index = cookies[i][0];
        var name = cookies[i][1];
        var status = cookies[i][2];
        displayCookies(index, name, status);
    };
};

var displayCookies = function (index, name, status) {
    var DOMElement = $("#rack_" + index);
    DOMElement.text(name + " : " + status);
    if (status === 'raw') {
        DOMElement.css('background-color', "red");
    } else if (status === 'still_gooey') {
        DOMElement.css('background-color', 'yellow');
    } else if (status === 'just_right') {
        DOMElement.css('background-color', 'green');
    } else if (status === 'crispy') {
        DOMElement.css('background-color', 'black');
    }
};

var bake = function () {
    oven.bake();
    checkStatus(oven);
};
