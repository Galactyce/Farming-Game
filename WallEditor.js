function WallEditor(areaIndex) {
  powerupjs.GameObjectGrid.call(this, 60, 100, ID.layer_overlays);
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.tilePosition = new powerupjs.Vector2(0, 0);
  this.types = new Array();
  for (let i in sprites.walls) {
    this.types.push(i);
  }
  this.currentTypeIndex = 0;
  this.currentSheetIndex = 0;
  this.mode = "draw";
}

WallEditor.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

WallEditor.prototype.update = function (delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta);
  if (powerupjs.Game.gameWorld.map.mode !== "wall_deco_editing") return;
  this.tilePosition.x =
    Math.floor(powerupjs.Mouse.position.x / this.cellWidth) * this.cellWidth;
  this.tilePosition.y =
    Math.floor(powerupjs.Mouse.position.y / this.cellHeight) * this.cellHeight;
  this.currentNumberSheetElements =
    sprites.walls[this.types[this.currentTypeIndex]].nrSheetElements;
  if (powerupjs.Keyboard.pressed(66)) {
    this.mode = "draw";
  }
  if (powerupjs.Keyboard.pressed(69)) {
    this.mode = "erase";
  }
  if (powerupjs.Keyboard.pressed(37)) {
    this.currentTypeIndex++;
    if (this.currentTypeIndex > this.types.length - 1) {
      this.currentTypeIndex = 0;
    }
  }

  if (powerupjs.Keyboard.pressed(39)) {
    this.currentTypeIndex--;
    if (this.currentTypeIndex < 0) {
      this.currentTypeIndex = this.types.length - 1;
    }
  }

  if (powerupjs.Keyboard.pressed(38)) {
    this.currentSheetIndex++;
    if (this.currentSheetIndex > this.currentNumberSheetElements - 1) {
      this.currentSheetIndex = 0;
    }
  }

  if (powerupjs.Keyboard.pressed(40)) {
    this.currentSheetIndex--;
    if (this.currentSheetIndex < 0) {
      this.currentSheetIndex = this.currentNumberSheetElements - 1;
    }
  }

  var area = this.parent;
  var feild = area.find(ID.objects);
  if (powerupjs.Mouse._left.pressed) {
    if (this.mode === "draw") {
      var wall = new Wall(
        this.types[this.currentTypeIndex],
        new powerupjs.Vector2(
          this.tilePosition.x / this.cellWidth,
          this.tilePosition.y / this.cellHeight
        ),
        this.currentSheetIndex
      );
      wall.position = new powerupjs.Vector2(
        this.tilePosition.x,
        this.tilePosition.y
      );
      feild.add(wall);
    } else if (this.mode === "erase") {
      for (var i = 0; i < feild.gameObjects.length; i++) {
        var wall = feild.gameObjects[i];
        if (wall === undefined) continue;
        if (wall.boundingBox.contains(powerupjs.Mouse._position)) {
          feild.gameObjects[i] = undefined;
        }
      }
    }
    powerupjs.Game.gameWorld.saveObjects()
  }
};


WallEditor.prototype.draw = function () {
  powerupjs.GameObjectGrid.prototype.update.call(this);
  if (powerupjs.Game.gameWorld.map.mode !== "wall_deco_editing") return;
  if (this.mode === "draw") {
    var t = new powerupjs.SpriteGameObject(
      sprites.walls[this.types[this.currentTypeIndex]],
      1,
      0,
      ID.layer_overlays
    );
    t.sheetIndex = this.currentSheetIndex;
    t.position = this.tilePosition;
    t.draw();
  }
};
