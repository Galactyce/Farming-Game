function Slime(area, color, position) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_background);
  this.type = "slime";
  this.loadAnimation(
    sprites.enemies[color + "_slime"].front_passive,
    "passive_front",
    true,
    0.065
  );
  this.loadAnimation(
    sprites.enemies[color + "_slime"].back_passive,
    "passive_back",
    true,
    0.065
  );
  this.loadAnimation(
    sprites.enemies[color + "_slime"].right_passive,
    "passive_right",
    true,
    0.065
  );
  this.loadAnimation(
    sprites.enemies[color + "_slime"].left_passive,
    "passive_left",
    true,
    0.065
  );
  // this.loadAnimation(sprites.enemies[color + '_slime'].front_passive, 'passive_front', true, 0.065);
  // this.loadAnimation(sprites.enemies[color + '_slime'].back_passive, 'passive_back', true, 0.065);
  // this.loadAnimation(sprites.enemies[color + '_slime'].right_passive, 'passive_right', true, 0.065);
  // this.loadAnimation(sprites.enemies[color + '_slime'].left_passive, 'passive_left', true, 0.065);
  this.bounds = new powerupjs.Rectangle(0, 0, 1200, 700);
  this.position = position;
  this.color = color;
  console.log(position);
  this.idle = false;
  this.area = area;
  this.idleTime = Date.now();
  this.sight = 400;
  this.reloadTime = 2500;
  this.attackReloadDate = Date.now();
  this.idleDuration = 3000;
  this.switched = false;
  this.playAnimation("passive_front");
}

Slime.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Slime.prototype.update = function (delta) {
 
  

  if (Date.now() > this.idleTime + this.idleDuration && !this.switched) {
    if (this.boundingBox.intersects(this.bounds)) {
      this.idle = false;
      var randX = Math.random() * 50 - 25;
      var randY = Math.random() * 50 - 25;
      if (randY < 0 && Math.abs(randY) > Math.abs(randX)) {
        this.playAnimation("passive_back");
      } else if (randY > 0 && Math.abs(randY) > Math.abs(randX)) {
        this.playAnimation("passive_front");
      }
      if (randX < 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("passive_left");
      } else if (randX > 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("passive_right");
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
        this.playAnimation("passive_back");
      } else if (randY > 0 && Math.abs(randY) > Math.abs(randX)) {
        this.playAnimation("passive_front");
      }
      if (randX < 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("passive_right");
      } else if (randX > 0 && Math.abs(randX) > Math.abs(randY)) {
        this.playAnimation("passive_left");
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

 
  var player =
    powerupjs.Game.gameWorld.map.areas[
      powerupjs.Game.gameWorld.map.currentAreaIndex
    ].player;
  var distX = Math.abs(this.position.x - player.position.x);
  var distY = Math.abs(this.position.y - player.position.y);
  var distance = Math.sqrt(distX * distX + distY * distY);
  if (distance < this.sight) {
    var x = distX > 0 ? 1 : distX == 0 ? 0.1 : -1;

    var y = this.position.y - player.position.y;
    var yVelo = (y / (x * -100)) * 100
    if (yVelo > 250) yVelo = 250
    if (yVelo < -250) yVelo = -250
    if (this.position.x < player.position.x)
      this.velocity = new powerupjs.Vector2(100, yVelo);
    else this.velocity = new powerupjs.Vector2(-100, yVelo);
  }

  var extendedBoundingBox = new powerupjs.Rectangle(
    this.position.x - 20,
    this.position.y - 20,
    this.boundingBox.width + 40,
    this.boundingBox.height + 40
  );

  var boundaries = powerupjs.Game.gameWorld.map.areas[
    powerupjs.Game.gameWorld.map.currentAreaIndex
  ].find(ID.boundaries);

  

  for (var i=0; i<boundaries.gameObjects.length; i++) {
    if (boundaries.gameObjects[i] !== undefined && boundaries.gameObjects[i] !== null) {
      var boundary = boundaries.gameObjects[i]
      if (extendedBoundingBox.intersects(boundary.boundingBox)) {
        var depth = extendedBoundingBox.calculateIntersectionDepth(boundary.boundingBox);
        console.log(depth)
        if (Math.abs(depth.y) > Math.abs(depth.x)) {
          this.position.x += depth.x / 2;
        } else {
          this.position.y += depth.y / 2;
          }
        }
      }
    }


  if (
    this.boundingBox.intersects(player.boundingBox) &&
    Date.now() > this.attackReloadDate + this.reloadTime
  ) {
    powerupjs.Game.gameWorld.health--;
    this.attackReloadDate = Date.now();
  }

  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);

};
