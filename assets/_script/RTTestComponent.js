var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_RTTestComponent = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.start = function () {
    var e = this;
    if (!this.rtCamera.getComponent(cc.Camera).targetTexture) {
      var t = new cc.RenderTexture();
      t.initWithSize(cc.winSize.width, cc.winSize.height);
      this.rtCamera.getComponent(cc.Camera).targetTexture = t;
    }
    this.sprit.spriteFrame.setTexture(this.rtCamera.getComponent(cc.Camera).targetTexture);
    this.sprit.node.scaleY = -1;
    this.sprit.node.width = cc.winSize.width;
    this.sprit.node.height = cc.winSize.height;
    var o = false;
    this.drawNode.active = false;
    this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
      o = true;
      e.drawNode.active = true;
      var i = t.getLocation();
      i = e.drawNode.parent.convertToNodeSpaceAR(i);
      e.drawNode.x = i.x;
      e.drawNode.y = i.y;
    });
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      if (o) {
        var i = t.getLocation();
        i = e.drawNode.parent.convertToNodeSpaceAR(i);
        e.drawNode.x = i.x;
        e.drawNode.y = i.y;
      }
    });
    this.node.on(cc.Node.EventType.TOUCH_END, function () {
      o = false;
      e.drawNode.active = false;
    });
  };
  _ctor.prototype.onClickClear = function () {
    var e = this;
    var t = false;
    this.node.off(cc.Node.EventType.TOUCH_START);
    this.node.off(cc.Node.EventType.TOUCH_MOVE);
    this.node.off(cc.Node.EventType.TOUCH_END);
    this.node.on(cc.Node.EventType.TOUCH_START, function (o) {
      t = true;
      var i = o.touch.getLocation();
      i = e.mask.node.convertToNodeSpaceAR(i);
      e._addCircle(i);
    });
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (o) {
      if (t) {
        var i = o.touch.getLocation();
        i = e.mask.node.convertToNodeSpaceAR(i);
        e._addCircle(i);
      }
    });
    this.node.on(cc.Node.EventType.TOUCH_END, function () {
      t = false;
      e.drawNode.active = false;
    });
  };
  _ctor.prototype._addCircle = function (e) {
    var t = this.mask;
    t._graphics.lineWidth = 1;
    t._graphics.strokeColor = cc.color(255, 0, 0);
    t._graphics.fillColor = cc.color(0, 255, 0);
    t._graphics.rect(e.x, e.y, 100, 100);
    t._graphics.fill();
    t._graphics.stroke();
  };
  _ctor.prototype.setMaskTexture = function () {
    this.maskMat.setProperty("maskTexture", this.maskTexture);
  };
  __decorate([_property({
    type: cc.Texture2D
  })], _ctor.prototype, "maskTexture", undefined);
  __decorate([_property({
    type: cc.Material
  })], _ctor.prototype, "maskMat", undefined);
  __decorate([_property({
    type: cc.Sprite
  })], _ctor.prototype, "sprit", undefined);
  __decorate([_property({
    type: cc.Node
  })], _ctor.prototype, "rtCamera", undefined);
  __decorate([_property({
    type: cc.Node
  })], _ctor.prototype, "drawNode", undefined);
  __decorate([_property({
    type: cc.Mask,
    tooltip: "mask"
  })], _ctor.prototype, "mask", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_RTTestComponent;