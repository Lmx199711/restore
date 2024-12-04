var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_EffectsCom = require("EffectsCom");
var r_YugongUI = require("YugongUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_YugongCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.yug = null;
    t.jinkuai = null;
    t.showNode = null;
    t.jinshan = null;
    t.m_count = 0;
    t.m_isTouch = true;
    t.m_isOnce = true;
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
  _ctor.prototype.init = function () {};
  _ctor.prototype.passLevel = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.failLevel = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.onLoad = function () {
    this.m_count = 0;
    this.yug.setCompleteListener(this.animComplete.bind(this));
    this.yug.setAnimation(0, "1", false);
    this.jinkuai.node.active = false;
  };
  _ctor.prototype.start = function () {
    this.init();
  };
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.update = function () {};
  _ctor.prototype.onClickSp = function () {
    if (r_YugongUI.default.instace.caidanTigger && !r_YugongUI.default.instace.btnAgain.visible) {
      if (cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) {
        ;
      } else if (0 != r_PlayerData.PlayerData.data.yugongCaidanNum) {
        return;
      }
      if (this.m_isTouch) {
        r_YugongUI.default.instace.btnBack.visible = false;
        this.m_count++;
        if (this.m_count < 3) {
          this.yug.node.active = true;
          this.m_isTouch = false;
          this.yug.setAnimation(0, "2", false);
          r_SoundMgr.SoundMgr.playSound("yugong/锄头砸山");
        }
        if (this.m_count >= 3) {
          this.yug.node.active = true;
          this.m_isTouch = false;
          this.yug.setAnimation(0, "3", false);
          this.node.getChildByName("touch").active = true;
          r_YugongUI.default.instace.setAward(true);
          r_YugongUI.default.instace.caidanTigger = false;
          r_SoundMgr.SoundMgr.playSound("yugong/山倒塌");
          r_PlayerData.PlayerData.data.yugongCaidanNum = 1;
        }
      }
    }
  };
  _ctor.prototype.animComplete = function () {
    var e = this;
    if ("2" == this.yug.animation && this.m_count <= 2) {
      this.m_isTouch = true;
    } else if ("3" == this.yug.animation) {
      r_BehaviorMgr.BehaviorMgr.trigger("动画播放完");
      this.jinshan.scale = .74;
      this.jinshan.setPosition(cc.v2(-109, 420));
      this.jinshan.active = true;
      cc.tween(this.jinshan).to(.5, {
        x: 0,
        y: 260,
        scale: 1
      }).call(function () {
        e.jinshan.active = false;
        e.showNode.active = true;
      }).start();
    }
  };
  _ctor.prototype.clcikJinkuai = function () {
    var e = this;
    if (this.m_isOnce) {
      r_SoundMgr.SoundMgr.playSound("yugong/金砖掉落");
      r_EffectsCom.default.instace.shake(6);
      this.jinkuai.node.active = true;
      this.jinkuai.setAnimation(0, "animation2", false);
      this.m_isOnce = false;
      r_TimeSystem.TimeSystem.scheduleOnce("clcikJinkuai", 6, function () {
        cc.tween(e.jinkuai.node).to(.5, {
          opacity: 0
        }).call(function () {
          e.jinkuai.node.active = false;
          e.jinkuai.node.opacity = 255;
        }).start();
        e.showNode.active = false;
        r_YugongUI.default.instace.btnBack.visible = true;
        e.node.getChildByName("touch").active = false;
        e.yug.setAnimation(0, "1", false);
        e.m_count = 0;
        e.m_isTouch = true;
        e.m_isOnce = true;
      });
    }
    r_PlayerData.PlayerData.addCoin("点击金砖", 1e5, r_ReportSystem.SystemKey.彩票);
  };
  _ctor.prototype.onDestroy = function () {};
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "yug", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "jinkuai", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "showNode", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "jinshan", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_YugongCom;