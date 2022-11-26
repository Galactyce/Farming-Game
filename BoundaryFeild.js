function BoundaryFeild(areaIndex) {
  powerupjs.GameObjectGrid.call(
    this,
    60,
    100,
    ID.layer_overlays,
    ID.boundaries
  );
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.areaIndex = areaIndex
  this.loadTiles()
}

BoundaryFeild.prototype = Object.create(powerupjs.GameObjectGrid.prototype)


BoundaryFeild.prototype.loadTiles = function () {
  if (localStorage.boundaryTiles !== undefined) {
    var tileCode = localStorage.boundaryTiles;
    var areaCodes = tileCode.split("|")
    var area = areaCodes[(this.areaIndex + 1) * 2]

    var codeArray = area.split(",");
    for (var i=0; i<codeArray.length - 1; i++) {
      var code = codeArray[i].split('/');
      var x = parseInt(code[0]);
      var y = parseInt(code[1]);
 
      var t = new Boundary(new powerupjs.Vector2(x, y))
      t.position = new powerupjs.Vector2(
        x * this.cellWidth,
        y * this.cellHeight
      );
      this.addAt(t, x, y);
    }
  }
};

