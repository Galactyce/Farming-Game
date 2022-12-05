function Map() {
  powerupjs.GameObjectList.call(this, ID.layer_objects, ID.map);
  this.areas = new Array();
  this.startingArea = 15;
  for (var i = 0; i < mapLayout.length; i++) {
    var area = new Area(i);
    this.areas.push(area);
  }
  this.playerAnimation = undefined; // Save the current player animation
  this.playerPosition = new powerupjs.Vector2(0, 0); // Save the current player position
  this.mode = "playing";
  this.currentAreaIndex = 15;

  var barn = new Building(
    15,
    new powerupjs.Vector2(100, 100),
    "barn",
    new powerupjs.Rectangle(110, 300, 100, 20),
    new powerupjs.Vector2(700, 500),
   
  );

  var barn2 = new Building(
    14,
    new powerupjs.Vector2(100, 100),
    "barn2",
    new powerupjs.Rectangle(110, 300, 100, 20),
    new powerupjs.Vector2(700, 500),
   
  );

  var market = new Market(
    15,
    new powerupjs.Vector2(600, 100),
    "market",
    new powerupjs.Rectangle(610, 300, 100, 20)   
  );
  this.areas[15].find(ID.objects).add(barn);
  this.areas[14].find(ID.objects).add(barn2);
  this.areas[15].find(ID.objects).add(market);



}

Map.prototype = Object.create(powerupjs.GameObjectList.prototype);

Map.prototype.update = function (delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  this.areas[this.currentAreaIndex].update(delta);
};

Map.prototype.draw = function () {
  powerupjs.GameObjectList.prototype.update.call(this);
  this.areas[this.currentAreaIndex].draw();
};
