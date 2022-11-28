function InteriorArea(type) {
  powerupjs.GameObjectList.call(this, ID.layer_background);
  var backdrop = new powerupjs.SpriteGameObject(sprites.interiors[type], 1, 0, ID.layer_background);
  backdrop.origin = backdrop.center;
  backdrop.position = new powerupjs.Vector2(powerupjs.Game.size.x / 2, powerupjs.Game.size.y / 2)
  this.type = type
  console.log(type)
  this.add(backdrop)
  this.add(new InteriorBoundsEditor(type))
  this.add(new InteriorBounds(type))
  this.player = new Player()
  this.player.playAnimation('idle_front')
  this.add(this.player)
}

InteriorArea.prototype = Object.create(powerupjs.GameObjectList.prototype)

InteriorArea.prototype.draw = function() {
  if (powerupjs.Game.gameWorld.currentInteriorArea === this.type) {
    powerupjs.GameObjectList.prototype.draw.call(this)
  }
}


InteriorArea.prototype.update = function(delta) {
  if (powerupjs.Game.gameWorld.currentInteriorArea === this.type) {
    powerupjs.GameObjectList.prototype.update.call(this, delta)
    
  }
}
