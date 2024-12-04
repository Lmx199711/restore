var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_RTMaskComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.drawDelta = 0;
    t.drawTime = 0;
    t.isDrawBg = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e;
    var t;
    if (!this.rtCamera.getComponent(cc.Camera).targetTexture) {
      var o = new cc.RenderTexture();
      o.initWithSize(cc.winSize.width, cc.winSize.height);
      this.rtCamera.getComponent(cc.Camera).targetTexture = o;
      e = new cc.SpriteFrame();
    }
    if (!this.tempBgRt) {
      this.tempBgRt = new cc.RenderTexture();
      this.tempBgRt.initWithSize(cc.winSize.width, cc.winSize.height);
      t = new cc.SpriteFrame();
    }
    if (!this.tempRt) {
      this.tempRt = new cc.RenderTexture();
      this.tempRt.initWithSize(cc.winSize.width, cc.winSize.height);
    }
    this.sprit.spriteFrame = e;
    this.sprit.spriteFrame.setTexture(this.rtCamera.getComponent(cc.Camera).targetTexture);
    this.sprit.node.width = cc.winSize.width;
    this.sprit.node.height = cc.winSize.height;
    window.testSp = this.sprit;
    this.spritBg.spriteFrame = t;
    this.spritBg.spriteFrame.setTexture(this.tempBgRt);
    this.spritBg.node.width = cc.winSize.width;
    this.spritBg.node.height = cc.winSize.height;
    this.canAddPic = false;
  };
  _ctor.prototype.setMaskTexture = function () {
    this.maskMat.setProperty("maskTexture", this.maskTexture);
  };
  _ctor.prototype.unregistTouch = function () {
    this.node.off(cc.Node.EventType.TOUCH_START);
    this.node.off(cc.Node.EventType.TOUCH_MOVE);
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.unregistTouch();
    var t = false;
    this.drawNode.active = false;
    this.node.on(cc.Node.EventType.TOUCH_START, function () {
      t = true;
      e.checkPoint();
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function () {
      t && e.checkPoint();
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_END, function () {
      t = false;
      e.drawNode.active = false;
    });
  };
  _ctor.prototype.clearRT = function () {
    this.rtCamera.getComponent(cc.Camera).clearFlags = cc.Camera.ClearFlags.COLOR;
    this.rtCamera.getComponent(cc.Camera).render();
    this.rtCamera.getComponent(cc.Camera).clearFlags = 0;
  };
  _ctor.prototype.cleraBg = function () {
    var e = this.rtCamera.getComponent(cc.Camera);
    var t = e.targetTexture;
    e.clearFlags = cc.Camera.ClearFlags.COLOR;
    e.targetTexture = this.tempBgRt;
    this.rtCamera.getComponent(cc.Camera).render();
    this.rtCamera.getComponent(cc.Camera).clearFlags = 0;
    e.targetTexture = t;
  };
  _ctor.prototype.drawBg = function () {
    var e = this.rtCamera.getComponent(cc.Camera);
    var t = e.targetTexture;
    this.spritBg.node.group = "renderTexture";
    e.targetTexture = this.tempRt;
    this.spritBg.spriteFrame.setTexture(this.tempRt);
    e.render();
    this.spritBg.node.group = "default";
    e.targetTexture = t;
  };
  _ctor.prototype.startAddPic = function (e, t) {
    this.headPoint = e;
    this.polygonNode = t;
  };
  _ctor.prototype.startDraw = function () {
    this.drawNode.active && this.drawNode.active;
  };
  _ctor.prototype.checkPoint = function () {
    if (this.canAddPic && !(Date.now() - this.drawTime < this.drawDelta)) {
      var e = this.headPoint.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var t = this.polygonNode.convertToNodeSpaceAR(e);
      var o = this.polygonNode.getComponent(cc.PolygonCollider);
      if (this.headPoint.active && cc.Intersection.pointInPolygon(t, o.points)) {
        this.drawTime = Date.now();
        this.drawNode.active = true;
        var i = this.drawNode.parent.convertToNodeSpaceAR(e);
        this.drawBg();
        this.isDrawBg;
        this.drawNode.x = i.x;
        this.drawNode.y = i.y;
      }
    }
  };
  _ctor.prototype.setSprite = function () {};
  _ctor.prototype.setCanAddPic = function (e) {
    this.canAddPic = e;
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
    type: cc.Sprite
  })], _ctor.prototype, "spritBg", undefined);
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
  __decorate([_property({
    type: cc.Integer
  })], _ctor.prototype, "drawDelta", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_RTMaskComponent;