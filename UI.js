function HealthBar() {
  powerupjs.SpriteGameObject.call(this, sprites.UI['health_bar'], 1, 0, ID.layer_overlays);
  this.markers = new powerupjs.SpriteGameObject(sprites.UI['health_markers'], 1, 0, ID.layer_overlays_1);
  this.markers.position = new powerupjs.Vector2(100, 600)
  this.position = new powerupjs.Vector2(100, 600);
}

HealthBar.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

HealthBar.prototype.draw = function() {
  powerupjs.SpriteGameObject.prototype.draw.call(this);
  this.markers.draw()
}

HealthBar.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  this.markers.sheetIndex = Math.abs(8 - powerupjs.Game.gameWorld.health)
  this.markers.update(delta)
}

function ToolMarker() {
  powerupjs.SpriteGameObject.call(this, sprites.UI['equip_markers'], 1, 0, ID.layer_overlays);
  this.position = new powerupjs.Vector2(1300, 20);
  this.sheetIndex = 0;
}

ToolMarker.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

ToolMarker.prototype.draw = function() {
  powerupjs.SpriteGameObject.prototype.draw.call(this);
}

ToolMarker.prototype.update = function(delta) {
  console.log(this.sheetIndex)
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  var player = powerupjs.Game.gameWorld.map.areas[powerupjs.Game.gameWorld.map.currentAreaIndex].player;
  if (this.sheetIndex === 0) {
    powerupjs.Game.gameWorld.currentTool = 'sword'
  }
  if (this.sheetIndex === 1) {
    powerupjs.Game.gameWorld.currentTool = 'none'
  }
}