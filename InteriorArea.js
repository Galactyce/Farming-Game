function InteriorArea(type, spawnPosition, exitHitbox) {
  powerupjs.GameObjectList.call(this, ID.layer_background);
  var backdrop = new powerupjs.SpriteGameObject(
    sprites.interiors[type],
    1,
    0,
    ID.layer_background
  );
  console.log(backdrop)
  backdrop.origin = backdrop.center;
  backdrop.position = new powerupjs.Vector2(
    powerupjs.Game.size.x / 2,
    powerupjs.Game.size.y / 2
  );
  this.type = type;
  this.exitHitbox = exitHitbox;
  this.machines = new powerupjs.GameObjectList(ID.layer_background_1);
  this.animals = new powerupjs.GameObjectList(ID.layer_background_1);
  this.add(this.machines);
  this.add(this.animals);
  this.add(backdrop);
  this.add(new InteriorBoundsEditor(type));
  this.add(new InteriorBounds(type));
  this.player = new Player();
  this.player.layer = ID.layer_background_2;
  this.player.playAnimation("idle_front");
  this.spawnPosition = spawnPosition;
  this.player.position = spawnPosition;
  this.add(this.player);
}

InteriorArea.prototype = Object.create(powerupjs.GameObjectList.prototype);

InteriorArea.prototype.draw = function () {
  if (powerupjs.Game.gameWorld.currentInteriorArea === this.type) {
    powerupjs.GameObjectList.prototype.draw.call(this);
  }
};


InteriorArea.prototype.save = function () {
  
};

InteriorArea.prototype.update = function (delta) {
  if (powerupjs.Game.gameWorld.currentInteriorArea === this.type) {
    powerupjs.GameObjectList.prototype.update.call(this, delta);
    if (this.player.boundingBox.intersects(this.exitHitbox)) {
      powerupjs.Game.gameWorld.currentInteriorArea = "none";
    }
  }
};
