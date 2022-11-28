function InteriorBounds(areaIndex) {
  powerupjs.GameObjectGrid.call(
    this,
    60,
    100,
    ID.layer_overlays,
    ID.interior_boundaries
  );
  this.cellWidth = 16;
  this.cellHeight = 16;
  this.areaIndex = areaIndex
  this.loadTiles()
}

InteriorBounds.prototype = Object.create(powerupjs.GameObjectGrid.prototype)


InteriorBounds.prototype.loadTiles = function () {
  if (localStorage.interiorBoundaries !== undefined) {
    var tileCode = localStorage.interiorBoundaries;
    var areaCodes = tileCode.split("|")
    for (var i=0; i<areaCodes.length; i++) {
      if (areaCodes[i] === this.areaIndex) {  // Find the current area...
        var area = areaCodes[i + 1]  // And use the next part of the array, which is the code
      }
    }
    var codeArray = area.split(",");  ;// Format: |#|#/#/#/#,#/#/#/#, ...
    for (var i=0; i<codeArray.length - 1; i++) {  
      var code = codeArray[i].split('/');
      var x = parseInt(code[0]);  // X index 
      var y = parseInt(code[1]);  // Y index
 
      var t = new Boundary(new powerupjs.Vector2(x, y))
      t.position = new powerupjs.Vector2(
        x * this.cellWidth,
        y * this.cellHeight
      );  
      this.addAt(t, x, y);
    }
  }
};

