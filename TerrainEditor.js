function TerrainEditor(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 30, 50, ID.layer_overlays);
  this.cellWidth = 32;
  this.cellHeight = 32;
  this.tilePosition = new powerupjs.Vector2(0, 0);
  this.terrainTypes = new Array();
  this.layers = new Array("front", "back");
  for (let i in sprites.terrain_tiles) {
    this.terrainTypes.push(i);
  }
  this.currentTypeIndex = 0;
  this.currentSheetIndex = 0;
  this.currentLayer = "back";
  this.currentNumberElements = 0;
  this.areaIndex = areaIndex;
  this.mode = "draw";
}

TerrainEditor.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

TerrainEditor.prototype.update = function (delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.map.mode !== "terrain_editing") return;
  this.tilePosition.x =
    Math.floor(powerupjs.Mouse.position.x / this.cellWidth) * this.cellWidth;
  this.tilePosition.y =
    Math.floor(powerupjs.Mouse.position.y / this.cellHeight) * this.cellHeight;
  this.currentNumberElements =
    sprites.terrain_tiles[this.terrainTypes[0]].nrSheetElements;

  if (powerupjs.Keyboard.pressed(49)) {
    this.currentLayer = "back";
  }
  if (powerupjs.Keyboard.pressed(50)) {
    this.currentLayer = "front";
  }

  if (powerupjs.Keyboard.pressed(40)) {
    this.currentSheetIndex++;
    if (this.currentSheetIndex > this.currentNumberElements) {
      this.currentSheetIndex = 0;
    }
  }
  if (powerupjs.Keyboard.pressed(38)) {
    this.currentSheetIndex--;
    if (this.currentSheetIndex < 0) {
      this.currentSheetIndex = this.currentNumberElements;
    }
  }
  if (powerupjs.Keyboard.pressed(37)) {
    this.currentTypeIndex++;
    if (this.currentTypeIndex >= this.terrainTypes.length) {
      this.currentTypeIndex = 0;
    }
  }
  if (powerupjs.Keyboard.pressed(39)) {
    this.currentTypeIndex--;
    if (this.currentTypeIndex < 0) {
      this.currentTypeIndex = this.terrainTypes.length - 1;
    }
  }
  if (powerupjs.Mouse._left.pressed || powerupjs.Keyboard.down(186)) {
    var area = this.parent;
    if (this.currentLayer === "back") {
      var tiles = area.find(ID.tiles);
      var index = new powerupjs.Vector2(
        Math.floor(powerupjs.Mouse.position.x / this.cellWidth),
        Math.floor(powerupjs.Mouse.position.y / this.cellHeight)
      );
      var t = new Tile(
        sprites.terrain_tiles[this.terrainTypes[this.currentTypeIndex]],
        this.currentSheetIndex,
        index,

        this.terrainTypes[this.currentTypeIndex]
      );
      t.terrainType = this.terrainTypes[this.currentTypeIndex];
      tiles.addAt(t, index.x, index.y);
    } else if (this.currentLayer === "front") {
      var tiles = area.find(ID.front_tiles);
      var index = new powerupjs.Vector2(
        Math.floor(powerupjs.Mouse.position.x / this.cellWidth),
        Math.floor(powerupjs.Mouse.position.y / this.cellHeight)
      );
      if (this.mode === "draw") {
        var t = new Tile(
          sprites.terrain_tiles[this.terrainTypes[this.currentTypeIndex]],
          this.currentSheetIndex,
          index,

          this.terrainTypes[this.currentTypeIndex]
        );
        t.terrainType = this.terrainTypes[this.currentTypeIndex];

        tiles.addAt(t, index.x, index.y);
      }
    }
    this.save();
  }
};

TerrainEditor.prototype.save = function () {
  var all = "";
  for (var k = 0; k < powerupjs.Game.gameWorld.map.areas.length; k++) {
    var area = powerupjs.Game.gameWorld.map.areas[k];
    var tiles = area.find(ID.tiles);
    var fullString = "|" + k + "|";
    for (var i = 0, l = tiles.gridLength; i < l; ++i) {
      var tile = tiles.atIndex(i);
      var string =
        tile.terrainType +
        "/" +
        tile.sheetIndex +
        "/" +
        tile.index.x +
        "/" +
        tile.index.y +
        "/" +
        tile.containsCrops +
        ","
      fullString += string;
    }
    all += fullString;
  localStorage.terrainTiles = all;
}
  var all = "";
  for (var k = 0; k < powerupjs.Game.gameWorld.map.areas.length; k++) {
    var area = powerupjs.Game.gameWorld.map.areas[k];
    var tiles = area.find(ID.front_tiles);
    var fullString = "|" + k + "|";
    for (var i = 0, l = tiles.gridLength; i < l; ++i) {
      if (tiles.atIndex(i) === undefined || tiles.atIndex(i) === null) continue;
      var tile = tiles.atIndex(i);
      var string =
        tile.terrainType +
        "/" +
        tile.sheetIndex +
        "/" +
        tile.index.x +
        "/" +
        tile.index.y +
        "," +
        tile.type +
        "/" +
        tile.containsCrops +
        ","
      fullString += string;
    }
    all += fullString;
  }
  localStorage.frontTerrainTiles = all;
};

TerrainEditor.prototype.draw = function () {
  powerupjs.GameObjectGrid.prototype.draw.call(this);
  if (powerupjs.Game.gameWorld.map.mode !== "terrain_editing") return;

  var area =
    powerupjs.Game.gameWorld.map.areas[
      powerupjs.Game.gameWorld.map.currentAreaIndex
    ];
  var tiles = area.find(ID.tiles);
  var index = new powerupjs.Vector2(
    Math.floor(powerupjs.Mouse.position.x / this.cellWidth),
    Math.floor(powerupjs.Mouse.position.y / this.cellHeight)
  );
  if (index.x > this.columns - 1) {
    index.x = this.columns - 1;
  }
  if (index.x < 0) {
    index.x = 0;
  }
  if (index.y > this.rows - 1) {
    index.y = this.rows - 1;
  }
  if (index.y < 0) {
    index.y = 0;
  }

  for (var i = 0; i < tiles.gridLength; i++) {
    tiles.gameObjects[i].visible = true;
  }
  if (this.currentLayer === "back") {
    var oldTile = tiles.at(index.x, index.y);
    oldTile.visible = false;
  }
  var tile = new powerupjs.SpriteGameObject(
    sprites.terrain_tiles[this.terrainTypes[this.currentTypeIndex]],
    1,
    0,
    ID.layer_overlays
  );
  tile.position = this.tilePosition;
  tile.sheetIndex = this.currentSheetIndex;
  tile.draw();
};
