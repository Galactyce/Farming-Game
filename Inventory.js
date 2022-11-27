function Inventory() {
  powerupjs.GameObjectList.call(this, ID.layer_overlays, ID.inventory);
  this.mode = "items";

  this.frame = new powerupjs.SpriteGameObject(
    sprites.inventory["tabs"].slot1,
    1,
    0,
    ID.layer_objects
  );
  this.frame.position = new powerupjs.Vector2(300, 100);
  this.add(this.frame);

  this.buttons = new powerupjs.GameObjectList(ID.layer_overlays);
  this.itemsButton = new powerupjs.SpriteGameObject(
    sprites.inventory["icons"].items,
    1,
    0,
    ID.layer_overlays
  );
  this.itemsButton.position = new powerupjs.Vector2(650, 160);
  this.buttons.add(this.itemsButton);
  this.projectsButton = new powerupjs.SpriteGameObject(
    sprites.inventory["icons"].projects,
    1,
    0,
    ID.layer_overlays
  );
  this.projectsButton.position = new powerupjs.Vector2(715, 175);
  this.buttons.add(this.projectsButton);
  this.add(this.buttons);

  var backdrop = new powerupjs.SpriteGameObject(
    sprites.inventory["backdrops"].summer,
    1,
    0,
    ID.layer_overlays
  );
  backdrop.position = new powerupjs.Vector2(408, 303);
  this.add(backdrop);

  var paperDoll = new powerupjs.SpriteGameObject(
    sprites.main_character["idle"].front,
    1.15,
    0,
    ID.layer_overlays_1
  );
  paperDoll.origin = new powerupjs.Vector2(
    paperDoll.width / 2,
    paperDoll.height / 2
  );
  paperDoll.position = new powerupjs.Vector2(387, 330);
  this.add(paperDoll);

  this.itemGrid = new powerupjs.GameObjectGrid(3, 9, ID.layer_overlays);
  this.itemGrid.cellWidth = 63;
  this.itemGrid.cellHeight = 66;
  this.itemGrid.position = new powerupjs.Vector2(585, 295);
  this.selected = "none";
  this.cropSelected = "none";
  // for (var i=0; i<this.itemGrid.gridLength; i++) {
  //   var col = Math.floor(i / this.itemGrid.columns);
  //   var row = i % this.itemGrid.columns;
  //   var items = new Array();
  //   for (var k in sprites.items) {
  //     items.push(k)
  //   }
  //   var randInt = Math.floor(Math.random() * items.length)
  //   var item = new powerupjs.SpriteGameObject(sprites.items[items[randInt]], 1, 0, ID.layer_overlays);
  //   this.itemGrid.addAt(item, row, col)
  // }
}

Inventory.prototype = Object.create(powerupjs.GameObjectList.prototype);

Inventory.prototype.draw = function () {
  powerupjs.GameObjectList.prototype.draw.call(this);

  if (this.mode === "items" && this.visible) {
    this.itemGrid.draw();
  }
};

Inventory.prototype.update = function (delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  if (
    this.itemsButton.boundingBox.contains(powerupjs.Mouse.position) &&
    powerupjs.Mouse._left.pressed
  ) {
    for (var i = 0; i < this.buttons.listLength; i++) {
      this.buttons.at(i).position.y = 175;
    }
    this.mode = "items";
    this.itemsButton.position.y = 160;
    this.frame.sprite = sprites.inventory["tabs"].slot1;
  }
  if (
    this.projectsButton.boundingBox.contains(powerupjs.Mouse.position) &&
    powerupjs.Mouse._left.pressed
  ) {
    for (var i = 0; i < this.buttons.listLength; i++) {
      this.buttons.at(i).position.y = 175;
    }
    this.mode = "projects";
    this.projectsButton.position.y = 160;
    this.frame.sprite = sprites.inventory["tabs"].slot2;
  }

  if (this.mode === "items" && this.visible) {
    this.itemGrid.update(delta);
  }

  for (var i = 0; i < this.itemGrid.listLength; i++) {
    var thing = this.itemGrid.atIndex(i);
    var sprite = thing.sprite.imgName;
    var imgInfo = sprite.split("/");
    var imgType = imgInfo[1].split("_");
    var player = powerupjs.Game.gameWorld.map.areas[
      powerupjs.Game.gameWorld.map.currentAreaIndex
    ].find(ID.player);
    if (
      thing.boundingBox.contains(powerupjs.Mouse.position) &&
      powerupjs.Mouse._left.pressed
    ) {
     

      if (imgType[1] === "seeds") {
        this.selected = "planting";
        var parts = imgType[2].split(".");
        console.log(parts[0])
        this.cropSelected = parts[0];
        this.visible = false;
        thing.visible = false;
      }
    }
  }

  if (this.selected === "planting" && this.cropSelected !== "none") {
    console.log('oasdjkf')
    var tile = new powerupjs.Vector2(
      Math.floor((player.position.x + 15) / 32) * 32,
      Math.floor((player.position.y + 20) / 32) * 32
    );
    // var placeMarker = new powerupjs.SpriteGameObject(
    //   sprites.extras["planting_marker"],
    //   1,
    //   0,
    //   ID.layer_overlays_2
    // );
    // placeMarker.position = tile;
    // placeMarker.draw();
    var terrainTiles = powerupjs.Game.gameWorld.map.areas[
      powerupjs.Game.gameWorld.map.currentAreaIndex
    ].find(ID.tiles);

    var terrainType = terrainTiles.at(
      Math.floor((player.position.x + 15) / 32),
      Math.floor((player.position.y + 20) / 32)
    ).terrainType;
    var tileSheetIndex = terrainTiles.at(
      Math.floor((player.position.x + 15) / 32),
      Math.floor((player.position.y + 20) / 32)
    ).sheetIndex
      console.log(terrainType)
    if (
      powerupjs.Keyboard.pressed(32) &&
      terrainType === "path_edge_dirt" &&
      (tileSheetIndex === 5 ||  
      tileSheetIndex === 6 ||
      tileSheetIndex === 7) && 
      terrainTiles.at(
      Math.floor((player.position.x + 15) / 32),
      Math.floor((player.position.y + 20) / 32)
    ).containsCrops === 'false'
    ) {
      alert()
      terrainTiles.at(
      Math.floor((player.position.x + 15) / 32),
      Math.floor((player.position.y + 20) / 32)
    ).containsCrops = true
      player.mode = "tending";
      player.playAnimation("tend_front");
      var objects = powerupjs.Game.gameWorld.map.areas[
        powerupjs.Game.gameWorld.map.currentAreaIndex
      ].find(ID.objects);
      var plantType = imgType[2].split(".");
      objects.add(new Crop(plantType[0], tile, 0));
      this.selected = "none";
      powerupjs.Game.gameWorld.saveObjects()
    }
  }
};

