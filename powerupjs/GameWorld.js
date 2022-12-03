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

  this.currentInteriorArea = "none";
  this.specialMode = "none";
  this.saveDate = Date.now();

  this.loadInteriors();
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

GameWorld.prototype.loadInteriors = function () {
  //  localStorage.clear()
  var barn1 = new InteriorArea(
    "barn",
    new powerupjs.Vector2(700, 540),
    new powerupjs.Rectangle(300, 600, 500, 20)
  );

    console.log(localStorage.machines)

  if (localStorage.machines !== undefined) {
    var fullCode = localStorage.machines;
    var splitCode = fullCode.split("|");
    console.log(splitCode.length)
    for (var i = 0; i < splitCode.length; i++) {
      if (splitCode[i] === "barn") {
        var areaCodes = splitCode[i + 1].split("/");
        console.log(areaCodes.length)


        for (var k = 0; k < areaCodes.length; k++) {
          var code = areaCodes[k].split(",");
          console.log(code)
          if (code[1] === "water") {
            var trough = new Trough(
              new powerupjs.Vector2(parseInt(code[5]), parseInt(code[6])),
              code[1],
              code[2],
              "barn"
            );
            trough.capacity = parseInt(code[3]);
            trough.remaining = parseInt(code[4]);
            barn1.machines.add(trough);
          } else if (code[1] === "food") {
            var trough2 = new Trough(
              new powerupjs.Vector2(parseInt(code[5]), parseInt(code[6])),
              code[1],
              code[2],
              "barn"
            );
            trough2.capacity = parseInt(code[3]);
            trough2.remaining = parseInt(code[4]);
            barn1.machines.add(trough2);
          }
          if (code[1] === 'butter') {
            console.log(code)
          var butter_churn =  new Machine(
            new powerupjs.Vector2(600, 300),
            "butter_churn",
            0,
            "butter",
            "milk",
            parseInt(code[8]),
            parseInt(code[9])
          )
          butter_churn.productionDate = parseInt(code[3])
          butter_churn.containing = parseInt(code[5])
          if (code[4] === 'true'){
          butter_churn.producing = true;
      }
          barn1.machines.add(
           butter_churn
          );
        }
        if (code[1] === 'goatcheese') {
          var goat_cheese_press = new Machine(
            new powerupjs.Vector2(660, 260),
            "goat_cheese_press",
            0,
            "goatcheese",
            "goatmilk",
            parseInt(code[8]),
            parseInt(code[9])
          )

          goat_cheese_press.productionDate = parseInt(code[3])
          goat_cheese_press.containing = parseInt(code[5])
          if (code[4] === 'true'){
          goat_cheese_press.producing = true;
      }
          barn1.machines.add(
           goat_cheese_press
          );
        }
        if (code[1] === 'cheese') {
          var cheese_press = new Machine(
            new powerupjs.Vector2(780, 260),
            "cheese_press",
            0,
            "cheese",
            "milk",
            parseInt(code[8]),
            parseInt(code[9])
          )

          cheese_press.productionDate = parseInt(code[3])
          cheese_press.containing = parseInt(code[5])
          if (code[4] === 'true'){
          cheese_press.producing = true;
      }
          barn1.machines.add(
           cheese_press
          );
        }
        if (code[1] === 'mozzerelacheese') {
          var mozzerela_cheese_press = new Machine(
            new powerupjs.Vector2(720, 260),
            "mozzerela_cheese_press",
            0,
            "mozzerelacheese",
            "milk",
            parseInt(code[8]),
            parseInt(code[9])
          )

          mozzerela_cheese_press.productionDate = parseInt(code[3])
          mozzerela_cheese_press.containing = parseInt(code[5])
          if (code[4] === 'true'){
          mozzerela_cheese_press.producing = true;
      }
          barn1.machines.add(
           mozzerela_cheese_press
          );
        }
        }
      }
      continue
    }
    console.log(barn1.machines)
    
  }
  else {
      var trough = new Trough(
        new powerupjs.Vector2(400, 360),
        'food',
        'cow',
        "barn"
      );
      barn1.machines.add(trough);
      trough2 = new Trough(
        new powerupjs.Vector2(500, 360),
        'water',
        'cow',
        "barn"
      );
     
      barn1.machines.add(trough2);
    
    barn1.machines.add(
      new Trough(
        new powerupjs.Vector2(870, 360),
        "water",
        "goats",
        "barn"
      )
    );
    barn1.machines.add(
      new Trough(new powerupjs.Vector2(970, 360), "food", "goats", "barn")
    );
  
    barn1.machines.add(
      new Machine(
        new powerupjs.Vector2(600, 300),
        "butter_churn",
        0,
        "butter",
        "milk",
        1,
        600000
      )
    );
    barn1.machines.add(
      new Machine(
        new powerupjs.Vector2(660, 260),
        "goat_cheese_press",
        0,
        "goatcheese",
        "goatmilk",
        2,
        1500000
      )
    );
    barn1.machines.add(
      new Machine(
        new powerupjs.Vector2(780, 260),
        "cheese_press",
        0,
        "cheese",
        "milk",
        2,
        900000
      )
    );
    barn1.machines.add(
      new Machine(
        new powerupjs.Vector2(720, 260),
        "mozzerela_cheese_press",
        0,
        "mozzerelacheese",
        "milk",
        3,
        2100000
      )
    );
  }
  barn1.add(
    new Animal(
      "cow",
      0,
      new powerupjs.Rectangle(450, 450, 300, 100),
      "milk"
    )
  );
  barn1.add(
    new Animal(
      "goat",
      0,
      new powerupjs.Rectangle(450, 450, 300, 100),
      "goatmilk"
    )
  );
  this.interiors.push(barn1);

};

GameWorld.prototype.saveMachines = function () {
  var fullString = "";
  console.log(fullString)
  localStorage.machines = undefined
  for (var i = 0; i < this.interiors.length; i++) {
    var areaString = "|" + this.interiors[i].type + "|";
    var interior = this.interiors[i];

    console.log(interior.machines)

    for (var k = 0; k < interior.machines.gameObjects.length; k++) {
      var object = interior.machines.gameObjects[k];
     
      if (object.machineType === "machine") {
        var string =
          object.area +
          "," +
          object.produce +
          "," +
          object.level +
          "," +
          object.productionDate +
          "," +
          object.producing +
          "," +
          object.containing +
          "," +
          object.produceReady +
          "," +
          object.requireType +
          "," +
          object.requireAmount +
          "," +
          object.productionTime + 
          "/";
      } else if (object.machineType === "trough") {
        var string =
          object.areaIndex +
          "," +
          object.type +
          "," +
          object.animalType +
          "," +
          object.capacity +
          "," +
          object.remaining +
          "," +
          object.position.x + 
          "," + 
          object.position.y + 
          "/";
      }
      console.log(string);
      areaString += string;
    }

    fullString += areaString;
    console.log(areaString)
  }
  console.log(fullString);

  localStorage.machines = fullString;
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

  if (Date.now() > this.saveDate + 20000) {
    this.saveMachines();
    this.saveDate = Date.now()
  }

  if (powerupjs.Keyboard.pressed(69) && this.map.mode === "playing") {
    this.inventory.visible = !this.inventory.visible;
    this.specialMode === "none";
  }
  if (powerupjs.Keyboard.pressed(65)) {
    this.map.mode = "playing";
    var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
    for (var i = 0; i < tiles.gameObjects.length; i++) {
      tiles.gameObjects[i].visible = true;
    }
  }
  if (powerupjs.Keyboard.pressed(83)) {
    if (this.currentInteriorArea === "none") {
      this.map.mode = "boundary_editing";
      var tiles = this.map.areas[this.map.currentAreaIndex].find(ID.tiles);
      for (var i = 0; i < tiles.gameObjects.length; i++) {
        tiles.gameObjects[i].visible = true;
      }
    } else {
      this.specialMode = "interior_boundary_editing";
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
