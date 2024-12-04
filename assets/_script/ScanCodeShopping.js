var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemValue = undefined;
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_ItemValue = function () {
  function _ctor() {
    this.itemNode = null;
    this.itemValuea = "";
    this.putSoundName = "";
    this.putAction = "";
    this.putTriggerOneTime = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "物品节点"
  })], _ctor.prototype, "itemNode", undefined);
  __decorate([_property({
    type: String,
    displayName: "售价"
  })], _ctor.prototype, "itemValuea", undefined);
  __decorate([_property({
    type: String,
    tooltip: "放置的音效名称"
  })], _ctor.prototype, "putSoundName", undefined);
  __decorate([_property({
    tooltip: "放上后触发的action"
  })], _ctor.prototype, "putAction", undefined);
  __decorate([_property({
    tooltip: "放上action是否只触发一次"
  })], _ctor.prototype, "putTriggerOneTime", undefined);
  return __decorate([_ccclass("ItemValue")], _ctor);
}();
exports.ItemValue = exp_ItemValue;
var def_ScanCodeShopping = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.anim = null;
    t.bg = null;
    t.lab = null;
    t.itemList = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    _ref__ctor.Inst = this;
    this.bg.scale = .1;
    this.bg.opacity = 0;
  };
  _ctor.prototype.isShowShopping = function (e) {
    var t = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
    if (r_UtilsSystem.UtilsSystem.touchInNode(this.node, t)) {
      var o = 0;
      for (var i = this.itemList; o < i.length; o++) {
        var n = i[o];
        if (e == n.itemNode) {
          this.shoppingAnimation(n);
          break;
        }
      }
    }
  };
  _ctor.prototype.shoppingAnimation = function (e) {
    var t = this;
    if (!this.anim) {
      "" != e.putSoundName && r_SoundMgr.SoundMgr.playSound(e.putSoundName);
      if ("" != e.putAction) {
        r_TriggerActionMgr.TriggerActionMgr.trigger(e.putAction);
        e.putTriggerOneTime && (e.putAction = "");
      }
      this.lab.string != e.itemValuea.toString() && (this.lab.string = e.itemValuea.toString());
      var o = cc.tween().to(.2, {
        scale: 1,
        opacity: 255
      });
      var i = cc.tween().delay(1).to(.3, {
        opacity: 0
      });
      var n = cc.tween().to(.01, {
        scale: .1
      });
      this.anim = cc.tween(this.bg).then(o).then(i).then(n).call(function () {
        t.anim = null;
      }).start();
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "文本背景"
  })], _ctor.prototype, "bg", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "文本"
  })], _ctor.prototype, "lab", undefined);
  __decorate([_property({
    type: [exp_ItemValue],
    displayName: "物品和售价"
  })], _ctor.prototype, "itemList", undefined);
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ScanCodeShopping;