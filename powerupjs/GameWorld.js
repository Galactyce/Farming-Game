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
ID.boundaries = 6

function GameWorld(layer) {
  powerupjs.GameObjectList.call(this, layer);
  this.map = new Map();
  this.add(this.map);
}

GameWorld.prototype = Object.create(powerupjs.GameObjectList.prototype);

GameWorld.prototype.update = function (delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
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
  if (powerupjs.Keyboard.pressed(68)) {
    this.map.mode = 'terrain_editing'
  }
};

GameWorld.prototype.handleInput = function () {
  powerupjs.GameObjectList.prototype.handleInput.call(this);
};
