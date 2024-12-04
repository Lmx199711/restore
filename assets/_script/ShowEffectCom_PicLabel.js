var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowEffectCom_PicLabel = undefined;
var r_IPicLabel = require("IPicLabel");
var _decorator = cc._decorator;
_decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var u = function () {
  function e() {
    this.numStr = "";
    this.numPng = null;
  }
  __decorate([_property({
    displayName: "字符代号",
    tooltip: "01234556789-+等"
  })], e.prototype, "numStr", undefined);
  __decorate([_property({
    displayName: "字符图片",
    type: cc.SpriteFrame
  })], e.prototype, "numPng", undefined);
  return __decorate([_ccclass("PicNumAltas")], e);
}();
var exp_ShowEffectCom_PicLabel = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.distance = .1;
    t.isKeepNegative = false;
    t.isKeepPositive = false;
    t.altasMap = [];
    t.prefabMap = {};
    t.wordMapList = {};
    t.curWordList = [];
    t.lastString = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    for (var e = 0; e < this.altasMap.length; e++) {
      var t = this.altasMap[e];
      var o = t.numStr;
      var i = t.numPng;
      if ((this.isKeepNegative || "-" != o) && (this.isKeepPositive || "+" != o)) {
        this.prefabMap[o] = i;
        this.wordMapList[o] = [];
      }
    }
    console.log("图片数字集长度:" + Object.keys(this.prefabMap).length);
  };
  _ctor.prototype.AcFun = function (e, t) {
    this.setString(t);
  };
  _ctor.prototype.getWord = function (e) {
    var t = null;
    var o = this.wordMapList[e];
    if (o.length > 0) {
      t = o.pop();
    } else {
      (t = new cc.Node()).addComponent(cc.Sprite);
      t.getComponent(cc.Sprite).spriteFrame = this.prefabMap[e];
      t.active = true;
      t.charString = e;
      this.node.addChild(t);
    }
    t.active = true;
    return t;
  };
  _ctor.prototype.setString = function (e) {
    if (this.lastString != e) {
      this.lastString = e;
      for (var t = 0; t < this.curWordList.length; t++) {
        (a = this.curWordList[t]).active = false;
        this.wordMapList[a.charString].push(a);
      }
      "-" !== e[0] && this.prefabMap["+"] && (e = "+" + e);
      this.curWordList = [];
      var o = 0;
      for (t = 0; t < e.length; t++) {
        o += (a = this.getWord(e[t])).width;
        this.curWordList.push(a);
      }
      var i = -o / 2;
      var n = Math.floor(e.length / 2);
      for (t = 0; t < this.curWordList.length; t++) {
        var a;
        (a = this.curWordList[t]).setPosition(i + a.width / 2, 0, 0);
        i += a.width;
        if (e.length >= 4) {
          var s = this.distance * (t - n);
          t - n > 0 && (s *= -3);
          i += s;
        }
      }
    }
  };
  __decorate([_property({
    displayName: "长度超过4时，间隔缩小值"
  })], _ctor.prototype, "distance", undefined);
  __decorate([_property({
    displayName: "是否保留负号"
  })], _ctor.prototype, "isKeepNegative", undefined);
  __decorate([_property({
    displayName: "是否保留正号"
  })], _ctor.prototype, "isKeepPositive", undefined);
  __decorate([_property({
    displayName: "数字集",
    type: u
  })], _ctor.prototype, "altasMap", undefined);
  return __decorate([_ccclass("ShowEffectCom_PicLabel")], _ctor);
}(r_IPicLabel.default);
exports.ShowEffectCom_PicLabel = exp_ShowEffectCom_PicLabel;