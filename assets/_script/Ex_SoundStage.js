var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var p = function () {
  function e() {
    this.audioNode = null;
    this.maxDistance = 100;
    this.minDistance = 10;
    this.maxVolume = 1;
  }
  __decorate([_property({
    displayName: "节点位置",
    type: cc.AudioSource
  })], e.prototype, "audioNode", undefined);
  __decorate([_property({
    displayName: "最远距离",
    tooltip: "最大距离是声音停止衰减的距离",
    step: 10,
    min: 10
  })], e.prototype, "maxDistance", undefined);
  __decorate([_property({
    displayName: "最近距离",
    tooltip: "在最小距离内，音频源的音量将停止变大",
    step: 10,
    min: 10
  })], e.prototype, "minDistance", undefined);
  return __decorate([_ccclass("StageSoundInfo")], e);
}();
var d = function () {
  function e() {
    this.target = null;
    this.trigger = "";
    this.coolTime = 1;
    this.minDistance = 10;
    this._timer = 0;
  }
  __decorate([_property({
    displayName: "节点位置",
    type: cc.Node
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "触发行为"
  })], e.prototype, "trigger", undefined);
  __decorate([_property({
    displayName: "间隔时间",
    step: .1
  })], e.prototype, "coolTime", undefined);
  __decorate([_property({
    displayName: "触发半径",
    tooltip: "在最小距离内，音频源的音量将停止变大",
    step: 10,
    min: 10
  })], e.prototype, "minDistance", undefined);
  return __decorate([_ccclass("FocusSoundInfo")], e);
}();
var def_Ex_SoundStage = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.eye = null;
    t.eyeSensitivity = 50;
    t._timer = 0;
    t.soundInfo = [];
    t.focusInfo = [];
    t.isBeginUpdate = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    console.log("-----start!! audio!!");
  };
  _ctor.prototype.activateStage = function () {
    var e = this;
    this.soundInfo.forEach(function (t) {
      console.log(">>>>>> .   >audioNode:" + t.audioNode.node.name);
      var o = t.audioNode;
      console.log(o.clip.name);
      t.maxVolume = o.volume;
      o.volume = 0;
      o.play();
      e.isBeginUpdate = true;
    });
  };
  _ctor.prototype.update = function (e) {
    if (this.isBeginUpdate) {
      this._timer += e;
      if (this._timer >= this.eyeSensitivity / 100) {
        this._timer = 0;
        this.computerDistance();
      }
      this.updateFocus(e);
    }
  };
  _ctor.prototype.updateFocus = function (e) {
    var t = this;
    this.focusInfo.forEach(function (o) {
      if (o.target) {
        o.coolTime > 0 && (o._timer -= e);
        if (o.target.worldPosition.sub(t.eye.worldPosition).len() <= o.minDistance && o._timer < 0) {
          r_BehaviorMgr.BehaviorMgr.trigger(o.trigger);
          if (o.coolTime < 0) {
            o._timer = 1;
          } else {
            o._timer = o.coolTime;
          }
        }
      }
    });
  };
  _ctor.prototype.computerDistance = function () {
    var e = this;
    this.soundInfo.forEach(function (t) {
      if (t.audioNode) {
        var o = t.audioNode.node.worldPosition.sub(e.eye.worldPosition).len();
        if (o >= t.maxDistance) {
          t.audioNode.volume = 0;
        } else if (o <= t.minDistance) {
          t.audioNode.volume = t.maxVolume;
        } else {
          var i = 1 - (o - t.minDistance) / (t.maxDistance - t.minDistance);
          t.audioNode.volume = t.maxVolume * i;
        }
      }
    });
  };
  _ctor.prototype.AcFun = function (e, t, o) {
    if (o) {
      if (o instanceof Array) {
        ;
      } else if (o[r_BehaviorDef.ARGS.now]) {
        this.activateStage();
      } else {
        var i = parseInt(o);
        console.log("想暂停下标:" + i);
        isNaN(i) || this.stopAudio(i);
      }
    }
  };
  _ctor.prototype.handleArg = function () {};
  _ctor.prototype.stopAudio = function (e) {
    if (e >= 0 && e >= this.soundInfo.length) {
      cc.warn("stopAudio's index is illegal!");
    } else {
      this.soundInfo[e].audioNode.stop();
      console.log("第" + e + "个audio暂停了");
    }
  };
  __decorate([_property({
    displayName: "耳朵位置",
    tooltip: "判断耳朵和音源的位置来决定听到的声音",
    type: cc.Node
  })], _ctor.prototype, "eye", undefined);
  __decorate([_property({
    displayName: "延迟程度",
    tooltip: "延迟程度越低，距离计算就越频繁",
    slide: true,
    range: [1, 100, 1]
  })], _ctor.prototype, "eyeSensitivity", undefined);
  __decorate([_property({
    displayName: "距离音源信息",
    type: p
  })], _ctor.prototype, "soundInfo", undefined);
  __decorate([_property({
    displayName: "触发音源信息",
    type: d
  })], _ctor.prototype, "focusInfo", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/多音频")], _ctor);
}(cc.Component);
exports.default = def_Ex_SoundStage;