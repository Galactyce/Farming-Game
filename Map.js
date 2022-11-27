function Map() {
  powerupjs.GameObjectList.call(this, ID.layer_objects, ID.map);
  this.areas = new Array()
  this.startingArea = 15
  for (var i=0; i<mapLayout.length; i++) {
    var area = new Area(i)
    this.areas.push(area)
  }
  this.playerAnimation = undefined
  this.playerPosition = new powerupjs.Vector2(0, 0)
  this.mode = 'playing'
  this.currentAreaIndex = 15
  console.log(this.areas[this.currentAreaIndex].find(ID.tiles))
 
  
}

Map.prototype = Object.create(powerupjs.GameObjectList.prototype)

Map.prototype.update = function(delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  this.areas[this.currentAreaIndex].update(delta);
}

Map.prototype.draw = function() {
  powerupjs.GameObjectList.prototype.update.call(this);
  this.areas[this.currentAreaIndex].draw();
}