Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_ActorCom = require("ActorCom");
var r_GameKeyMgr = require("GameKeyMgr");
var r_MsgActionBase = require("MsgActionBase");
var r_BehaviorDef = require("BehaviorDef");
var r_BehaviorMgr = require("BehaviorMgr");
var r_LoadMgr = require("LoadMgr");
var r_ResSystem = require("ResSystem");
var exp_ActorSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = this;
    var o = this.entity.bubStr || "缺省。。";
    var i = this.entity.audioName || "";
    if (e) {
      var n = r_BehaviorDef.HandleData(e);
      var a = n[0];
      var p = n[1];
      switch (a) {
        case r_BehaviorDef.ARGS.args:
          o = p[0];
          i = p[1];
          break;
        default:
          cc.warn("---actor sys HandleDate的default类型");
      }
    }
    this.entity.bubNode.getComponent(r_MsgActionBase.default).handleArg({
      arg1: o
    });
    var d = r_BehaviorMgr.BehaviorMgr.replaceKey(this.entity.spineClipName);
    var y = r_BehaviorMgr.BehaviorMgr.replaceKey(this.entity.defaultClipName);
    if (this.entity.isUseFsm2Spine) {
      var f = this.entity.triggerFsmInfo.find(function (e) {
        return r_GameKeyMgr.GameKeyMgr.has(e.key);
      });
      f && (d = r_BehaviorMgr.BehaviorMgr.replaceKey(f.actionId));
    }
    console.log("-------trigger:" + d);
    if (d && this.entity.spineNode) {
      this.entity.spineNode.getComponent(sp.Skeleton).setAnimation(0, d, true);
      this.entity.spineNode.getComponent(sp.Skeleton).paused = false;
    }
    null != i && "" !== i && r_ResSystem.ResSystem.loadBundleRes("resources1", "sound/" + i, cc.AudioClip, function (e, o) {
      e && console.warn("音频加载失败:", e);
      cc.audioEngine.stopEffect(r_GameKeyMgr.GameKeyMgr.audioID);
      r_LoadMgr.default.audioCallback && r_LoadMgr.default.audioCallback();
      r_GameKeyMgr.GameKeyMgr.audioID = cc.audioEngine.playEffect(o, false);
      var i = function () {
        var e;
        if (t.entity.isUseFsm2Spine) {
          var o = t.entity.idleFsmInfo.find(function (e) {
            return r_GameKeyMgr.GameKeyMgr.has(e.key);
          });
          y = r_BehaviorMgr.BehaviorMgr.replaceKey(t.entity.defaultClipName);
          o && (y = r_BehaviorMgr.BehaviorMgr.replaceKey(o.actionId));
        }
        null === (e = t.entity.spineNode) || undefined === e || e.getComponent(sp.Skeleton).setAnimation(0, y, true);
        t.entity.isHideBub && cc.tween(t.entity.bubNode).to(.2, {
          opacity: 0
        }).start();
        r_LoadMgr.default.audioCallback = null;
      };
      r_LoadMgr.default.audioCallback = function () {
        i();
      };
      cc.audioEngine.setFinishCallback(r_GameKeyMgr.GameKeyMgr.audioID, i);
    });
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_ActorCom.ActorCom)], _ctor);
}();
exports.ActorSys = exp_ActorSys;