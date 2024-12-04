Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragObject = undefined;
var r_CommonFunc = require("CommonFunc");
var exp_DragObject = function () {
  function _ctor(e, t) {
    undefined === t && (t = null);
    this.opNode = null;
    this.initX = 0;
    this.initY = 0;
    this.opNode = e;
    this.targets = t;
    this.initX = this.opNode.x;
    this.initY = this.opNode.y;
  }
  _ctor.prototype.move = function (e, t) {
    this.opNode.x += e;
    this.opNode.y += t;
  };
  _ctor.prototype.placed = function (e, t) {
    undefined === t && (t = true);
    if (this.targets) {
      var o = r_CommonFunc.findPlaceTarget(e, this.targets);
      if (o) {
        if (o.placeNode) {
          this.opNode.parent = o.placeNode;
          this.opNode.x = 0;
          this.opNode.y = 0;
        }
        if (o.changeSize) {
          this.opNode.scaleX = o.placeSize.x;
          this.opNode.scaleY = o.placeSize.y;
        }
        o.successBehaviors && o.successBehaviors.execute();
      }
      return o;
    }
    t && this.reseToStart();
    return null;
  };
  _ctor.prototype.reseToStart = function () {
    this.opNode.x = this.initX;
    this.opNode.y = this.initY;
  };
  return _ctor;
}();
exports.DragObject = exp_DragObject;