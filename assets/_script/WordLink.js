var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LevelPreload = require("LevelPreload");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var m = function () {
  function e() {
    this.rootNode = null;
    this.colorIndex = 1;
    this.name = "";
    this.content = "对话内容";
    this.sound = "";
    this.indexX = undefined;
    this.indexY = undefined;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "根节点"
  })], e.prototype, "rootNode", undefined);
  __decorate([_property({
    type: Number,
    displayName: "对应颜色信息索引"
  })], e.prototype, "colorIndex", undefined);
  __decorate([_property({
    displayName: "动画名字前缀"
  })], e.prototype, "name", undefined);
  __decorate([_property({
    displayName: "动画名字前缀"
  })], e.prototype, "content", undefined);
  __decorate([_property({
    displayName: "音效名字"
  })], e.prototype, "sound", undefined);
  return __decorate([_ccclass("WordLinkPerson")], e);
}();
var g = function () {
  function e() {
    this.bgFrame = null;
    this.lineFrame = null;
  }
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "底图"
  })], e.prototype, "bgFrame", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "连图"
  })], e.prototype, "lineFrame", undefined);
  return __decorate([_ccclass("WordLinkColor")], e);
}();
var v = function () {
  function e() {
    this.stepNum = 5;
    this.addStepNum = 5;
    this.personList = [];
  }
  __decorate([_property({
    type: Number,
    displayName: "关卡步骤"
  })], e.prototype, "stepNum", undefined);
  __decorate([_property({
    type: Number,
    displayName: "增加步数"
  })], e.prototype, "addStepNum", undefined);
  __decorate([_property({
    type: [m],
    displayName: "人物列表"
  })], e.prototype, "personList", undefined);
  return __decorate([_ccclass("WordLinkLevel")], e);
}();
var def_WordLink = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.animDelayTime = 1;
    t.colorList = [];
    t.levelList = [];
    t.errorSound = "";
    t.winDelayTime = 0;
    t.curLevel = 0;
    t.touchNode = null;
    t.curGraphic = null;
    t.finishNum = 0;
    t.itemMap = {};
    t.itemList = [];
    t.colorLineMap = {};
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.init()];
          case 1:
            e.sent();
            return [2, null];
        }
      });
    });
  };
  _ctor.prototype.passLevel = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    cc.tween(this.node).delay(1).call(function () {}).start();
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.init = function () {
    for (var e = 1; e <= this.levelList.length; e++) {
      this.node.getChildByName("level" + e).active = false;
    }
    this.nanduPage = this.node.getChildByName("NanduUp");
    this.nanduNode = this.nanduPage.getChildByName("难度飙升");
    this.node.getChildByName("level1").active = true;
    this.registTouch();
    this.refreshStepNum();
    this.initLevel();
  };
  _ctor.prototype.initLevel = function () {
    this.colorLineMap = {};
    this.node.getChildByName("lineRoot").destroyAllChildren();
    this.itemMap = {};
    this.itemList = [];
    var e = this.node.getChildByName("pos1");
    var t = this.node.getChildByName("pos2");
    var o = this.node.getChildByName("pos3");
    e.active = false;
    t.active = false;
    o.active = false;
    var i = this.node.getChildByName("item");
    i.active = false;
    var n = this.node.getChildByName("itemRoot");
    n.destroyAllChildren();
    for (var a = 1; a <= 6; a++) {
      for (var s = 1; s <= 6; s++) {
        this.itemMap[s] || (this.itemMap[s] = {});
        var r = cc.instantiate(i);
        r.x = e.x + (t.x - e.x) * (s - 1);
        r.y = e.y + (o.y - e.y) * (a - 1);
        r.indexX = s;
        r.indexY = a;
        r.active = true;
        r.getComponent(cc.Sprite).spriteFrame = null;
        this.itemMap[s][a] = r;
        this.itemList.push(r);
        n.addChild(r);
        var c = r.convertToWorldSpaceAR(cc.Vec2.ZERO);
        for (var l = 0; l < this.levelList[this.curLevel].personList.length; l++) {
          var u = r.parent.convertToNodeSpaceAR(c);
          var h = this.levelList[this.curLevel].personList[l];
          if (null == h.indexX && cc.Vec2.distance(u, h.rootNode.position) < 50) {
            h.indexX = s;
            h.indexY = a;
            r.personInfo = h;
          }
        }
      }
    }
  };
  _ctor.prototype.getTouchItem = function (e) {
    var t = this.itemList[0].parent.convertToNodeSpaceAR(e);
    var o = 99999;
    var i = null;
    for (var n = 0; n < this.itemList.length; n++) {
      var a = this.itemList[n];
      var s = cc.Vec2.distance(t, a.position);
      if (s < o) {
        o = s;
        i = a;
      }
    }
    if (o < 100) {
      return i;
    } else {
      return null;
    }
  };
  _ctor.prototype.isNearItem = function (e, t) {
    return e.indexX == t.indexX && 1 == Math.abs(e.indexY - t.indexY) || e.indexY == t.indexY && 1 == Math.abs(e.indexX - t.indexX);
  };
  _ctor.prototype.playAnim = function (e, t) {
    e.personInfo.rootNode.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, t, false);
  };
  _ctor.prototype.drawLinePic = function (e) {
    var t = this.colorLineMap[e].picRoot;
    var o = this.colorLineMap[e].line;
    t.destroyAllChildren();
    for (var i = 1; i < o.length; i++) {
      var n = o[i - 1];
      var a = o[i];
      var s = cc.instantiate(this.node.getChildByName("line"));
      t.addChild(s);
      s.active = true;
      s.getComponent(cc.Sprite).spriteFrame = this.colorList[e - 1].lineFrame;
      if (n.indexX == a.indexX) {
        s.width = 38;
        s.height = Math.abs(n.y - a.y) + 38;
        s.x = n.x;
        s.y = (n.y + a.y) / 2;
      } else {
        s.width = Math.abs(n.x - a.x) + 38;
        s.height = 38;
        s.y = n.y;
        s.x = (n.x + a.x) / 2;
      }
    }
  };
  _ctor.prototype.clearLine = function (e) {
    var t = this.colorLineMap[e].picRoot;
    var o = this.colorLineMap[e].line;
    t.destroyAllChildren();
    for (var i = 0; i < o.length; i++) {
      o[i].getComponent(cc.Sprite).spriteFrame = null;
    }
  };
  _ctor.prototype.isWin = function () {
    var e = 0;
    for (var t in this.colorLineMap) {
      var o = this.colorLineMap[t].line;
      o && o.length > 1 && o[0].personInfo && o[o.length - 1].personInfo && (e += 1);
    }
    return 2 * e >= this.levelList[this.curLevel].personList.length;
  };
  _ctor.prototype.refreshStepNum = function () {
    this.node.getChildByName("leftNum").getComponent(cc.Label).string = this.levelList[this.curLevel].stepNum + "";
  };
  _ctor.prototype.showTalk = function (e) {
    r_SoundMgr.SoundMgr.playSound(e.personInfo.sound);
    var t = this.node.getChildByName("talk");
    t.x = e.x;
    t.y = e.y + 100;
    t.getChildByName("content").getComponent(cc.Label).string = e.personInfo.content;
    t.active = true;
    cc.Tween.stopAllByTarget(t);
    cc.tween(t).delay(1).call(function () {
      t.active = false;
    }).start();
  };
  _ctor.prototype.nextLevel = function () {
    var e = this;
    this.isPlayAnim = true;
    cc.Tween.stopAllByTarget(this.node);
    cc.tween(this.node).delay(this.animDelayTime).call(function () {
      e.nanduPage.active = true;
      e.nanduNode.y = 500;
      e.isPlayAnim = false;
      cc.tween(e.nanduNode).to(1, {
        y: 128
      }, cc.easeBackOut()).delay(1).call(function () {
        e.nanduPage.active = false;
        e.node.getChildByName("level" + e.curLevel).active = false;
        e.node.getChildByName("level" + (e.curLevel + 1)).active = true;
        e.initLevel();
        e.refreshStepNum();
      }).start();
    }).start();
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchNode = new cc.Node();
    this.touchNode.width = 1668;
    this.touchNode.height = 1002;
    this.node.addChild(this.touchNode);
    var t = null;
    var o = null;
    var i = null;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (o) {
      t = o.getLocation();
      i = null;
      if (!e.isPlayAnim) {
        var n = e.getTouchItem(t);
        if (n) {
          if (n.personInfo) {
            r_SoundMgr.SoundMgr.playSound("lv0080/UI点击");
            var a = n.personInfo.colorIndex;
            if (e.colorLineMap[a]) {
              var s = e.colorLineMap[a].line;
              for (var r = s.length - 1; r >= 0; r--) {
                s[r].getComponent(cc.Sprite).spriteFrame = null;
                s.splice(r, 1);
              }
            }
            if (!e.colorLineMap[a]) {
              e.colorLineMap[a] = {};
              e.colorLineMap[a].picRoot = new cc.Node();
              e.node.getChildByName("lineRoot").addChild(e.colorLineMap[a].picRoot);
            }
            n.getComponent(cc.Sprite).spriteFrame = e.colorList[a - 1].bgFrame;
            (i = []).push(n);
            n.line = i;
            e.colorLineMap[a].line = i;
            return void e.drawLinePic(a);
          }
          for (var c in e.colorLineMap) {
            var l = e.colorLineMap[c].line;
            if (l && l.length >= 1 && l[l.length - 1] == n) {
              return void (i = l);
            }
          }
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (n) {
      if (t && i && !e.isPlayAnim) {
        o = n.getLocation();
        var a = e.getTouchItem(o);
        if (a && (console.log("touchMoveItem.indexX=", a.indexX), console.log("touchMoveItem.indexY=", a.indexY), e.isNearItem(i[i.length - 1], a))) {
          if (a.personInfo) {
            if (a == i[0] || a.personInfo.colorIndex != i[0].personInfo.colorIndex) {
              e.playAnim(a, a.personInfo.name + "_B");
              e.showTalk(a);
              e.clearLine(i[0].personInfo.colorIndex);
              e.colorLineMap[i[0].personInfo.colorIndex].line = [];
              i = null;
              e.levelList[e.curLevel].stepNum = e.levelList[e.curLevel].stepNum - 1;
              e.refreshStepNum();
              return void (e.levelList[e.curLevel].stepNum <= 0 && e.failLevel());
            }
            r_SoundMgr.SoundMgr.playSound("lv0080/成功配对");
            e.playAnim(a, a.personInfo.name + "_A");
            e.playAnim(i[0], i[0].personInfo.name + "_A");
            var s = i[0].personInfo.colorIndex;
            a.getComponent(cc.Sprite).spriteFrame = e.colorList[s - 1].bgFrame;
            i.push(a);
            a.line = i;
            e.drawLinePic(a.personInfo.colorIndex);
            i = null;
            if (e.isWin()) {
              e.curLevel = e.curLevel + 1;
              if (e.curLevel >= e.levelList.length) {
                e.passLevel();
              } else {
                e.nextLevel();
              }
            } else {
              e.levelList[e.curLevel].stepNum = e.levelList[e.curLevel].stepNum - 1;
              e.refreshStepNum();
              e.levelList[e.curLevel].stepNum <= 0 && e.failLevel();
            }
          } else {
            r_SoundMgr.SoundMgr.playSound("lv0080/哒");
            var r = i.indexOf(a);
            if (-1 != r) {
              for (var c = i.length - 1; c > r; c--) {
                i[c].getComponent(cc.Sprite).spriteFrame = null;
                i.splice(c, 1);
              }
              e.drawLinePic(i[0].personInfo.colorIndex);
            } else {
              if (a.line) {
                var l = a.line.indexOf(a);
                if (-1 != l) {
                  var u = a.line[0].personInfo.colorIndex;
                  for (c = a.line.length - 1; c >= l; c--) {
                    a.line[c].getComponent(cc.Sprite).spriteFrame = null;
                    a.line.splice(c, 1);
                  }
                  e.drawLinePic(u);
                }
              }
              s = i[0].personInfo.colorIndex;
              a.getComponent(cc.Sprite).spriteFrame = e.colorList[s - 1].bgFrame;
              i.push(a);
              a.line = i;
              e.drawLinePic(s);
            }
          }
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function (o) {
      i = null;
      e.isPlayAnim || t && o.getLocation();
    });
  };
  _ctor.prototype.onDisable = function () {
    r_TimeSystem.TimeSystem.scheduleClear("winTime");
  };
  _ctor.prototype.onClickAdd = function () {
    this.isPlayAnim;
  };
  __decorate([_property({
    type: Number,
    displayName: "动画延迟时间"
  })], _ctor.prototype, "animDelayTime", undefined);
  __decorate([_property({
    type: [g],
    displayName: "颜色信息列表"
  })], _ctor.prototype, "colorList", undefined);
  __decorate([_property({
    type: [v],
    displayName: "关卡"
  })], _ctor.prototype, "levelList", undefined);
  __decorate([_property({
    displayName: "错误音效"
  })], _ctor.prototype, "errorSound", undefined);
  __decorate([_property({
    type: Number,
    displayName: "胜利延迟时间"
  })], _ctor.prototype, "winDelayTime", undefined);
  return __decorate([_ccclass, _menu("文字游戏/连连看")], _ctor);
}(r_LevelPreload.default);
exports.default = def_WordLink;