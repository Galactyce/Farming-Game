function Trough(position, type, animalType, area) {
  powerupjs.SpriteGameObject.call(
    this,
    sprites.machines[type + "_trough"].empty,
    1,
    0,
    ID.layer_background_1
  );
  this.machineType = 'trough';
  this.areaIndex = area;
  this.position = position;
  this.type = type;
  this.animalType = animalType;
  this.capacity = 3
  this.remaining = 0
  
}

Trough.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Trough.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  var inventory = powerupjs.Game.gameWorld.inventory.itemGrid;
  for (var i = 0; i < powerupjs.Game.gameWorld.interiors.length; i++) {
    if (powerupjs.Game.gameWorld.interiors[i].type === this.areaIndex) {
      var player = powerupjs.Game.gameWorld.interiors[i].player;

      if (
        player.boundingBox.intersects(this.boundingBox) &&
        powerupjs.Keyboard.pressed(32)
      ) {
        if (this.type === "water") {
          this.sprite = sprites.machines[this.type + "_trough"].full;
        } else if (this.type === "food" && this.remaining < this.capacity) {
          var itemIndexs = new Array()
          for (var k = 0; k < inventory.gridLength; k++) {
            var thing = inventory.atIndex(k);
            if (thing === null || thing === undefined) continue;
            var sprite = thing.sprite.imgName;
            var imgInfo = sprite.split("/");
            var imgType = imgInfo[1].split("_"); // Splits the image file name into sections
            if (imgType[1] === "wheat.png") {
              this.remaining++;
              inventory.gameObjects[k] = null; // Set the item to null
              powerupjs.Game.gameWorld.inventory.save()
              powerupjs.Game.gameWorld.saveMachines()
               break
            }
          }
          
        }
      }
    }
  }
  if (this.remaining >= 1) {
    this.sprite = sprites.machines[this.type + "_trough"].full;
    
  }
  else {
    
    this.sprite = sprites.machines[this.type + "_trough"].empty
  }
2};
