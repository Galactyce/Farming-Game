function ObjectFeild(areaIndex) {
  powerupjs.GameObjectList.call(this, ID.layer_objects, ID.objects);
  this.areaIndex = areaIndex
}

ObjectFeild.prototype = Object.create(powerupjs.GameObjectList.prototype)