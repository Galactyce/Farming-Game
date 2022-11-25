function Tile(sprite, sheetIndex, index, type) {
  powerupjs.SpriteGameObject.call(this, sprite, 1, 0, ID.layer_background);
  this.sheetIndex = sheetIndex;
  this.index = index;
  this.type = type
  this.terrainType = undefined
}

Tile.prototype = Object.create(powerupjs.SpriteGameObject.prototype)