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
   var switchPoint = this.position.y + 170; // Where the player changes layer
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
}