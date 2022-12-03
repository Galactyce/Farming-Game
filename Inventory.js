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
  if (localStorage.inventory === undefined) {
  for (var i=0; i<5; i++) {
    var col = Math.floor(i / this.itemGrid.columns);
    var row = i % this.itemGrid.columns;
    var item = new powerupjs.SpriteGameObject(sprites.items['wheat_plant'], 1, 0, ID.layer_overlays);
    this.itemGrid.addAt(item, row, col)
  }
}
this.load()
}

Inventory.prototype = Object.create(powerupjs.GameObjectList.prototype);

Inventory.prototype.load = function() {
  var inventoryInfo = localStorage.inventory;
  if (inventoryInfo !== undefined) {
  var items = inventoryInfo.split(",")
  for (var i=0; i<items.length - 1; i++) {
    var col = Math.floor(i / this.itemGrid.columns);
    var row = i % this.itemGrid.columns;
    if (items[i] !== 'null' && items[i] !== 'undefined') {
      var imgInfo = items[i].split("/");
      // var imgType = imgInfo[1].split("_"); // Splits the image file name into sections
      var name = imgInfo[1].split('.')
    var item = new powerupjs.SpriteGameObject(
      sprites.items['wheat_plant'],
      1,
      0,
      ID.layer_overlays
    )
    item.sprite.imgName = items[i]
    this.itemGrid.addAt(item, row, col)

    }
  }
}
}

Inventory.prototype.save = function() {
  var fullString = ""
  for (var i=0; i<this.itemGrid.gridLength; i++) {
    
    var item = this.itemGrid.atIndex(i)
    var string = ""
    console.log(item)
    if (item === null || item === undefined) {
      string = null
    }
    else {
    string = item.sprite.imgName
    }
    fullString += string + ","
  }
  localStorage.inventory = fullString
}


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
      this.buttons.at(i).position.y = 175; // Reset icon positions
    }
    this.mode = "items";
    this.itemsButton.position.y = 160; // Change item icon position
    this.frame.sprite = sprites.inventory["tabs"].slot1;
  }
  if (
    this.projectsButton.boundingBox.contains(powerupjs.Mouse.position) &&
    powerupjs.Mouse._left.pressed
  ) {
    for (var i = 0; i < this.buttons.listLength; i++) {
      this.buttons.at(i).position.y = 175; // Reset icon positions
    }
    this.mode = "projects";
    this.projectsButton.position.y = 160; // Change projects icon position
    this.frame.sprite = sprites.inventory["tabs"].slot2;
  }

  if (this.mode === "items" && this.visible) {
    this.itemGrid.update(delta);
  }
  var player = powerupjs.Game.gameWorld.map.areas[
    powerupjs.Game.gameWorld.map.currentAreaIndex
  ].find(ID.player);
  for (var i = 0; i < this.itemGrid.gridLength; i++) {
    var thing = this.itemGrid.atIndex(i);
    if (thing === null || thing === undefined) continue;
    if (thing.sprite === null || thing.sprite === undefined) continue;
    var sprite = thing.sprite.imgName;
    var imgInfo = sprite.split("/");
    var imgType = imgInfo[1].split("_"); // Splits the image file name into sections

    if (
      thing.boundingBox.contains(powerupjs.Mouse.position) &&
      powerupjs.Mouse._left.pressed
    ) {
      console.log(imgType);
      if (imgType[1] === "seeds") {
        this.selected = "planting";
        var parts = imgType[2].split("."); // 2 objects in list: imgName & ".png"
        this.cropSelected = parts[0]; // Extracts crop name by file name
        this.visible = false; // Hide inventory
        thing.visible = false; // Hide seed packet
        this.itemGrid.gameObjects[i] = null; // Set the item to null
        break;
      }
    }
  }

  if (this.selected === "planting" && this.cropSelected !== "none") {
    var tile = new powerupjs.Vector2(
      Math.floor((player.position.x + 15) / 32) * 32,
      Math.floor((player.position.y + 20) / 32) * 32
    ); // Place of tile
    var terrainTiles = powerupjs.Game.gameWorld.map.areas[
      powerupjs.Game.gameWorld.map.currentAreaIndex
    ].find(ID.tiles);
    var tileIndex = terrainTiles.at(
      Math.floor((player.position.x + 15) / 32),
      Math.floor((player.position.y + 20) / 32)
    )
    var terrainType = tileIndex.terrainType; // Dirt? Path? Normal?
   
    var tileSheetIndex = tileIndex.sheetIndex
  
    if (
      powerupjs.Keyboard.pressed(32) &&
      terrainType === "path_edge_dirt" &&
      (tileSheetIndex === 5 || // Is the tile solid dirt?
        tileSheetIndex === 6 || // Is the tile solid dirt?
        tileSheetIndex === 7) && // Is the tile solid dirt?
      tileIndex.containsCrops === "false"
    ) {
      tileIndex.containsCrops = "true";
      player.mode = "tending";
      player.playAnimation("tend_front");
      var objects = powerupjs.Game.gameWorld.map.areas[
        powerupjs.Game.gameWorld.map.currentAreaIndex
      ].find(ID.objects);

      objects.add(new Crop(this.cropSelected, tile, 0));
      this.selected = "none";
      powerupjs.Game.gameWorld.saveObjects();
      // Save the crop to objects
      powerupjs.Game.gameWorld.map.areas[
        powerupjs.Game.gameWorld.map.currentAreaIndex
      ].terrainEditor.save();
      // Save the tile as containing crops
    }
  }
};
