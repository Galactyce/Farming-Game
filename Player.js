function Player() {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_background_1, ID.player);
  this.lastDirection = "front";
  this.loadAnimation(sprites.main_character["idle"].front, "idle_front", true);
  this.loadAnimation(sprites.main_character["idle"].back, "idle_back", true);
  this.loadAnimation(sprites.main_character["idle"].right, "idle_right", true);
  this.loadAnimation(sprites.main_character["idle"].left, "idle_left", true);
  this.mode = "walking";
  this.loadAnimation(
    sprites.main_character["run"].front,
    "run_front",
    true,
    0.08
  );
  this.loadAnimation(
    sprites.main_character["run"].back,
    "run_back",
    true,
    0.08
  );
  this.loadAnimation(
    sprites.main_character["run"].right,
    "run_right",
    true,
    0.08
  );
  this.loadAnimation(
    sprites.main_character["run"].left,
    "run_left",
    true,
    0.08
  );
  this.loadAnimation(
    sprites.main_character["tend"].front,
    "tend_front",
    false,
    0.09
  );
  this.position = new powerupjs.Vector2(200, 300);
}

Player.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Player.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  if (
    powerupjs.Game.gameWorld.map.mode !== "playing" ||
    powerupjs.Game.gameWorld.inventory.open
  )
    return;
  if (powerupjs.Keyboard.down(38)) {
    if (this.velocity.x === 0) this.playAnimation("run_back");
    this.lastDirection = "back";
    this.velocity.y = -250;
    this.mode = "walking";
  } else if (powerupjs.Keyboard.down(40)) {
    if (this.velocity.x === 0) this.playAnimation("run_front");
    this.lastDirection = "front";
    this.velocity.y = 250;
    this.mode = "walking";
  } else {
    this.velocity.y = 0;
  }
  if (powerupjs.Keyboard.down(37)) {
    this.playAnimation("run_left");
    this.lastDirection = "left";
    this.velocity.x = -250;
    this.mode = "walking";
  } else if (powerupjs.Keyboard.down(39)) {
    this.playAnimation("run_right");
    this.lastDirection = "right";
    this.velocity.x = 250;
    this.mode = "walking";
  } else {
    this.velocity.x = 0;
  }
  if (
    this.velocity.x === 0 &&
    this.velocity.y === 0 &&
    this.mode === "walking"
  ) {
    this.playAnimation("idle_" + this.lastDirection);
  }

  var objects = powerupjs.Game.gameWorld.map.areas[
    powerupjs.Game.gameWorld.map.currentAreaIndex
  ].find(ID.objects);
  var tiles = powerupjs.Game.gameWorld.map.areas[
    powerupjs.Game.gameWorld.map.currentAreaIndex
  ].find(ID.tiles);

  for (var i = 0; i < objects.listLength; i++) {
    var object = objects.at(i);
    var inventory = powerupjs.Game.gameWorld.inventory;
    if (powerupjs.Keyboard.pressed(32)) {
      if (
        object.type === "plant" &&
        object.velocity.y === 0 &&
        object.velocity.x === 0 &&
        this.boundingBox.intersects(object.boundingBox) &&
        object.visible &&
        inventory.itemGrid.gameObjects.length < 27
      ) {
        object.visible = false;
        inventory.itemGrid.add(
          new powerupjs.SpriteGameObject(
            sprites.items[object.sprite_type],
            1,
            0,
            ID.layer_overlays
          )
        );
        break;
      } else if (
        object.type === "seeds" &&
        this.boundingBox.intersects(object.boundingBox) &&
        object.visible &&
        inventory.itemGrid.gameObjects.length < 27
      ) {
        object.visible = false;
        inventory.itemGrid.add(
          new powerupjs.SpriteGameObject(
            sprites.items[object.sprite_type],
            1,
            0,
            ID.layer_overlays
          )
        );
        break;
      }
      if (
        object.type === "crops" &&
        object.ready &&
        this.boundingBox.intersects(object.boundingBox) &&
        object.visible &&
        inventory.itemGrid.gameObjects.length < 27
      ) {
        alert()
        object.visible = false;
        console.log(object.sprite_type + "_plant")
        var tileIndex = new powerupjs.Vector2(object.position.x / 32, object.position.y / 32);
        tiles.at(tileIndex.x, tileIndex.y).containsCrops = 'false'
        inventory.itemGrid.add(
          new powerupjs.SpriteGameObject(
            sprites.items[object.sprite_type + "_plant"],
            1,
            0,
            ID.layer_overlays
          )
        );

        break;
      }
    }
  }

  var bounds = powerupjs.Game.gameWorld.map.areas[
    powerupjs.Game.gameWorld.map.currentAreaIndex
  ].find(ID.boundaries);
  for (var i = 0; i < bounds.gameObjects.length; i++) {
    if (bounds.gameObjects[i] === undefined) continue;
    var boundary = bounds.gameObjects[i];
    var boundingBox = new powerupjs.Rectangle(
      this.boundingBox.x,
      this.boundingBox.y,
      this.boundingBox.width,
      this.boundingBox.height
    );
    boundingBox.y = this.boundingBox.y + 20;
    boundingBox.height = this.boundingBox.height - 20;
    if (boundingBox.intersects(boundary.boundingBox)) {
      var depth = boundingBox.calculateIntersectionDepth(boundary.boundingBox);
      if (Math.abs(depth.y) > Math.abs(depth.x)) {
        this.position.x += depth.x;
      } else {
        this.position.y += depth.y;
      }
    }
  }

  var map = powerupjs.Game.gameWorld.map;
  if (this.position.y < 0) {
    if (map.currentAreaIndex > 6) {
      map.currentAreaIndex -= 6;
      this.position.y = 700;
      map.areas[map.currentAreaIndex].player.position = map.playerPosition;
      map.areas[map.currentAreaIndex].player.lastDirection =
        map.playerAnimation;
    
    } else {
      this.position.y = 10;
    }
  }
  if (this.position.y > 730) {
    map.currentAreaIndex += 6;
    this.position.y = 20;
    map.areas[map.currentAreaIndex].player.position = map.playerPosition;
    map.areas[map.currentAreaIndex].player.lastDirection = map.playerAnimation;
   
  }
  if (this.position.x > 1440) {
    map.currentAreaIndex += 1;
    this.position.x = 60;
    map.areas[map.currentAreaIndex].player.position = map.playerPosition;
    map.areas[map.currentAreaIndex].player.lastDirection = map.playerAnimation;

  }
  if (this.position.x < 0) {
    if (map.currentAreaIndex > 0) {
      map.currentAreaIndex -= 1;
      this.position.x = 1400;
      map.areas[map.currentAreaIndex].player.position = map.playerPosition;
      map.areas[map.currentAreaIndex].player.lastDirection =
        map.playerAnimation;

    } else {
      this.position.x = 10;
    }
  }

  if (this.animationEnded()) {
    this.playAnimation("idle_" + this.lastDirection);
  }

  powerupjs.Game.gameWorld.map.playerAnimation = this.lastDirection;
  powerupjs.Game.gameWorld.map.playerPosition = this.position.copy();
};
