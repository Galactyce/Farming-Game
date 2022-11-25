function BoundaryEditor(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 60, 100, ID.layer_overlays);
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.tilePosition = new powerupjs.Vector2(0, 0);
  this.mode = "erase";
}

BoundaryEditor.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

BoundaryEditor.prototype.update = function (delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.map.mode !== "boundary_editing") return;
  this.tilePosition.x =
    Math.floor(powerupjs.Mouse.position.x / this.cellWidth) * this.cellWidth;
  this.tilePosition.y =
    Math.floor(powerupjs.Mouse.position.y / this.cellHeight) * this.cellHeight;

  if (powerupjs.Keyboard.pressed(66)) {
    this.mode = 'draw'
  }
  if (powerupjs.Keyboard.pressed(69)) {
    this.mode = 'erase'
  }

  var area = this.parent;
  var feild = area.find(ID.boundaries);
  if (powerupjs.Mouse._left.pressed) {
    if (this.mode === "draw") {
      var boundary = new Boundary(
        new powerupjs.Vector2(
          this.tilePosition.x / this.cellWidth,
          this.tilePosition.y / this.cellHeight
        )
      );
      console.log(boundary);
      feild.addAt(
        boundary,
        this.tilePosition.x / this.cellWidth,
        this.tilePosition.y / this.cellHeight
      );
    } else if (this.mode === "erase") {
      for (var i=0; i<feild.gameObjects.length; i++) {
        var boundary = feild.gameObjects[i];
        if (boundary === undefined) continue
        console.log(boundary.boundingBox)
        if (boundary.boundingBox.contains(powerupjs.Mouse._position)) {
          feild.gameObjects[i] = undefined;
          
        }
      }
    }
    this.save();

  }
};

BoundaryEditor.prototype.save = function () {
  var all = "";
  for (var k = 0; k < 3; k++) {
    var area = powerupjs.Game.gameWorld.map.areas[k];
    var tiles = area.find(ID.boundaries);
    var fullString = "|" + k + "|";
    for (var i = 0, l = tiles.gameObjects.length; i < l; ++i) {
      if (tiles.gameObjects[i] === undefined || tiles.gameObjects[i] === null)
        continue;
      var tile = tiles.gameObjects[i];
      var string = tile.index.x + "/" + tile.index.y + ",";
      fullString += string;
    }
    all += fullString;
  }
  localStorage.boundaryTiles = all;
};

BoundaryEditor.prototype.draw = function () {
  powerupjs.GameObjectGrid.prototype.update.call(this);
  if (powerupjs.Game.gameWorld.map.mode !== "boundary_editing") return;
  if (this.mode === "draw") {
    var t = new powerupjs.SpriteGameObject(
      sprites.extras["boundary"],
      1,
      0,
      ID.layer_overlays
    );
    t.position = this.tilePosition;
    t.draw();
  }
};
