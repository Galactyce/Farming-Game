function Player(area) {
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
  this.areaIndex = area
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
    var inventory = powerupjs.Game.gameWorld.inventory; // Pick up effects
    if (powerupjs.Keyboard.pressed(32)) {
      if (this.mode === "tending") return;
      if (
        object.type === "plant" &&
        object.velocity.y === 0 &&
        object.velocity.x === 0 &&
        this.boundingBox.intersects(object.boundingBox) && // Dropped fruit
        object.visible &&
        inventory.itemGrid.gameObjects.length < 27
      ) {
        for (var k = 0; k < inventory.itemGrid.gridLength; k++) {   // Loop through all the item slots
          var col = Math.floor(k / inventory.itemGrid.columns);
          var row = k % inventory.itemGrid.columns;
          if (inventory.itemGrid.at(row, col) === null) { // If its empty
            object.visible = false;
            inventory.itemGrid.addAt(
              new powerupjs.SpriteGameObject(
                sprites.items[object.sprite_type],
                1,
                0,
                ID.layer_overlays
              ),
              row,
              col
            );
            break;    // So it doesn't fill the whole inventory
          }
        }
      } else if (
        object.type === "seeds" &&
        this.boundingBox.intersects(object.boundingBox) && // Seeds packets
        object.visible &&
        inventory.itemGrid.gameObjects.length < 27
      ) {
        console.log(inventory.itemGrid.gameObjects.length);
        for (var k = 0; k < inventory.itemGrid.gridLength; k++) {
          var col = Math.floor(k / inventory.itemGrid.columns);
          var row = k % inventory.itemGrid.columns;

          if (inventory.itemGrid.at(row, col) === null) {
            object.visible = false;

            inventory.itemGrid.addAt(
              new powerupjs.SpriteGameObject(
                sprites.items[object.sprite_type],
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
      }
      else if (
        object.type === "crops" &&
        object.ready &&
        this.boundingBox.intersects(object.boundingBox) &&
        object.visible &&
        inventory.itemGrid.gameObjects.length < 27
      ) {
        object.visible = false;
        objects.remove(object);
        var tileIndex = new powerupjs.Vector2(
          object.position.x / 32,
          object.position.y / 32
        );
        tiles.at(tileIndex.x, tileIndex.y).containsCrops = "false"; // Free up the tile
        for (var k = 0; k < inventory.itemGrid.gridLength; k++) {
          var col = Math.floor(k / inventory.itemGrid.columns);
          var row = k % inventory.itemGrid.columns;
          if (inventory.itemGrid.at(row, col) === null) {
            inventory.itemGrid.addAt(
              new powerupjs.SpriteGameObject(
                sprites.items[object.sprite_type + "_plant"],
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
        powerupjs.Game.gameWorld.map.areas[
          powerupjs.Game.gameWorld.map.currentAreaIndex
        ].terrainEditor.save(); // Save the freed up tile
        powerupjs.Game.gameWorld.saveObjects(); // Save the crops

        break;
      }
      else if (
        object.type === "building" &&
        object.visible
      ) {
        if (this.boundingBox.intersects(object.doorHitbox)) {
          powerupjs.Game.gameWorld.currentInteriorArea = object.building_type
        }
        break;

      }
    }
  }

  var bounds = powerupjs.Game.gameWorld.map.areas[
    powerupjs.Game.gameWorld.map.currentAreaIndex
  ].find(ID.boundaries);
  for (var i = 0; i < bounds.gameObjects.length; i++) {
    // Boundary effects
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

  var interior_bounds = powerupjs.Game.gameWorld.interiors[0].find(ID.interior_boundaries)
  for (var i = 0; i < interior_bounds.gameObjects.length; i++) {
    // Boundary effects
    if (interior_bounds.gameObjects[i] === undefined) continue;
    var boundary = interior_bounds.gameObjects[i];

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
    // Up an area
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
    // Down an area
    map.currentAreaIndex += 6;
    this.position.y = 20;
    map.areas[map.currentAreaIndex].player.position = map.playerPosition;
    map.areas[map.currentAreaIndex].player.lastDirection = map.playerAnimation;
  }
  if (this.position.x > 1440) {
    // Right of an area
    map.currentAreaIndex += 1;
    this.position.x = 60;
    map.areas[map.currentAreaIndex].player.position = map.playerPosition;
    map.areas[map.currentAreaIndex].player.lastDirection = map.playerAnimation;
  }
  if (this.position.x < 0) {
    // Left of an area
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
