function ObjectFeild(areaIndex) {
  powerupjs.GameObjectList.call(this, ID.layer_objects, ID.objects);
  this.areaIndex = areaIndex;
  this.loadObjects();
}

ObjectFeild.prototype = Object.create(powerupjs.GameObjectList.prototype);

ObjectFeild.prototype.loadObjects = function () {
  if (localStorage.objects !== undefined) {
    var tileCode = localStorage.objects;
    var areaCodes = tileCode.split("|");
    var area = areaCodes[(this.areaIndex + 1) * 2];
    var codeArray = area.split(",");
    for (var i = 0; i < codeArray.length - 1; i++) {
      var code = codeArray[i].split("/");
      if (code[0] === "undefined") continue;
      var type = code[0];
      console.log(code);
      if (type === "nature") {
        var sprite = code[1];
        var x = parseInt(code[2]);
        var y = parseInt(code[3]);
        var t = new NatureDecoration(sprite, new powerupjs.Vector2(x, y));
        t.position = new powerupjs.Vector2(x * 16, y * 16);
        this.add(t);
      } else if (type === "flower") {
        console.log(code)
        var sprite = code[1];
        var sheetIndex = parseInt(code[2]);
        var x = parseInt(code[3]);
        var y = parseInt(code[4]);
        var t = new Flower(sprite, new powerupjs.Vector2(x, y), sheetIndex);
        t.position = new powerupjs.Vector2(x * 16, y * 16);
        this.add(t);
      }
      else if (type === 'wall') {
        console.log(code)
        var sprite = code[1];
        var sheetIndex = parseInt(code[2]);
        var x = parseInt(code[3]);
        var y = parseInt(code[4]);
        var t = new Wall(sprite, new powerupjs.Vector2(x, y), sheetIndex);
        t.position = new powerupjs.Vector2(x * 16, y * 16);
        this.add(t)
      }
    }
  }
};
