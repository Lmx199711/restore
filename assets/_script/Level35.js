var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_CommonFunc = require("CommonFunc");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var p = function () {
  function e() {
    this.precondition = -1;
    this.nums = [0, 0];
    this.selectedNode = null;
    this.selectNode = null;
    this.selectItemAnimation = null;
    this.tips = null;
    this.playAniTime = 3;
    this.sound = [];
    this.selectedBehavior = null;
    this.selectBehavior = null;
    this.finish = false;
  }
  __decorate([_property({
    displayName: "必须先完成的步骤"
  })], e.prototype, "precondition", undefined);
  __decorate([_property({
    type: cc.Integer,
    displayName: "温度"
  })], e.prototype, "nums", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "选中时显示"
  })], e.prototype, "selectedNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "选择节点"
  })], e.prototype, "selectNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击时播放的动画"
  })], e.prototype, "selectItemAnimation", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击时的提示"
  })], e.prototype, "tips", undefined);
  __decorate([_property({
    displayName: "播放动画的时间"
  })], e.prototype, "playAniTime", undefined);
  __decorate([_property({
    type: cc.String,
    displayName: "播放动画时的音效"
  })], e.prototype, "sound", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "选中时执行的行为"
  })], e.prototype, "selectedBehavior", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "选择时执行的行为"
  })], e.prototype, "selectBehavior", undefined);
  return __decorate([_ccclass("LevelInfo35")], e);
}();
var def_Level35 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.levelInfo35s = [];
    t.thermometer = null;
    t.thermometerMin = -10;
    t.thermometerMax = 35;
    t.originThermometer = 10;
    t.failThermometer = 0;
    t.successThermometer = 36;
    t.clickSound = "level55/click";
    t.failBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.successBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.curIndex = -1;
    t.isShowSelectNode = false;
    t.isPlayAnimation = false;
    t.curThermometer = 10;
    t.bg = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.bg = new cc.Node("bg");
    this.bg.width = 1668;
    this.bg.height = 1002;
    this.node.addChild(this.bg);
    this.levelInfo35s.forEach(function (e) {
      return e.selectedNode.opacity = 0;
    });
    this.levelInfo35s.forEach(function (e) {
      return e.selectNode.active = false;
    });
    this.levelInfo35s.forEach(function (e) {
      e.selectItemAnimation.children[0].active = false;
      return e.selectItemAnimation.children[1].active = false;
    });
    this.levelInfo35s.forEach(function (e) {
      return e.tips.children[0].active = false;
    });
    this.curThermometer = this.originThermometer;
    this.thermometer.scaleY = (this.curThermometer - this.thermometerMin) / (this.thermometerMax - this.thermometerMin);
    this.bg.on(cc.Node.EventType.TOUCH_END, this.onTouchStart, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    var t = e.getLocation();
    this.onClickItem(t);
    this.onClickSelectItem(t);
  };
  _ctor.prototype.onClickItem = function (e) {
    if (-1 == this.curIndex) {
      this.clickSound && r_SoundMgr.SoundMgr.playSound(this.clickSound);
      for (var t = 0; t < this.levelInfo35s.length; t++) {
        if (!this.levelInfo35s[t].finish && r_CommonFunc.checkTouchNode(e, this.levelInfo35s[t].selectedNode)) {
          if (-1 == this.levelInfo35s[t].precondition || this.levelInfo35s[this.levelInfo35s[t].precondition].finish) {
            this.curIndex = t;
            this.levelInfo35s[t].selectedNode.opacity = 255;
            this.levelInfo35s[t].selectNode.active = true;
            this.isShowSelectNode = true;
            this.levelInfo35s[this.curIndex].selectedBehavior && this.levelInfo35s[this.curIndex].selectedBehavior.execute();
          } else {
            this.showTips(t);
          }
          break;
        }
      }
    }
  };
  _ctor.prototype.onClickSelectItem = function (e) {
    if (this.isShowSelectNode) {
      this.clickSound && r_SoundMgr.SoundMgr.playSound(this.clickSound);
      var t = this.levelInfo35s[this.curIndex].selectNode.children;
      for (var o = 0; o < t.length; o++) {
        if (r_CommonFunc.checkTouchNode(e, t[o])) {
          this.isShowSelectNode = false;
          this.levelInfo35s[this.curIndex].selectedNode.opacity = 0;
          this.levelInfo35s[this.curIndex].selectNode.active = false;
          this.levelInfo35s[this.curIndex].selectBehavior && (4 == this.curIndex && 0 == o || this.levelInfo35s[this.curIndex].selectBehavior.execute());
          this.showAnimation(o);
          break;
        }
      }
    }
  };
  _ctor.prototype.showAnimation = function (e) {
    var t = this;
    this.levelInfo35s[this.curIndex].selectItemAnimation.children[e].active = true;
    this.levelInfo35s[this.curIndex].sound[e] && r_SoundMgr.SoundMgr.playSound(this.levelInfo35s[this.curIndex].sound[e]);
    this.curThermometer += this.levelInfo35s[this.curIndex].nums[e];
    this.scheduleOnce(function () {
      t.levelInfo35s[t.curIndex].finish = true;
      t.curIndex = -1;
      t.checkFinish() || t.curThermometer <= 0 && t.failBehavior.execute();
    }, this.levelInfo35s[this.curIndex].playAniTime);
    var o = (this.curThermometer - this.thermometerMin) / (this.thermometerMax - this.thermometerMin);
    if (o > 0) {
      o > 1 && (o = 1);
      cc.tween(this.thermometer).delay(2).to(1, {
        scaleY: o
      }).start();
    }
  };
  _ctor.prototype.checkFinish = function () {
    var e = true;
    for (var t = 0; t < this.levelInfo35s.length; t++) {
      e && (e = this.levelInfo35s[t].finish);
    }
    if (e) {
      if (this.curThermometer > this.successThermometer) {
        this.successBehavior.execute();
      } else {
        this.failBehavior.execute();
      }
    }
    return e;
  };
  _ctor.prototype.showTips = function (e) {
    var t = this.levelInfo35s[e].tips;
    var o = cc.instantiate(t.children[0]);
    o.x = 0;
    o.y = 0;
    o.active = true;
    o.opacity = 255;
    o.parent = t;
    cc.tween(o).to(1, {
      y: 100,
      opacity: 0
    }, {
      easing: "quadOut"
    }).start();
  };
  __decorate([_property({
    type: [p],
    displayName: "关卡信息"
  })], _ctor.prototype, "levelInfo35s", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "温度计"
  })], _ctor.prototype, "thermometer", undefined);
  __decorate([_property({
    displayName: "温度计的最小值"
  })], _ctor.prototype, "thermometerMin", undefined);
  __decorate([_property({
    displayName: "温度计的最大值"
  })], _ctor.prototype, "thermometerMax", undefined);
  __decorate([_property({
    displayName: "初始温度"
  })], _ctor.prototype, "originThermometer", undefined);
  __decorate([_property({
    displayName: "低于这个温度时失败"
  })], _ctor.prototype, "failThermometer", undefined);
  __decorate([_property({
    displayName: "高于这个温度时成功"
  })], _ctor.prototype, "successThermometer", undefined);
  __decorate([_property({
    displayName: "点击音效"
  })], _ctor.prototype, "clickSound", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "失败执行的行为"
  })], _ctor.prototype, "failBehavior", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "成功执行的行为"
  })], _ctor.prototype, "successBehavior", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Level35;