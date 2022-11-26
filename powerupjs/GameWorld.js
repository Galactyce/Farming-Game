
var mapLayout = [
  1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30
];


var ID = {};

ID.layer_background = 1;
ID.layer_background_1 = 2;
ID.layer_background_2 = 3;
ID.layer_background_3 = 4;
ID.layer_tiles = 10;
ID.layer_objects = 20;
ID.layer_overlays = 30;
ID.layer_overlays_1 = 31;
ID.layer_overlays_2 = 32;

ID.map = 1;
ID.tiles = 2;
ID.front_tiles = 3;
ID.player = 4;
ID.objects = 5;
ID.boundaries = 6;
ID.inventory = 7;

function GameWorld(layer) {
  powerupjs.GameObjectList.call(this, layer);

  this.map = new Map();
  var area = this.map.areas[this.map.currentAreaIndex];
  this.inventory = new Inventory();
  this.add(this.map);

}

GameWorld.prototype = Object.create(powerupjs.GameObjectList.prototype);

GameWorld.prototype.draw = function() {
  powerupjs.GameObjectList.prototype.draw.call(this);
  if (this.inventory.open) {
    this.inventory.draw()
  }
}

GameWorld.prototype.update = function (delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  if (this.inventory.open) {
    this.inventory.update(delta)
  }
  if (powerupjs.Keyboard.pressed(69) && this.map.mode === 'playing') {
    this.inventory.open = !this.inventory.open
  }
  if (powerupjs.Keyboard.pressed(65)) {
    this.map.mode = 'playing'
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i=0; i<tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true
    }
  }
  if (powerupjs.Keyboard.pressed(83)) {
    this.map.mode = 'boundary_editing'
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i=0; i<tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true
    }
  }
  if (powerupjs.Keyboard.pressed(70)) {
    this.map.mode = 'nature_deco_editing'
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i=0; i<tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true
    }
  }
  if (powerupjs.Keyboard.pressed(71)) {
    this.map.mode = 'flower_deco_editing'
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i=0; i<tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true
    }
  }
  if (powerupjs.Keyboard.pressed(72)) {
    this.map.mode = 'wall_deco_editing'
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i=0; i<tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true
    }
  }
  if (powerupjs.Keyboard.pressed(68)) {
    this.map.mode = 'terrain_editing'
  }

  if (powerupjs.Keyboard.down(16) && powerupjs.Keyboard.pressed(8)) {
    if (confirm("Clear local storage? (This will delete everything!)")) {
      localStorage.clear();
      window.location.reload()
    }
  }

  if (powerupjs.Keyboard.pressed(107)) {
    if (this.map.currentAreaIndex === this.map.areas.length)
    this.map.currentAreaIndex++
    this.map.areas[this.map.currentAreaIndex].player.position = this.map.playerPosition
    this.map.areas[this.map.currentAreaIndex].player.lastDirection = this.map.playerAnimation
   
  }
  if (powerupjs.Keyboard.pressed(109)) {
    if (this.map.currentAreaIndex === 0) return;

    this.map.currentAreaIndex--
    this.map.areas[this.map.currentAreaIndex].player.position = this.map.playerPosition
    this.map.areas[this.map.currentAreaIndex].player.lastDirection = this.map.playerAnimation

  }
};

GameWorld.prototype.handleInput = function () {
  powerupjs.GameObjectList.prototype.handleInput.call(this);
};
