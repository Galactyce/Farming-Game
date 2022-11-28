var mapLayout = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
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
ID.interior_boundaries = 8;

function GameWorld(layer) {
  powerupjs.GameObjectList.call(this, layer);

  this.map = new Map();
  var area = this.map.areas[this.map.currentAreaIndex];
  this.inventory = new Inventory();
  this.inventory.visible = false;
  this.interiors = new Array();
  this.interiors.push(new InteriorArea("barn"));
  this.currentInteriorArea = "none";
  this.specialMode = 'none'
}

GameWorld.prototype = Object.create(powerupjs.GameObjectList.prototype);

GameWorld.prototype.draw = function () {
  powerupjs.GameObjectList.prototype.draw.call(this);
  if (this.currentInteriorArea === "none") this.map.draw();
  else {
    for (var i = 0; i < this.interiors.length; i++) {
      if (this.currentInteriorArea === this.interiors[i].type) {
        this.interiors[i].draw();
      }
    }
  }
  this.inventory.draw();

};

GameWorld.prototype.update = function (delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  if (this.currentInteriorArea === "none") this.map.update(delta);
  else {
    for (var i = 0; i < this.interiors.length; i++) {
      if (this.currentInteriorArea === this.interiors[i].type) {
        this.interiors[i].update(delta);
      }
    }
  }
  this.inventory.update(delta);

  if (powerupjs.Keyboard.pressed(69) && this.map.mode === "playing") {
    this.inventory.visible = !this.inventory.visible;
    this.specialMode === 'none'
  }
  if (powerupjs.Keyboard.pressed(65)) {
    this.map.mode = "playing";
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i = 0; i < tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true;
    }
  }
  if (powerupjs.Keyboard.pressed(83)) {
    if (this.currentInteriorArea === 'none') {
    this.map.mode = "boundary_editing";
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i = 0; i < tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true;
    }
  }
  else {
    this.specialMode = 'interior_boundary_editing'
  }

  }
  if (powerupjs.Keyboard.pressed(70)) {
    this.map.mode = "nature_deco_editing";
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i = 0; i < tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true;
    }
  }
  if (powerupjs.Keyboard.pressed(71)) {
    this.map.mode = "flower_deco_editing";
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i = 0; i < tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true;
    }
  }
  if (powerupjs.Keyboard.pressed(72)) {
    this.map.mode = "wall_deco_editing";
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i = 0; i < tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true;
    }
  }
  if (powerupjs.Keyboard.pressed(68)) {
    this.map.mode = "terrain_editing";
  }

  if (powerupjs.Keyboard.down(16) && powerupjs.Keyboard.pressed(8)) {
    if (confirm("Clear local storage? (This will delete everything!)")) {
      localStorage.clear();
      window.location.reload();
    }
  }
  if (powerupjs.Keyboard.pressed(79)) {
    console.log(localStorage.objects);
  }
  if (powerupjs.Keyboard.pressed(84)) {
    console.log(localStorage.terrainTiles);
  }
  if (powerupjs.Keyboard.pressed(80)) {
    console.log(localStorage.boundaryTiles);
  }
  if (powerupjs.Keyboard.pressed(86)) {
    console.log(localStorage.frontTerrainTiles);
  }
};
GameWorld.prototype.handleInput = function () {
  powerupjs.GameObjectList.prototype.handleInput.call(this);
};

GameWorld.prototype.saveObjects = function () {
  var all = "";
  for (var k = 0; k < 30; k++) {
    var area = powerupjs.Game.gameWorld.map.areas[k];
    var objects = area.find(ID.objects);
    var fullString = "|" + k + "|";
    for (var i = 0, l = objects.gameObjects.length; i < l; ++i) {
      if (
        objects.gameObjects[i] === undefined ||
        objects.gameObjects[i] === null
      )
        continue;
      var object = objects.gameObjects[i];
      if (object.type === "nature") {
        var string =
          object.type +
          "/" +
          object.spriteType +
          "/" +
          object.index.x +
          "/" +
          object.index.y +
          ",";
      } else if (object.type === "flower") {
        var string =
          object.type +
          "/" +
          object.spriteType +
          "/" +
          object.sheetIndex +
          "/" +
          object.index.x +
          "/" +
          object.index.y +
          ",";
      } else if (object.type === "wall") {
        var string =
          object.type +
          "/" +
          object.spriteType +
          "/" +
          object.sheetIndex +
          "/" +
          object.index.x +
          "/" +
          object.index.y +
          ",";
      } else if (object.type === "crops") {
        var string =
          object.type +
          "/" +
          object.sprite_type +
          "/" +
          object.sheetIndex +
          "/" +
          object.position.x +
          "/" +
          object.position.y +
          ",";
      } else {
        var string = undefined + ",";
      }
      fullString += string;
    }

    all += fullString;
  }

  localStorage.objects = all;
};
