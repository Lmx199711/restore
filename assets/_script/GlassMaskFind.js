var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ShowEffectBase = require("ShowEffectBase");
var r_FindReplaceDiff = require("FindReplaceDiff");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_GlassMaskFind = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.effectNode = null;
    t.mediator = null;
    t._hadFind = false;
    t._canClick = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.SetMediator = function (e) {
    this.mediator = e.getComponent(r_FindReplaceDiff.default);
  };
  _ctor.prototype.mediatorSend = function () {
    this.mediator.handleScore();
  };
  _ctor.prototype.IsFinish = function () {
    return this._hadFind;
  };
  _ctor.prototype.MakeCanClick = function (e) {
    undefined === e && (e = true);
    this._canClick = e;
  };
  _ctor.prototype.show = function () {
    if (!this._hadFind && this._canClick) {
      this._hadFind = true;
      r_SoundMgr.SoundMgr.playSound("win");
      this.node.children.forEach(function (e) {
        if (e.getComponent(cc.Mask)) {
          var t = e.getComponent(cc.Mask);
          t.inverted && (t.node.active = false);
          t.enabled = false;
        }
      });
      this._canClick = false;
      this.effectNode.handleArg({
        callback: function () {
          cc.log("完成回调");
        }
      });
    }
  };
  _ctor.prototype.forceShow = function () {
    this.effectNode.handleArg({
      callback: function () {
        cc.log("完成回调");
      }
    });
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function () {};
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.onDisable = function () {};
  __decorate([_property({
    displayName: "特效节点",
    type: r_ShowEffectBase.default
  })], _ctor.prototype, "effectNode", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_GlassMaskFind;