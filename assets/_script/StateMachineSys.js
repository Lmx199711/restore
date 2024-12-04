Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMachineSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_StateMachineCom = require("StateMachineCom");
var r_CommonFunc = require("CommonFunc");
var r_GameKeyMgr = require("GameKeyMgr");
var r_App = require("App");
var r_BehaviorDef = require("BehaviorDef");
var r_BehaviorMgr = require("BehaviorMgr");
var exp_StateMachineSys = function () {
  function _ctor() {
    this.selectIndex = -1;
    this.keys = [];
    this.scores = [];
    this.scoreVars = [];
  }
  _ctor.prototype.onStart = function () {
    var e = this;
    var t = this.entity.fillKeys;
    if (t) {
      var o = r_CommonFunc.stringKeyToArr(t);
      this.keys = o || [];
      r_GameKeyMgr.GameKeyMgr.addGroup(o);
    }
    switch (this.entity.propertyType) {
      case r_BehaviorDef.PROPERTY_TYPE.Mask:
        this.oriObj = {
          opacity: this.entity.arg1.x || 0
        };
        this.desOb = {
          value: this.entity.arg1.y || 0
        };
        break;
      case r_BehaviorDef.PROPERTY_TYPE.Opacity:
        this.oriObj = {
          opacity: this.entity.arg1.x || 0
        };
        this.desOb = {
          opacity: this.entity.arg1.y || 0
        };
    }
    var i = this.entity.scores;
    i && r_CommonFunc.stringKeyToArr(i).forEach(function (t) {
      var o = parseInt(t);
      if (isNaN(o)) {
        e.scores.push(0);
      } else {
        e.scores.push(o);
      }
    });
    if (this.entity.scoresGroup) {
      this.scoreVars = r_CommonFunc.stringKeyToArr(this.entity.scoresGroup);
      this.scoreVars.forEach(function (e) {
        r_GameKeyMgr.GameKeyMgr.VarObj.hasOwnProperty(e) || (r_GameKeyMgr.GameKeyMgr.VarObj[e] = 0);
      });
    }
  };
  _ctor.prototype.onEnable = function () {
    r_App.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onDisable = function () {
    r_App.App.inst.off(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onUpdate = function () {};
  _ctor.prototype.onCheck = function (e) {
    this.keys || cc.warn("状态机没有状态:节点:" + this.entity.node.name);
    var t = e.data;
    var o = t.add;
    var i = t.key;
    if (o) {
      var n = this.keys.indexOf(i);
      if (n == this.selectIndex) {
        return;
      }
      if (-1 != n) {
        var a = r_CommonFunc.stringKeyToArr(this.entity.ids);
        a && a.length > 0 && a.forEach(function (e) {
          r_BehaviorMgr.BehaviorMgr.trigger(e);
        });
        this.entity.canTouchInfo.trigger("此状态机有状态了");
        if (this.entity.useInChild) {
          this.executeScore(this.selectIndex);
          for (var r = 0; r < this.entity.node_arr.length; r++) {
            c = this.entity.node_arr[r].children;
            -1 != this.selectIndex && this.executeProperty(c[this.selectIndex], this.desOb, this.oriObj);
            this.executeProperty(c[n], this.oriObj, this.desOb);
          }
          this.selectIndex = n;
          this.executeScore(this.selectIndex, true);
        } else {
          this.executeScore(this.selectIndex);
          var c = this.entity.node_arr;
          -1 != this.selectIndex && c[this.selectIndex] && this.executeProperty(c[this.selectIndex], this.desOb, this.oriObj);
          this.selectIndex = n;
          this.executeProperty(c[this.selectIndex], this.oriObj, this.desOb);
          this.executeScore(this.selectIndex, true);
        }
      }
    }
  };
  _ctor.prototype.executeProperty = function (e, t, o) {
    if (e) {
      switch (this.entity.propertyType) {
        case r_BehaviorDef.PROPERTY_TYPE.Mask:
          if (null != e.getComponent(cc.Mask)) {
            if (o.value > .5) {
              e.getComponent(cc.Mask).enabled = true;
            } else {
              e.getComponent(cc.Mask).enabled = false;
            }
          }
          break;
        case r_BehaviorDef.PROPERTY_TYPE.Opacity:
          r_CommonFunc.tweenDataByTarget({
            duration: .5,
            originData: t,
            target: e,
            to: o,
            easing: "sineOut"
          });
      }
    }
  };
  _ctor.prototype.executeScore = function (e, t) {
    undefined === t && (t = false);
    var o = 1;
    t || (o = -1);
    if (e < this.scores.length && this.scores[e]) {
      for (var i = 0; i < this.scoreVars.length; i++) {
        r_GameKeyMgr.GameKeyMgr.VarObj[this.scoreVars[i]] += o * this.scores[e];
      }
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_StateMachineCom.StateMachineCom)], _ctor);
}();
exports.StateMachineSys = exp_StateMachineSys;