var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PolygonUtil = require("PolygonUtil");
var r_TexturePlusBase = require("TexturePlusBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var h = _decorator.executeInEditMode;
var def_UISplitTextureBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.textureRoot = null;
    t._pic = null;
    t.splieOffset = 10;
    t.tweenTime = .1;
    t.canIncision = true;
    t.needOutLine = true;
    t.outLineWidth = 2;
    t.textures = [];
    t.dir = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "pic", {
    get: function () {
      return this._pic;
    },
    set: function (e) {
      this._pic = e;
      this.setTextureRootSpriteFrame();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onLoad = function () {
    this.setTextureRootSpriteFrame();
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.init = function () {
    this.textureRoot.width = this._pic.width;
    this.textureRoot.height = this._pic.height;
    var e = new cc.Node();
    var t = this.addTexturePlusCtrl(e);
    e.parent = this.textureRoot;
    var o = this.getComponentInChildren(cc.PolygonCollider).points.slice();
    this.orignalArea = r_PolygonUtil.PolygonUtil.calaPolygonArea(o);
    this.setTextureInfo(t, this._pic, this.textureRoot, o);
    this.textures.push(t);
  };
  _ctor.prototype.addTexturePlusCtrl = function (e) {
    return e.addComponent(r_TexturePlusBase.default);
  };
  _ctor.prototype.setTextureInfo = function (e, t, o, i) {
    e.setOutlineCfg(this.needOutLine, this.outLineWidth);
    e.setInfo(t, o, i);
  };
  _ctor.prototype.useLineCutPolygon = function (e, t, o) {
    undefined === o && (o = true);
    for (var i = this.textures.length - 1; i >= 0; i--) {
      var n = this.textures[i];
      var a = e.clone();
      var r = t.clone();
      if (o) {
        a = n.node.convertToNodeSpaceAR(e);
        r = n.node.convertToNodeSpaceAR(t);
      }
      var c = r_PolygonUtil.PolygonUtil.lineCutPolygon(a, r, n.polygon);
      c.length <= 0 || this.splitTexture(n, c, cc.v2((a.x + r.x) / 2, (a.y + r.y) / 2));
    }
    this.executeSplitAfterLogic();
  };
  _ctor.prototype.splitTexture = function (e, t, o) {
    for (var i = 1; i < t.length; i++) {
      var n = new cc.Node();
      var a = this.addTexturePlusCtrl(n);
      n.parent = this.textureRoot;
      var s = e.node.position;
      n.setPosition(s.x, s.y);
      this.setTextureInfo(a, this._pic, this.textureRoot, t[i]);
      this.textures.push(a);
      this.setSplitAfterPos(a, o);
    }
    this.setTextureInfo(e, this._pic, this.textureRoot, t[0]);
    this.setSplitAfterPos(e, o);
  };
  _ctor.prototype.setSplitAfterPos = function (e, t) {
    e.centerPos.sub(t, this.dir);
    cc.Vec2.normalize(this.dir, this.dir);
    this.dir.multiplyScalar(this.splieOffset);
    this.tweenMove(e.node, e.node.getPosition());
  };
  _ctor.prototype.executeSplitAfterLogic = function () {};
  _ctor.prototype.tweenMove = function (e, t, o) {
    cc.tween(e).to(this.tweenTime, {
      x: t.x + this.dir.x,
      y: t.y + this.dir.y
    }).call(function () {
      o && o();
    }).start();
  };
  _ctor.prototype.onStartIncision = function (e) {
    var t = e.data;
    this.useLineCutPolygon(t.startPoint, t.endPoint);
  };
  _ctor.prototype.setTextureRootSpriteFrame = function () {
    this.textureRoot.removeComponent(cc.Sprite);
  };
  __decorate([_property(cc.Node)], _ctor.prototype, "textureRoot", undefined);
  __decorate([_property({
    serializable: true
  })], _ctor.prototype, "_pic", undefined);
  __decorate([_property({
    type: cc.Texture2D,
    tooltip: "请使用自己业务的图片！"
  })], _ctor.prototype, "pic", null);
  __decorate([_property({
    displayName: "切开后弹开的距离"
  })], _ctor.prototype, "splieOffset", undefined);
  __decorate([_property({
    displayName: "切开后弹开的时间（秒）"
  })], _ctor.prototype, "tweenTime", undefined);
  __decorate([_property({
    displayName: "是否可以切割"
  })], _ctor.prototype, "canIncision", undefined);
  __decorate([_property({
    displayName: "是否需要描边"
  })], _ctor.prototype, "needOutLine", undefined);
  __decorate([_property({
    displayName: "描边宽度",
    visible: function () {
      return this.needOutLine;
    }
  })], _ctor.prototype, "outLineWidth", undefined);
  return __decorate([_ccclass, h], _ctor);
}(cc.Component);
exports.default = def_UISplitTextureBase;