function Tile(sprite, sheetIndex, index, type) {
  powerupjs.SpriteGameObject.call(this, sprite, 1, 0, ID.layer_background);
  this.sheetIndex = sheetIndex;
  this.index = index;
  this.terrainType = type
  this.containsCrops = 'false'
}

Tile.prototype = Object.create(powerupjs.SpriteGameObject.prototype)

Tile.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  // var objects = powerupjs.Game.gameWorld.map.areas[this.parent.areaIndex].find(ID.objects);
}