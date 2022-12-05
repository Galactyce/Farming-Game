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
  this.timer = new powerupjs.TimerGameObject(ID.layer_overlays_1);
  this.timer.position = new powerupjs.Vector2(this.position.x, this.position.y - 35)
  this.timer.color = 'black'
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
  var feild = powerupjs.Game.gameWorld.interiors[this.area];

  var player = feild.find(ID.player);


  if (!this.produceReady && this.producing && player.boundingBox.intersects(this.boundingBox)) {
    var bubble = new powerupjs.SpriteGameObject(sprites.extras['timer_bubble'], 1, 0, ID.layer_overlays)
    bubble.position = new powerupjs.Vector2(this.position.x - 19, this.position.y - 58);
    bubble.draw()
    powerupjs.Game.gameWorld.currentTimeBubble = this.produce
    this.timer.draw()
  }

  if (!this.produceReady && !this.producing && player.boundingBox.intersects(this.boundingBox)) {
    var bubble = new powerupjs.SpriteGameObject(sprites.require_bubbles[this.requireType], 1, 0, ID.layer_overlays)
    bubble.position = new powerupjs.Vector2(this.position.x - 19, this.position.y - 58);
    bubble.draw()

    var label = new powerupjs.Label();
    label.layer = ID.layer_overlays_1;
    label.text = this.containing + "/" + this.requireAmount
    label.position = new powerupjs.Vector2(this.position.x - 7, this.position.y - 30);
    label.draw()
  }
};



Machine.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);


  if (!this.timer.timeUp && this.producing) {
    this.timer.update(delta)
  }

  if (this.timer.timeUp) {
  }

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

  this.timer.timeLeft = Math.abs(this.productionTime - Math.abs(this.productionDate - Date.now())) / 1000
 
  if (player.boundingBox.intersects(this.boundingBox)) {
    if (powerupjs.Keyboard.pressed(32)) {
      if (Date.now() > this.productionDate + this.productionTime && this.producing) {
        for (var k = 0; k < inventory.gridLength; k++) {
          var col = Math.floor(k / inventory.columns);
          var row = k % inventory.columns;
      
          if (inventory.at(row, col) === null || inventory.at(row, col) === undefined) {
      
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
        this.produceReady = false
        this.containing = 0;
        this.producing = false
        powerupjs.Game.gameWorld.saveMachines()
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
          this.timer.timeLeft = this.productionTime / 1000;

          return
        }
      }

   
    }
  }
};
