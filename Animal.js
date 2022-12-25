function Animal(type, area, bounds, produce) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_background_2);
  this.loadAnimation(sprites.animals[type].front, "front", true, 0.14);
  this.loadAnimation(sprites.animals[type].back, "back", true, 0.14);
  this.loadAnimation(sprites.animals[type].right, "right", true, 0.14);
  this.loadAnimation(sprites.animals[type].left, "left", true, 0.14);
  this.playAnimation("front");
  this.machineType = 'animal'
  this.bounds = bounds; // Where the animal has to stay
  this.position.x = Math.random() * this.bounds.width + this.bounds.x;
  this.position.y = Math.random() * this.bounds.height + this.bounds.y;
  this.startTime = Date.now();
  this.randTime = 0;
  this.area = area;
  this.idleTime = Date.now();
  this.productionDate = Date.now();
  this.produce = produce;
  this.productionTime = 9000;
  this.producing = true;
  this.produceReady = false;
  this.idleDuration = 0;
}

Animal.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Animal.prototype.draw = function () {
  powerupjs.AnimatedGameObject.prototype.draw.call(this);
  if (Date.now() > this.productionDate + this.productionTime) {
    this.produceReady = true;
    var marker = new powerupjs.SpriteGameObject(
      sprites.markers[this.produce],
      1,
      0,
      ID.layer_overlays
    );
    marker.position = this.position.copy();
    marker.position.y = this.position.y - 75;
    marker.draw();
  }
};

Animal.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  
  

  var feild = this.parent;
  var player = feild.find(ID.player);
   var switchPoint = this.position.y + 40; // Where the player changes layer
for (var i=0; i<feild.gameObjects.length; i++) {
  if (feild.gameObjects[i].animated !== null) {
    if (feild.gameObjects[i].position.y > switchPoint) {
      this.layer = ID.layer_background;
    } else {
      this.layer = ID.layer_background_2;
    }
    feild.gameObjects.sort(function (a, b) {
      return a.layer - b.layer;
    });
  }
  }

  if (this.idle) this.sheetIndex = 0;

  if (Date.now() > this.idleTime + this.idleDuration && !this.switched) {
    if (this.boundingBox.intersects(this.bounds)) {
      this.idle = false;
      var randX = Math.random() * 50 - 25;
      var randY = Math.random() * 50 - 25;
      if (randY < 0 && Math.abs(randY) > Math.abs(randX)) {
        this.playAnimation("back");
      } else if (randY > 0 && Math.abs(randY) > Math.abs(randX)) {
        this.playAnimation("front");
      }
      if (randX < 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("right");
      } else if (randX > 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("left");
      }
      this.velocity = new powerupjs.Vector2(randX, randY);
      this.randTime = Math.random() * 2000 + 2000;
      this.startTime = Date.now();
      this.switched = true;
    } else {
      if (this.position.x <= this.bounds.x) {
        var randX = Math.random() * 25;
      } else {
        var randX = Math.random() * -25;
      }
      if (this.position.y <= this.bounds.y) {
        var randY = Math.random() * 25;
      } else {
        var randY = Math.random() * -25;
      }

      if (randY < 0 && Math.abs(randY) > Math.abs(randX)) {
        this.playAnimation("back");
      } else if (randY > 0 && Math.abs(randY) > Math.abs(randX)) {
        this.playAnimation("front");
      }
      if (randX < 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("right");
      } else if (randX > 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("left");
      }

      this.idle = false;

      this.velocity = new powerupjs.Vector2(randX, randY);
      this.randTime = Math.random() * 2000 + 2000;
      this.startTime = Date.now();
      this.switched = true;
    }
  }
  if (Date.now() > this.startTime + this.randTime && this.switched) {
    this.switched = false;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.idle = true;
    this.idleTime = Date.now();
    this.idleDuration = Math.random() * 2000 + 1000;
  }

  var interiors = powerupjs.Game.gameWorld.interiors[this.area];
  var player = powerupjs.Game.gameWorld.interiors[this.area].player;
  var inventory = powerupjs.Game.gameWorld.inventory.itemGrid;
  if (
    player.boundingBox.intersects(this.boundingBox) &&
    powerupjs.Keyboard.pressed(32) &&
    this.produceReady === true
  ) {
    
  for (var i = 0; i < interiors.machines.gameObjects.length - 1; i++) {
    if (interiors.machines.at(i).type === "food") {
    if (interiors.machines.at(i).remaining > 0) {
    interiors.machines.at(i).remaining--
    this.producing = true
    break
  }
  else this.producing = false
    }
  }
  for (var k = 0; k < inventory.gridLength; k++) {
    var col = Math.floor(k / inventory.columns);
    var row = k % inventory.columns;

    if (inventory.at(row, col) === null || inventory.at(row, col) === undefined) {

      inventory.addAt(
        new powerupjs.SpriteGameObject(
          sprites.items[this.produce],
          1,
          0,
          ID.layer_overlays
        ),
        row,
        col
      );
      break;
    }
  }
  powerupjs.Game.gameWorld.inventory.save()

    this.productionDate = Date.now();
    this.produceReady = false;
    this.producing = false
  }

  for (var i = 0; i < interiors.machines.gameObjects.length; i++) {
    if (interiors.machines.at(i).type === "food") {
      if (interiors.machines.at(i).remaining <= 0 && !this.producing) {
        this.productionDate = Date.now();
      } else if (
        this.produceReady === false &&
        interiors.machines.at(i).remaining > 0
      ) {
        this.producing = true
      }
    }
  }
};
