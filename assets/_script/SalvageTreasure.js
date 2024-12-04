var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ResSystem = require("ResSystem");
var r_SalvageFlaw = require("SalvageFlaw");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_SalvageTreasure = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.icon = null;
    t.iconMask = null;
    t.initPrice = 2e4;
    t.flaws = [];
    t.price = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    var e = this;
    this.flaws = [];
    this.node.getChildByName("flaws").children.forEach(function (t) {
      e.flaws.push(t.getComponent(r_SalvageFlaw.default));
    });
    this.showFlaw();
  };
  _ctor.prototype.findSucc = function (e) {
    this.price += e.price;
    e.showTip();
  };
  _ctor.prototype.showFlaw = function () {
    return this.flaws.length > 0 && (this.flaws[0].node.active = true, true);
  };
  _ctor.prototype.setData = function (e) {
    this.m_data = e;
    this.initPrice = this.m_data.initPrice;
    this.price = this.m_data.initPrice;
  };
  _ctor.prototype.loadSprite = function (e) {
    var t = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "salvage/icon/icon" + e, cc.SpriteFrame, function (e, o) {
      t.icon.spriteFrame = o;
    });
  };
  _ctor.prototype.loadMask = function (e) {
    var t = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "salvage/icon/mask" + e, cc.SpriteFrame, function (e, o) {
      t.iconMask.spriteFrame = o;
    });
  };
  __decorate([_property(cc.Sprite)], _ctor.prototype, "icon", undefined);
  __decorate([_property(cc.Sprite)], _ctor.prototype, "iconMask", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SalvageTreasure;