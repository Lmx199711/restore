var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnwserTipsInfo = exports.AnwserTipsNodeInfo = undefined;
var r_LoadMgr = require("LoadMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_PlatformSystem = require("PlatformSystem");
var r_Index = require("Index");
var r_GameTipUI = require("GameTipUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_GameEvent = require("GameEvent");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_AnwserTipsNodeInfo = function () {
  function _ctor() {
    this.tipText = "";
    this.finishKey = "";
  }
  __decorate([_property({
    displayName: "提示节点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "提示文字"
  })], _ctor.prototype, "tipText", undefined);
  __decorate([_property({
    displayName: "完成key"
  })], _ctor.prototype, "finishKey", undefined);
  return __decorate([_ccclass("AnwserTipsNodeInfo")], _ctor);
}();
exports.AnwserTipsNodeInfo = exp_AnwserTipsNodeInfo;
var exp_AnwserTipsInfo = function () {
  function _ctor() {
    this.needKeys = "";
    this.pointKey = "";
    this.finishKey = "";
    this.nodeList = [];
    this.anwserIndex = 0;
    this.isFinish = false;
  }
  __decorate([_property({
    displayName: "需要的keys"
  })], _ctor.prototype, "needKeys", undefined);
  __decorate([_property({
    displayName: "指向key"
  })], _ctor.prototype, "pointKey", undefined);
  __decorate([_property({
    displayName: "完成key"
  })], _ctor.prototype, "finishKey", undefined);
  __decorate([_property({
    displayName: "提示节点列表",
    type: exp_AnwserTipsNodeInfo
  })], _ctor.prototype, "nodeList", undefined);
  return __decorate([_ccclass("AnwserTipsInfo")], _ctor);
}();
exports.AnwserTipsInfo = exp_AnwserTipsInfo;
var def_AnwserTipsCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.scaleNode = null;
    t.tipAnimNode = null;
    t.pointKeys = "";
    t.anwserInfoList = [];
    t.maxScale = 1.5;
    t.initScale = 1;
    t.isShowAnwser = false;
    t.targetNodeInfo = null;
    t.tempV2 = cc.v2();
    t.listenKey = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    r_Index.App.inst.on(r_GameEvent.default.OnShowGameTip, this.onShowGameTip, this);
    r_Index.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
    r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = this.checkShowAnwser.bind(this);
    this.initScale = this.scaleNode.scale;
    this.maxScale = 1.5 * this.initScale;
  };
  _ctor.prototype.findAnwserTipsInfo = function () {
    var e = this.checkKeysOne(this.pointKeys);
    for (var t = 0; t < this.anwserInfoList.length; t++) {
      var o = this.anwserInfoList[t];
      if (!(e && o.pointKey != e || !e && "" != o.pointKey) && this.checkKeysAll(o.needKeys) && !this.checkKeysOne(o.finishKey)) {
        return o;
      }
    }
    return null;
  };
  _ctor.prototype.showAnwser = function (e) {
    var t = this;
    var o = this.findAnwserTipsInfo();
    console.log("..........", o);
    if (!o) {
      console.log("没有提示节点");
      this.anwserFinish();
      return void (this.lastFindInfo = null);
    }
    e || (o.anwserIndex = 0);
    if (o.anwserIndex >= o.nodeList.length || this.lastFindInfo && this.lastFindInfo != o) {
      this.anwserFinish();
      return void (this.lastFindInfo = null);
    }
    this.lastFindInfo = o;
    for (var i = 0; i < o.nodeList.length; i++) {
      var n = o.nodeList[i];
      if ("" == n.finishKey || !this.checkKeysOne(n.finishKey)) {
        o.anwserIndex = i;
        this.listenKey = n.finishKey;
        break;
      }
    }
    var a = o.nodeList[o.anwserIndex];
    "" != a.tipText && r_ViewTipsUI.ViewTipsUI.showAnserTip(a.tipText);
    this.targetNodeInfo = a;
    o.anwserIndex++;
    if (a.node) {
      var s = this.maxScale;
      var r = this.scaleNode.scale;
      this.scaleNode.scale = s;
      var c = Math.max((this.scaleNode.width * s - this.scaleNode.parent.width) / 2, 0);
      var l = Math.max((this.scaleNode.height * s - this.scaleNode.parent.height) / 2, 0);
      var p = a.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var d = this.scaleNode.parent.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var y = this.clamp(this.scaleNode.x + d.x - p.x, -c, c);
      var f = this.clamp(this.scaleNode.y + d.y - p.y, -l, l);
      this.isShowAnwser = true;
      this.tipAnimNode.parent = a.node.parent;
      this.tipAnimNode.worldPosition = a.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
      this.tipAnimNode.active = false;
      this.scaleNode.scale = r;
      var m = {
        x: y,
        y: f,
        scale: s
      };
      cc.Tween.stopAllByTarget(this.scaleNode);
      cc.tween(this.scaleNode).to(.2, m).call(function () {
        t.playRotationAnim(t.tipAnimNode);
      }).start();
      r_GameTipUI.GameTipUI.setTipBtnVisible(false);
    }
  };
  _ctor.prototype.checkShowAnwser = function (e, t) {
    var o = this;
    if (e) {
      r_PlatformSystem.PlatformSystem.showVideo("查看答案" + r_LoadMgr.default.currLv, function () {
        o.showAnwser(t);
      });
    } else {
      this.showAnwser(t);
    }
  };
  _ctor.prototype.onCheck = function (e) {
    var t = e.data;
    var o = t.add;
    var i = t.key;
    if (o) {
      if (!this.listenKey || "" === this.listenKey) {
        return;
      }
      var n = this.listenKey.split(/[,\uff0c]/);
      for (var a = 0; a < n.length; a++) {
        if (n[a] == i) {
          this.triggerCheckShowAnwser();
          break;
        }
      }
    }
  };
  _ctor.prototype.triggerCheckShowAnwser = function () {
    this.isShowAnwser && this.checkShowAnwser(false, true);
  };
  _ctor.prototype.anwserFinish = function () {
    if (this.isShowAnwser) {
      this.isShowAnwser = false;
      cc.Tween.stopAllByTarget(this.scaleNode);
      this.scaleNode.scale = this.initScale;
      this.scaleNode.x = 0;
      this.scaleNode.y = 0;
      this.tipAnimNode.active = false;
      r_GameTipUI.GameTipUI.setTipBtnVisible(true);
      this.listenKey = "";
    }
  };
  _ctor.prototype.playRotationAnim = function (e) {
    e.active = true;
    var t = e.getChildByName("anim");
    var o = t.getComponent(cc.Animation);
    t.getChildByName("liz").getComponent(cc.ParticleSystem).resetSystem();
    o.play();
  };
  _ctor.prototype.showTipBtn = function (e, t, o) {
    r_GameTipUI.GameTipUI.setTipBtnVisible("1" == o);
  };
  _ctor.prototype.onShowGameTip = function () {
    r_GameTipUI.GameTipUI.setTipBtnVideoVisible(true);
  };
  _ctor.prototype.checkKeysAll = function (e) {
    if (null == e || "" === e) {
      return true;
    }
    var t = e.split(/[,\uff0c]/);
    for (var o = 0; o < t.length; o++) {
      if ("!" == t[o][0] || "！" == t[o][0]) {
        var i = t[o].substring(1);
        if (r_GameKeyMgr.GameKeyMgr.has(i)) {
          return false;
        }
      } else if (!r_GameKeyMgr.GameKeyMgr.has(t[o])) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.checkKeysOne = function (e) {
    if (null == e || "" === e) {
      return null;
    }
    var t = e.split(/[,\uff0c]/);
    for (var o = 0; o < t.length; o++) {
      if (r_GameKeyMgr.GameKeyMgr.has(t[o])) {
        return t[o];
      }
    }
    return null;
  };
  _ctor.prototype.clamp = function (e, t, o) {
    if (e < t) {
      return t;
    } else if (e > o) {
      return o;
    } else {
      return e;
    }
  };
  __decorate([_property({
    displayName: "缩放节点",
    type: cc.Node
  })], _ctor.prototype, "scaleNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示动画"
  })], _ctor.prototype, "tipAnimNode", undefined);
  __decorate([_property({
    displayName: "指向keys"
  })], _ctor.prototype, "pointKeys", undefined);
  __decorate([_property({
    displayName: "答案提示列表",
    type: exp_AnwserTipsInfo
  })], _ctor.prototype, "anwserInfoList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_AnwserTipsCom;