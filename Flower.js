function Flower(type, index, sheetIndex) {
  this.spriteType = type
  powerupjs.SpriteGameObject.call(this, sprites.flowers[type], 1, 0, ID.layer_background);
  this.sheetIndex = sheetIndex
  this.index = index
  this.type = 'flower'
}

Flower.prototype = Object.create(powerupjs.SpriteGameObject.prototype)

Flower.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta)
  var feild = this.parent;
  var player = feild.find(ID.player);
  var switchPoint = this.position.y - 15  // The point where the character changes layer
  if (this.spriteType !== 'weeds') {
  if (player !== null) {
    if (player.position.y > switchPoint) {
      this.layer = ID.layer_background
    }
    else {
      this.layer = ID.layer_background_2
      
    }
    feild.gameObjects.sort(function (a, b) {
      return a.layer - b.layer;     // Sort the layers
    });
  }
  }
}