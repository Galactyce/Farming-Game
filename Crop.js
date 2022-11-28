function Crop(type, position, sheetIndex) {
  console.log(type)
  powerupjs.SpriteGameObject.call(this, sprites.crops[type], 1, 0, ID.layer_background);
  this.sheetIndex = sheetIndex
  this.type = 'crops';
  this.position = position
  this.sprite_type = type;
  this.timer = Date.now();  // Time of phase start
  this.ready = false
}

Crop.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Crop.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  if (this.sheetIndex === this.numberSheetElements - 1) {
    this.ready = true
  }
  if (Date.now() > this.timer + 9000 && this.sheetIndex < this.numberSheetElements - 1) {
    this.timer = Date.now();  // Set phase timer to "0"
    this.sheetIndex++
    powerupjs.Game.gameWorld.saveObjects()  // Save the sheet index to local storage
  }   // Every 9 seconds, it grows one phase

 
}