function Building(areaIndex, position, building_type, doorHitbox, spawnPosition) {
  powerupjs.SpriteGameObject.call(
    this,
    sprites.buildings[building_type],
    1,
    0,
    ID.layer_background_1
  );
  this.type = "building";
  this.areaIndex = areaIndex;
  this.position = position;
  this.building_type = building_type;
  this.doorHitbox = doorHitbox
  this.spawnPosition = spawnPosition

}

Building.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Building.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  var feild = this.parent;
  var player = feild.find(ID.player);
  var switchPoint = this.position.y + 90; // Where the player changes layer
for (var i=0; i<feild.gameObjects.length; i++) {
  if (feild.gameObjects[i].animated) {
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
};
