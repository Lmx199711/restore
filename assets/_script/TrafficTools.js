var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_SoundMgr = require("SoundMgr");
var r_ResSystem = require("ResSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_TrafficTools = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.trunkNode = null;
    t.licenseNode = null;
    t.drunkDrivingNode = null;
    t.peerNode = null;
    t.clickTipsNode = null;
    t.trueList = ["酒驾", "通行", "后备箱", "证件"];
    t.myList = [];
    t.right = false;
    t.blowNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.init();
  };
  _ctor.prototype.init = function () {
    this.trunkNode.on(cc.Node.EventType.TOUCH_END, this.trunkClick, this);
    this.licenseNode.on(cc.Node.EventType.TOUCH_END, this.licenseClick, this);
    this.drunkDrivingNode.on(cc.Node.EventType.TOUCH_END, this.drunkDrivingClick, this);
    this.peerNode.on(cc.Node.EventType.TOUCH_END, this.peerClick, this);
  };
  _ctor.prototype.getActiveCarNode = function () {
    var e = null;
    var t = false;
    this.node.children.forEach(function (o) {
      if (o.active && !t) {
        e = o;
        t = true;
      }
    });
    return e;
  };
  _ctor.prototype.trunkClick = function () {
    var e = this.getActiveCarNode();
    this.itemTool = null;
    this.itemTrunk = null;
    if (e) {
      this.itemTool = this.node.getChildByName(e.name + "位置");
      this.itemTool.active = true;
      this.itemTrunk = this.itemTool.getChildByName("后备箱");
      this.itemTrunk.active = true;
      r_BehaviorMgr.BehaviorMgr.trigger("后备箱点击");
    }
  };
  _ctor.prototype.licenseClick = function () {
    var e = this.getActiveCarNode();
    this.itemTool = null;
    this.itemTrunk = null;
    if (e) {
      this.itemTool = this.node.getChildByName(e.name + "位置");
      this.itemTool.active = true;
      this.itemTrunk = this.itemTool.getChildByName("证件");
      this.itemTrunk.active = true;
      r_BehaviorMgr.BehaviorMgr.trigger("证件点击");
    }
  };
  _ctor.prototype.drunkDrivingClick = function () {
    this.node.getChildByName("酒驾").active = true;
    this.right = false;
    this.blowNum = 0;
    this.drunkDrivingNumAdd(0);
    r_BehaviorMgr.BehaviorMgr.trigger("酒驾点击");
    this.drunkDrivingBlow();
  };
  _ctor.prototype.drunkDrivingBlow = function () {
    var e = this;
    var t = this.getActiveCarNode();
    this.blowNum++;
    r_BehaviorMgr.BehaviorMgr.trigger("显示拦截");
    var o = this.node.getChildByName("酒驾").getChildByName("人");
    var i = ["chuiqi_1", "chuiqi_2", "xiqi"];
    var n = [20, 13, 0, 18];
    var a = Math.floor(Math.random() * i.length);
    if (this.right) {
      a = 1;
    } else {
      this.blowNum > 2 && (a = 1);
    }
    if (0 == a) {
      cc.tween(o).delay(.5).to(.5, {
        x: o.x + 20
      }).call(function () {
        setTimeout(function () {
          o.getChildByName("静态").active = false;
          var e = o.getChildByName("吹气");
          e.active = true;
          var t = e.getComponent(sp.Skeleton);
          t.setAnimation(0, i[0], false);
          t.setCompleteListener(function () {
            o.getChildByName("静态").active = true;
            e.active = false;
            cc.tween(o).to(.5, {
              x: o.x - 20
            }).call(function () {
              setTimeout(function () {
                r_BehaviorMgr.BehaviorMgr.trigger("隐藏拦截");
              }, 500);
            }).start();
          });
        }, 500);
      }).start();
    } else {
      cc.tween(o).delay(.5).to(.5, {
        x: o.x + 65
      }).call(function () {
        setTimeout(function () {
          o.getChildByName("静态").active = false;
          var r = o.getChildByName("吹气");
          r.active = true;
          var c = r.getComponent(sp.Skeleton);
          c.setAnimation(0, i[a], false);
          c.setCompleteListener(function () {
            o.getChildByName("静态").active = true;
            r.active = false;
            1 == a && setTimeout(function () {
              e.drunkDrivingNumAdd(100 * n[parseInt(t.name) - 1]);
              e.right = true;
            }, 1);
            cc.tween(o).to(.5, {
              x: o.x - 65
            }).call(function () {
              setTimeout(function () {
                r_BehaviorMgr.BehaviorMgr.trigger("隐藏拦截");
              }, 500);
            }).start();
          });
        }, 500);
      }).start();
    }
  };
  _ctor.prototype.drunkDrivingNumAdd = function (e) {
    var t = this.node.getChildByName("酒驾").getChildByName("检测仪");
    var o = t.getChildByName("1");
    var i = t.getChildByName("2");
    var n = t.getChildByName("3");
    var a = t.getChildByName("4");
    var s = function (t) {
      r.scheduleOnce(function () {
        r_ResSystem.ResSystem.loadBundleUIImg(a, "resources1", "res/78交通巡查/" + t % 10);
        r_ResSystem.ResSystem.loadBundleUIImg(n, "resources1", "res/78交通巡查/" + Math.floor(t / 10) % 10);
        r_ResSystem.ResSystem.loadBundleUIImg(i, "resources1", "res/78交通巡查/" + Math.floor(t / 100) % 10);
        r_ResSystem.ResSystem.loadBundleUIImg(o, "resources1", "res/78交通巡查/" + Math.floor(t / 1e3) % 10);
      }, 2 / e * t);
    };
    var r = this;
    for (var l = 0; l <= e; l++) {
      s(l);
    }
  };
  _ctor.prototype.peerClick = function () {
    var e = this.getActiveCarNode();
    r_BehaviorMgr.BehaviorMgr.trigger("车辆" + e.name + "通行");
    setTimeout(function () {
      r_BehaviorMgr.BehaviorMgr.trigger("隐藏所有车辆");
      r_BehaviorMgr.BehaviorMgr.trigger("车辆" + (parseInt(e.name) + 1) + "移动");
    }, 1e3);
    this.myList.push("通行");
  };
  _ctor.prototype.btnClick = function (e, t) {
    var o = this;
    if ("隐藏其他事件按钮" == t || t.startsWith("坐牢")) {
      this.itemTool && this.itemTool.children.forEach(function (e) {
        e.active = false;
        o.clickTipsNode.active = false;
      });
      if (t.startsWith("坐牢")) {
        r_BehaviorMgr.BehaviorMgr.trigger("坐牢" + this.getActiveCarNode().name);
        this.myList.push(t.slice(2));
      }
      r_BehaviorMgr.BehaviorMgr.trigger("隐藏其他事件按钮");
      return void console.log(this.myList);
    }
    if (t.startsWith("点击")) {
      this.clickTipsNode.active = true;
      this.clickTipsNode.position = e.target.position;
      var i = this.clickTipsNode.getComponent(cc.Sprite);
      i.type = cc.Sprite.Type.FILLED;
      i.fillType = cc.Sprite.FillType.RADIAL;
      i.fillCenter.x = .5;
      i.fillCenter.y = .5;
      i.fillRange = 0;
      r_SoundMgr.SoundMgr.playSound("lv0078/点击圈中");
      cc.tween(i).to(.5, {
        fillRange: 1
      }).start();
    }
    r_BehaviorMgr.BehaviorMgr.trigger(t);
  };
  _ctor.prototype.passLevel = function () {
    var e = true;
    for (var t = 0; t < this.trueList.length; t++) {
      if (this.trueList[t] != this.myList[t]) {
        e = false;
        break;
      }
    }
    if (e) {
      r_BehaviorMgr.BehaviorMgr.trigger("游戏逻辑#1");
    } else {
      r_BehaviorMgr.BehaviorMgr.trigger("游戏逻辑#0");
    }
  };
  __decorate([_property({
    displayName: "后备箱节点",
    type: cc.Node
  })], _ctor.prototype, "trunkNode", undefined);
  __decorate([_property({
    displayName: "驾照节点",
    type: cc.Node
  })], _ctor.prototype, "licenseNode", undefined);
  __decorate([_property({
    displayName: "酒驾节点",
    type: cc.Node
  })], _ctor.prototype, "drunkDrivingNode", undefined);
  __decorate([_property({
    displayName: "通行节点",
    type: cc.Node
  })], _ctor.prototype, "peerNode", undefined);
  __decorate([_property({
    displayName: "点击提示节点",
    type: cc.Node
  })], _ctor.prototype, "clickTipsNode", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_TrafficTools;