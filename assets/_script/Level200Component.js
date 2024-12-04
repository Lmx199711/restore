var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxSystem = require("RelaxSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_Level200Component = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.stuffings = null;
    t.cakes = null;
    t.stuffingRabbit = null;
    t.cakeRabbit = null;
    t.combination = null;
    t.stampRabbit = null;
    t.moonCake = null;
    t.Rabbit1 = null;
    t.Rabbit2 = null;
    t.orderNode = null;
    t.waitNode = null;
    t.startNode = null;
    t.endNode = null;
    t.numText = null;
    t.stuffingList = [];
    t.cakeList = [];
    t.stuffingRabbitList = [];
    t.cakeRabbitList = [];
    t.nowStuffing = null;
    t.nowCake = null;
    t.nowRabbit = null;
    t.nowRabbitMoon = null;
    t.waitRabbit = null;
    t.isStampOk = true;
    t.speed = 50;
    t.waitTime = 8;
    t.startWait = false;
    t.timer = 8;
    t.blood = 3;
    t.num = 15;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.stuffingList = this.stuffings.children;
    this.cakeList = this.cakes.children;
    this.stuffingRabbitList = this.stuffingRabbit.children;
    this.cakeRabbitList = this.cakeRabbit.children;
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
  };
  _ctor.prototype.start = function () {
    r_SoundMgr.SoundMgr.playMusic("lv200/BGM");
    this.nowRabbit = this.Rabbit1;
    this.waitRabbit = this.Rabbit2;
    this.startWait = true;
    this.nowRabbitMoon = this.nowRabbit.getChildByName("对话框").children[Math.floor(6 * Math.random())];
    this.nowRabbitMoon.active = true;
    this.numText.string = "剩余外卖数：" + this.num;
  };
  _ctor.prototype.touchStart = function (e) {
    var t = e.getLocation();
    for (var o = 0; o < this.stuffingList.length; o++) {
      if (this.stuffingList[o].active && this.stuffingList[o].getBoundingBoxToWorld().contains(t)) {
        r_SoundMgr.SoundMgr.playSound("lv200/点击馅料或饼皮");
        this.stuffingList[o].active = false;
        for (var i = 0; i < this.stuffingRabbitList.length; i++) {
          this.stuffingRabbitList[i].active = false;
        }
        this.stuffingRabbitList[o].active = true;
        this.stuffingRabbitAction(this.stuffingRabbitList[o]);
        break;
      }
    }
    for (o = 0; o < this.cakeList.length; o++) {
      if (this.cakeList[o].active && this.cakeList[o].getBoundingBoxToWorld().contains(t)) {
        r_SoundMgr.SoundMgr.playSound("lv200/点击馅料或饼皮");
        this.cakeList[o].active = false;
        for (var n = 0; n < this.cakeRabbitList.length; n++) {
          this.cakeRabbitList[n].active = false;
        }
        this.cakeRabbitList[o].active = true;
        this.cakeRabbitAction(this.cakeRabbitList[o]);
        break;
      }
    }
    this.stamp();
  };
  _ctor.prototype.stamp = function () {
    var e = this;
    if (this.isStampOk && this.nowStuffing && this.nowCake) {
      this.isStampOk = false;
      cc.tween(this.nowStuffing).to(.2, {
        y: 213
      }).start();
      cc.tween(this.nowCake).to(.2, {
        y: 213
      }).delay(.1).call(function () {
        e.stampRabbit.getComponent(sp.Skeleton).setAnimation(1, "yueb", false);
        cc.tween(e.node).delay(.1).call(function () {
          e.nowStuffing.y = 0;
          e.nowCake.y = 0;
          for (var t = 0; t < e.moonCake.children.length; t++) {
            e.moonCake.children[t].active = false;
          }
          r_SoundMgr.SoundMgr.playSound("lv200/盖章");
          var o = e.moonCake.getChildByName(e.nowCake.name + e.nowStuffing.name);
          o.active = true;
          e.nowStuffing.active = false;
          e.nowStuffing = null;
          e.nowCake.active = false;
          e.nowCake = null;
          e.isStampOk = true;
          e.isSuccess(o);
          e.timer = e.waitTime;
          e.takeawayAction();
        }).start();
      }).start();
    }
  };
  _ctor.prototype.isSuccess = function (e) {
    var t = this;
    cc.tween(e).delay(.2).call(function () {
      e.active = false;
    }).start();
    console.log(e.name + ":" + this.nowRabbitMoon.name);
    if (e.name == this.nowRabbitMoon.name) {
      r_SoundMgr.SoundMgr.playSound("lv200/正确取货");
      this.num--;
      if (5 == this.num) {
        this.speed = 100;
        this.waitTime = 5;
      }
      this.numText.string = "剩余外卖数：" + this.num;
      if (!(0 != this.num || this.node.getChildByName("遮罩").active)) {
        this.node.getChildByName("遮罩").active = true;
        setTimeout(function () {
          r_RelaxSystem.RelaxSystem.win();
        }, 1e3);
      }
    } else if (this.blood > 0) {
      r_SoundMgr.SoundMgr.playSound("lv200/错误取货");
      this.blood--;
      this.node.getChildByName("头像").children[this.blood].active = false;
      if (!(0 != this.blood || this.node.getChildByName("遮罩").active)) {
        this.node.getChildByName("遮罩").active = true;
        setTimeout(function () {
          t.node.getChildByName("遮罩").active = false;
          t.blood = 3;
          for (var e = 0; e < 3; e++) {
            t.node.getChildByName("头像").children[e].active = true;
          }
          r_RelaxSystem.RelaxSystem.lose();
        }, 1e3);
      }
    }
  };
  _ctor.prototype.takeawayAction = function () {
    var e = this;
    var t = this.nowRabbit;
    var o = this.waitRabbit;
    this.nowRabbitMoon.active = false;
    t.children[0].active = false;
    t.children[1].active = false;
    cc.tween(t).to(.2, {
      x: this.endNode.x
    }).call(function () {
      t.x = e.startNode.x;
      cc.tween(t).to(.3, {
        x: e.waitNode.x
      }).start();
    }).start();
    cc.tween(o).to(.1, {
      x: this.orderNode.x
    }).call(function () {
      e.startWait = true;
      o.children[0].active = true;
      o.children[1].active = true;
      e.nowRabbitMoon = e.nowRabbit.getChildByName("对话框").children[Math.floor(6 * Math.random())];
      e.nowRabbitMoon.active = true;
    }).start();
    var i = this.nowRabbit;
    this.nowRabbit = this.waitRabbit;
    this.waitRabbit = i;
  };
  _ctor.prototype.stuffingRabbitAction = function (e) {
    this.stuffingRabbit.angle = 180;
    for (var t = 0; t < this.combination.children.length; t++) {
      if (this.combination.children[t].name == e.name) {
        this.combination.children[t].active = true;
        this.nowStuffing = this.combination.children[t];
        break;
      }
    }
    for (t = 0; t < this.combination.children.length; t++) {
      this.nowStuffing && this.combination.children[t] == this.nowStuffing || this.nowCake && this.combination.children[t] == this.nowCake || (this.combination.children[t].active = false);
    }
    e.active = false;
    cc.tween(this.stuffingRabbit).delay(.2).to(0, {
      angle: 0
    }).start();
  };
  _ctor.prototype.cakeRabbitAction = function (e) {
    this.cakeRabbit.angle = 180;
    for (var t = 0; t < this.combination.children.length; t++) {
      if (this.combination.children[t].name == e.name) {
        this.combination.children[t].active = true;
        this.nowCake = this.combination.children[t];
        break;
      }
    }
    for (t = 0; t < this.combination.children.length; t++) {
      this.nowStuffing && this.combination.children[t] == this.nowStuffing || this.nowCake && this.combination.children[t] == this.nowCake || (this.combination.children[t].active = false);
    }
    e.active = false;
    cc.tween(this.cakeRabbit).delay(.2).to(0, {
      angle: 0
    }).start();
  };
  _ctor.prototype.update = function (e) {
    var t = this;
    this.stuffingRun(e);
    this.cakeRun(e);
    if (this.startWait) {
      this.timer -= e;
      this.nowRabbit && (this.nowRabbit.getChildByName("time").getComponent(cc.ProgressBar).progress = this.timer / this.waitTime);
      if (this.timer <= 0) {
        if (this.blood > 0) {
          r_SoundMgr.SoundMgr.playSound("lv200/错误取货");
          this.blood--;
          this.node.getChildByName("头像").children[this.blood].active = false;
          if (!(0 != this.blood || this.node.getChildByName("遮罩").active)) {
            this.node.getChildByName("遮罩").active = true;
            setTimeout(function () {
              t.node.getChildByName("遮罩").active = false;
              t.blood = 3;
              for (var e = 0; e < 3; e++) {
                t.node.getChildByName("头像").children[e].active = true;
              }
              r_RelaxSystem.RelaxSystem.lose();
            }, 1e3);
          }
        }
        this.timer = this.waitTime;
        this.startWait = false;
        console.log("失败");
        this.takeawayAction();
      }
    }
  };
  _ctor.prototype.stuffingRun = function (e) {
    var t = this.stuffingList;
    for (var o = 0; o < t.length; o++) {
      t[o].y += e * this.speed;
      if (t[o].y >= 310) {
        t[o].active = true;
        t[o].y = 0;
      }
      t[o].y < 0 && t[o].y >= -10 && !t[o].active && (t[o].active = true);
    }
  };
  _ctor.prototype.cakeRun = function (e) {
    var t = this.cakeList;
    for (var o = 0; o < t.length; o++) {
      t[o].y += e * this.speed;
      if (t[o].y >= 310) {
        t[o].active = true;
        t[o].y = 0;
      }
      t[o].y < 0 && t[o].y >= -10 && !t[o].active && (t[o].active = true);
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "馅料根节点"
  })], _ctor.prototype, "stuffings", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "饼皮根节点"
  })], _ctor.prototype, "cakes", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "馅料兔子"
  })], _ctor.prototype, "stuffingRabbit", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "饼皮兔子"
  })], _ctor.prototype, "cakeRabbit", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "合成节点"
  })], _ctor.prototype, "combination", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "盖章兔子"
  })], _ctor.prototype, "stampRabbit", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "成品节点"
  })], _ctor.prototype, "moonCake", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "兔子外卖员1"
  })], _ctor.prototype, "Rabbit1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "兔子外卖员2"
  })], _ctor.prototype, "Rabbit2", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点餐位置"
  })], _ctor.prototype, "orderNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "等待位置"
  })], _ctor.prototype, "waitNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "开始位置"
  })], _ctor.prototype, "startNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "结束位置"
  })], _ctor.prototype, "endNode", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "次数"
  })], _ctor.prototype, "numText", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Level200Component;