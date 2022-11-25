function Wall(type, index, sheetIndex) {
  this.spriteType = type
  powerupjs.SpriteGameObject.call(this, sprites.walls[type], 1, 0, ID.layer_background);
  this.sheetIndex = sheetIndex
  this.index = index
  this.type = 'wall'
}

Wall.prototype = Object.create(powerupjs.SpriteGameObject.prototype)

Wall.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta)
  var feild = this.parent;
  var player = feild.find(ID.player);
  var switchPoint = this.position.y - 15
  if (this.spriteType !== 'weeds') {
  if (player !== null) {
    if (player.position.y > switchPoint) {
      this.layer = ID.layer_background
    }
    else {
      this.layer = ID.layer_background_2
      
    }
    feild.gameObjects.sort(function (a, b) {
      return a.layer - b.layer;
    });
  }
  }
}