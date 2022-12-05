function Market(areaIndex, position, building_type, doorHitbox) {
  powerupjs.SpriteGameObject.call(
    this,
    sprites.buildings[building_type],
    1,
    0,
    ID.layer_background_1
  );
  this.type = "market";
  this.areaIndex = areaIndex;
  this.position = position;
  this.building_type = building_type;
  this.doorHitbox = doorHitbox

}

Market.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Market.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);

  // var inventory = powerupjs.Game.gameWorld.inventory
  // if (powerupjs.Game.gameWorld.selling) {
  //   inventory.visible = true;

  //   inventory.open = true
  // }

  var feild = this.parent;
  var player = feild.find(ID.player);
  var switchPoint = this.position.y + 170; // Where the player changes layer

  if (player !== null) {
    if (player.position.y > switchPoint) {
      this.layer = ID.layer_background;
    } else {
      this.layer = ID.layer_background_2;
    }
    feild.gameObjects.sort(function (a, b) {
      return a.layer - b.layer;
    });
  }

  if (player.boundingBox.intersects(this.doorHitbox) && powerupjs.Keyboard.pressed(32)) {
    this.selling = true;
  }
  if (powerupjs.Game.gameWorld.selling && powerupjs.Keyboard.pressed(27)) {
    powerupjs.Game.gameWorld.inventory.visible = false
    powerupjs.Game.gameWorld.selling = false
    powerupjs.Game.gameWorld.inventory.mode = 'items'
    powerupjs.Game.gameWorld.inventory.reward = 0;
    powerupjs.Game.gameWorld.inventory.sellingSelected = new Array();
  }
};
