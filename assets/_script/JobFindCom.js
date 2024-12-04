var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_JobResultUI = require("JobResultUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_JobFindCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.levelMaxTime = 90;
    t.errorList = [];
    t.leftTime = 0;
    t.findNum = 0;
    t.isPause = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.start = function () {};
  _ctor.prototype.onEnable = function () {
    for (var e = 0; e < this.errorList.length; e++) {
      this.errorList[e].active = false;
    }
    this.registTouch();
    this.findNum = 0;
    this.numLb.string = "0";
    this.leftTime = this.levelMaxTime;
    this.isPause = false;
    this.updateTime();
  };
  _ctor.prototype.updateTime = function () {
    this.timeLb.string = Math.floor(this.leftTime) + "";
  };
  _ctor.prototype.update = function (e) {
    if (!(this.isPause || this.leftTime <= 0)) {
      e > .5 && (e = .016);
      if (!(this.findNum >= this.errorList.length)) {
        this.leftTime = this.leftTime - e;
        if (this.leftTime <= 0) {
          this.leftTime = 0;
          console.log("失败");
          r_SoundMgr.SoundMgr.playSound("fail");
          r_JobResultUI.JobResultUI.showUI({
            mode: 0
          });
        }
        this.updateTime();
      }
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    if (!this.touchNode) {
      this.touchNode = new cc.Node();
      this.touchNode.width = 1668;
      this.touchNode.height = 1002;
      this.node.addChild(this.touchNode);
    }
    var t = null;
    this.touchNode.off(cc.Node.EventType.TOUCH_START);
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE);
    this.touchNode.off(cc.Node.EventType.TOUCH_END);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL);
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (i) {
      t = i.getLocation();
      for (var n = 0; n < e.errorList.length; n++) {
        var a = e.errorList[n];
        if (!a.active && r_UtilsSystem.UtilsSystem.touchInNode(a, t)) {
          a.active = true;
          e.findNum = e.findNum + 1;
          e.numLb.string = e.findNum + "";
          if (e.findNum >= e.errorList.length) {
            console.log("胜利");
            r_SoundMgr.SoundMgr.playSound("win");
            r_JobResultUI.JobResultUI.showUI({
              mode: 1
            });
            r_PlayerData.PlayerData.addCoin("审批试卷", _ref__ctor.addCoinNum, r_ReportSystem.SystemKey.None);
          } else {
            r_SoundMgr.SoundMgr.playSound("click1");
          }
          break;
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function () {});
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {});
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function () {});
    this.touchNode._touchListener.setSwallowTouches(false);
  };
  _ctor.addCoinNum = 5e4;
  __decorate([_property({
    type: Number,
    displayName: "关卡时间"
  })], _ctor.prototype, "levelMaxTime", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "错误列表"
  })], _ctor.prototype, "errorList", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "时间"
  })], _ctor.prototype, "timeLb", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "数量"
  })], _ctor.prototype, "numLb", undefined);
  return _ref__ctor = __decorate([_ccclass, _menu("豪门少年/人才招聘/审批试卷")], _ctor);
}(cc.Component);
exports.default = def_JobFindCom;