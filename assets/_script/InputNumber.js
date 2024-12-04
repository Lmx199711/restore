var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_InputNumber = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.inputLabel = null;
    t.inputLine = null;
    t.maxLine = 7;
    t.inputLayer = null;
    t.numPrefab = null;
    t.numWith = 61.18;
    t.curNumber = 0;
    t.inputNumList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.initInputStartPos = cc.v2(this.numPrefab.x, this.numPrefab.y);
    this.showInputLabel();
    this.showInputLineAnim();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.onClickNumber = function (e, t) {
    r_SoundMgr.SoundMgr.playSound("click");
    console.log("input " + t);
    var o = parseInt(t);
    if (o >= 0 && o <= 9) {
      if (this.inputNumList.length >= this.maxLine) {
        return void r_UtilsSystem.UtilsSystem.showTip("超过最大长度");
      }
      this.inputNumList.push(o);
    } else if (10 == o) {
      this.inputNumList.splice(this.inputNumList.length - 1, 1);
    } else if (11 == o) {
      this.node.active = false;
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith("countMoneyInput", this.getInputNumber());
    }
    this.showInputLabel();
  };
  _ctor.prototype.showInputLabel = function () {
    this.inputLayer.removeAllChildren();
    var e = "";
    for (var t = 0; t < this.inputNumList.length; t++) {
      e += this.inputNumList[t];
      var o = cc.instantiate(this.numPrefab);
      o.active = true;
      o.getComponent(cc.Label).string = "" + this.inputNumList[t];
      o.x = this.initInputStartPos.x + this.numWith * t;
      o.y = this.initInputStartPos.y;
      this.inputLayer.addChild(o);
    }
    this.inputLine.x = this.initInputStartPos.x + this.numWith * this.inputNumList.length + 20;
    if (e.length > 0) {
      this.curNumber = parseInt(e);
    } else {
      this.curNumber = 0;
    }
  };
  _ctor.prototype.getInputNumber = function () {
    return this.curNumber;
  };
  _ctor.prototype.showInputLineAnim = function () {
    cc.Tween.stopAllByTarget(this.inputLine);
    cc.tween(this.inputLine).repeatForever(cc.tween().to(.5, {
      opacity: 255
    }).to(.5, {
      opacity: 0
    })).start();
  };
  __decorate([_property({
    type: cc.Label,
    displayName: "输入的数字"
  })], _ctor.prototype, "inputLabel", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "输入数字后边竖线"
  })], _ctor.prototype, "inputLine", undefined);
  __decorate([_property({
    type: cc.Integer,
    displayName: "最大输入长度"
  })], _ctor.prototype, "maxLine", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "输入数字输入父节点"
  })], _ctor.prototype, "inputLayer", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "输入的数字prefab"
  })], _ctor.prototype, "numPrefab", undefined);
  __decorate([_property({
    type: Number,
    displayName: "最大输入长度"
  })], _ctor.prototype, "numWith", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_InputNumber;