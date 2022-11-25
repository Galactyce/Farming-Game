function TileField(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 30, 50, ID.layer_background, ID.tiles);
  this.cellWidth = 32;
  this.cellHeight = 32;
  this.place = "back";
  this.areaIndex = areaIndex
  // localStorage.clear()
  this.loadTiles();
}

TileField.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

TileField.prototype.loadTiles = function () {
  if (localStorage.terrainTiles === undefined) {
    for (var row = 0; row < this.rows; ++row) {
      for (var col = 0; col < this.columns; ++col) {
        var t = new Tile(
          sprites.terrain_tiles['normal'],
          6,
          new powerupjs.Vector2(col, row),
          0
        );
        t.position = new powerupjs.Vector2(
          col * this.cellWidth,
          row * this.cellHeight
        );
        t.terrainType = 'normal'
        this.addAt(t, col, row);
      }
    }
  }
  else {
    var tileCode = localStorage.terrainTiles;
    var areaCodes = tileCode.split("|")
    var area = areaCodes[(this.areaIndex + 1) * 2]
    var codeArray = area.split(",");
    for (var i=0; i<codeArray.length - 1; i++) {
      var code = codeArray[i].split('/');
      var type = code[0];
      var sheetIndex = parseInt(code[1]);
      var x = parseInt(code[2]);
      var y = parseInt(code[3])
      var t = new Tile(sprites.terrain_tiles[type], sheetIndex, new powerupjs.Vector2(x, y))
      t.position = new powerupjs.Vector2(
        x * this.cellWidth,
        y * this.cellHeight
      );
      t.terrainType = type
      this.addAt(t, x, y);
    }
  }
};

TileField.prototype.update = function (delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta);
};

function FrontTileField(areaIndex) {
  powerupjs.GameObjectGrid.call(
    this,
    30,
    50,
    ID.layer_background_1,
    ID.front_tiles
  );
  this.cellWidth = 32;
  this.cellHeight = 32;
  this.place = "front";
  this.areaIndex = areaIndex

  this.loadTiles()
}

FrontTileField.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

FrontTileField.prototype.loadTiles = function () {
  if (localStorage.frontTerrainTiles !== undefined) {
    var tileCode = localStorage.frontTerrainTiles;
    var areaCodes = tileCode.split("|")
    var area = areaCodes[(this.areaIndex + 1) * 2]
    var codeArray = area.split(",");
    for (var i=0; i<codeArray.length - 1; i++) {
      var code = codeArray[i].split('/');
      var type = code[0];
      var sheetIndex = parseInt(code[1]);
      var x = parseInt(code[2]);
      var y = parseInt(code[3])
      var t = new Tile(sprites.terrain_tiles[type], sheetIndex, new powerupjs.Vector2(x, y))
      t.position = new powerupjs.Vector2(
        x * this.cellWidth,
        y * this.cellHeight
      );
      t.terrainType = type
      this.addAt(t, x, y);
    }
  }
};

