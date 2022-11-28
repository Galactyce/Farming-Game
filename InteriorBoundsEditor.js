function InteriorBoundsEditor(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 60, 100, ID.layer_overlays);
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.tilePosition = new powerupjs.Vector2(0, 0);
  this.mode = "erase";
  this.areaIndex = areaIndex
}

InteriorBoundsEditor.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

InteriorBoundsEditor.prototype.update = function (delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.specialMode !== "interior_boundary_editing") return;
  this.tilePosition.x =
    Math.floor(powerupjs.Mouse.position.x / this.cellWidth) * this.cellWidth;
  this.tilePosition.y =
    Math.floor(powerupjs.Mouse.position.y / this.cellHeight) * this.cellHeight;

  if (powerupjs.Keyboard.pressed(66)) {
    this.mode = 'draw'
  }
  if (powerupjs.Keyboard.pressed(86)) {
    this.mode = 'erase'
  }

  var area = this.parent;
  var feild = area.find(ID.interior_boundaries);
  if (powerupjs.Mouse._left.pressed || powerupjs.Keyboard.down(186)) {
    if (this.mode === "draw") {
      var boundary = new Boundary(
        new powerupjs.Vector2(
          this.tilePosition.x / this.cellWidth,
          this.tilePosition.y / this.cellHeight
        )
      );
      feild.addAt(
        boundary,
        this.tilePosition.x / this.cellWidth,
        this.tilePosition.y / this.cellHeight
      );
      console.log(boundary)
    } else if (this.mode === "erase") {
      for (var i=0; i<feild.gameObjects.length; i++) {
        var boundary = feild.gameObjects[i];
        if (boundary === undefined) continue
        if (boundary.boundingBox.contains(powerupjs.Mouse._position)) {
          feild.gameObjects[i] = undefined;
          
        }
      }
    }
    this.save();

  }
};

InteriorBoundsEditor.prototype.save = function () {
  var all = "";
  for (var k = 0; k < powerupjs.Game.gameWorld.interiors.length; k++) {
    var area = powerupjs.Game.gameWorld.interiors[k];
    var tiles = area.find(ID.interior_boundaries);
    var fullString = "|" + area.type + "|";
    for (var i = 0, l = tiles.gameObjects.length; i < l; ++i) {
      if (tiles.gameObjects[i] === undefined || tiles.gameObjects[i] === null)  // Skip over unused tiles
        continue;
      var tile = tiles.gameObjects[i];
      var string = tile.index.x + "/" + tile.index.y + ",";
      fullString += string;
    }
    all += fullString;
  }
  console.log(fullString)
  localStorage.interiorBoundaries = all;
};

InteriorBoundsEditor.prototype.draw = function () {
  powerupjs.GameObjectGrid.prototype.update.call(this);
  if (powerupjs.Game.gameWorld.specialMode !== "interior_boundary_editing") return;
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
