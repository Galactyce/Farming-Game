function Machine(position, type, area, produce, requireType, requireAmount, productionTime) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_background_1);
  this.position = position;
  this.area = area;
  this.produce = produce;
  this.level = 0;
  this.machineType = 'machine'
  this.productionTime = productionTime;
  this.productionDate = 0;

  this.requireType = requireType;
  this.requireAmount = requireAmount;
  this.produceReady = false;
  this.containing = 0;
  this.producing = false;
  this.loadAnimation(sprites.machines[type].working, "working", true, 0.2);
  this.loadAnimation(sprites.machines[type].idle, "idle", false);
  this.playAnimation("idle");
}

Machine.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Machine.prototype.draw = function () {
  powerupjs.AnimatedGameObject.prototype.draw.call(this);


  if (
    this.producing &&
    Date.now() > this.productionDate + this.productionTime
  ) {
    this.produceReady = true;
    var marker = new powerupjs.SpriteGameObject(
      sprites.markers[this.produce],
      1,
      0,
      ID.layer_overlays
    );
    marker.position = this.position.copy();
    marker.position.y = this.position.y - 45;
    marker.draw();
  }
};

Machine.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  if (!this.producing) {
    this.playAnimation("idle")
  }
  else 
  {
    this.playAnimation('working')
  }

  var feild = powerupjs.Game.gameWorld.interiors[this.area];
  var player = feild.find(ID.player);
  var inventory = powerupjs.Game.gameWorld.inventory.itemGrid;

  if (player.boundingBox.intersects(this.boundingBox)) {
    if (powerupjs.Keyboard.pressed(32)) {

      if (Date.now() > this.productionDate + this.productionTime && this.producing) {
        for (var k = 0; k < inventory.gridLength; k++) {
          var col = Math.floor(k / inventory.columns);
          var row = k % inventory.columns;
      
          if (inventory.at(row, col) === null) {
      
            inventory.addAt(
              new powerupjs.SpriteGameObject(
                sprites.items[this.produce],
                1,
                0,
                ID.layer_overlays
              ),
              row,
              col
            );
            powerupjs.Game.gameWorld.inventory.save()

            break;
          }
        }
        this.containing = 0;
        this.producing = false
        return
      }

      if (this.containing < this.requireAmount && !this.producing) {
        for (var k = 0; k < inventory.gridLength; k++) {
          var thing = inventory.atIndex(k);
          if (thing === null || thing === undefined) continue;
          var sprite = thing.sprite.imgName;
          var imgInfo = sprite.split("/");
          var imgType = imgInfo[1].split("_"); // Splits the image file name into sections
          console.log(imgType[1]);
          if (imgType[1] === this.requireType + ".png") {
            this.containing++;
            inventory.gameObjects[k] = null; // Set the item to null
            this.producing = false;
            powerupjs.Game.gameWorld.inventory.save()
            break;
          }
        }
        if (this.requireAmount === this.containing && !this.producing) {
          this.playAnimation("working")
          this.containing = 0;
          this.producing = true;
          this.productionDate = Date.now();
          return
        }
      }

   
    }
  }
};
