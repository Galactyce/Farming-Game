function Area(index) {
  powerupjs.GameObjectList.call(this, ID.layer_objects);
  this.index = index
  this.add(new TileField(index))
  this.add(new BoundaryFeild(index))


  this.add(new ObjectFeild(index))

  this.add(new FrontTileField(index))
  this.add(new TerrainEditor(index))
  this.add(new BoundaryEditor(index))

}

Area.prototype = Object.create(powerupjs.GameObjectList.prototype)