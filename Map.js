function Map() {
  powerupjs.GameObjectList.call(this, ID.layer_objects, ID.map);
  this.areas = new Array()
  this.startingArea = 0
  for (var i=0; i<3; i++) {
    var area = new Area(i)
    this.areas.push(area)
  }
  var player = new Player();
  var area = this.areas[this.startingArea];
  console.log(area.gameObjects)

  var feild = area.find(ID.objects)
  feild.add(player)
  this.mode = 'boundary_editing'
  this.currentAreaIndex = 0
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