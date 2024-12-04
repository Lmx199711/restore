var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ResSystem = require("ResSystem");
var r_EraseCom = require("EraseCom");
var r_SCResultUI = require("SCResultUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ScrapCarCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.carImage = null;
    t.handNode = null;
    t.eraseCom = null;
    t.currCarInfo = null;
    t.handPos = cc.v2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    this.handPos = this.handNode.getPosition();
    this.eraseCom = this.node.getComponentInChildren(r_EraseCom.default);
  };
  _ctor.prototype.initCarInfo = function (e) {
    var t = this;
    this.currCarInfo = e;
    r_ResSystem.ResSystem.loadBundleRes("game2", e.iamgeUrl, cc.SpriteFrame, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        t.carImage.spriteFrame = o;
      }
    });
  };
  _ctor.prototype.startScrap = function () {
    this.handNode.active = true;
    this.eraseCom.startClean();
    this.eraseCom.touchMove = this.touchNodeMove.bind(this);
    this.eraseCom.cleanAllSuccessCallBack = this.cleanAllSuccess.bind(this);
  };
  _ctor.prototype.touchNodeMove = function (e) {
    var t = this.handNode.parent.convertToNodeSpaceAR(e.touch.getLocation());
    this.handNode.setPosition(t);
  };
  _ctor.prototype.resetClean = function () {
    this.eraseCom.clear();
    this.handNode.setPosition(this.handPos);
    this.handNode.active = false;
  };
  _ctor.prototype.cleanAllSuccess = function () {
    console.log("............全部清理完成");
    this.eraseCom.touchMove = null;
    this.handNode.setPosition(this.handPos);
    this.handNode.active = false;
    this.eraseCom.unregistTouch();
    this.eraseCom.startClean();
    r_SCResultUI.SCResultUI.showUI(this.currCarInfo);
  };
  __decorate([_property({
    displayName: "车图片",
    type: cc.Sprite
  })], _ctor.prototype, "carImage", undefined);
  __decorate([_property({
    displayName: "handNode",
    type: cc.Node
  })], _ctor.prototype, "handNode", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ScrapCarCom;