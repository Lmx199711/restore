var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PenaltyUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_PenaltyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.PenaltyUI) || this;
    t.uiType = "fullScreen";
    t.tiqiuAnim = null;
    t.anniuAnim = null;
    t.timeoutIndex = -1;
    t.shootNum = 0;
    t.clickTime = 5;
    t.startTime = 3;
    t.intervalId = -1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PenaltyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PenaltyUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    r_PoolSystem.PoolSystem.createUIObjPool("NumTip", "ui://Lottery/NumTip", 1, this.contentPane);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.progressBar = this.contentPane.getChild("progressBar").asProgress;
    this.timeText = this.contentPane.getChild("timeText").asTextField;
    this.downCount = this.contentPane.getChild("downCount").asTextField;
    this.btnShootNum = this.contentPane.getChild("btnShootNum").asButton;
    this.btnShootNum.onClick(this.onClickShootNum, this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/tiqiu", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.contentPane.getChild("center").node.addChild(i);
      t.contentPane.visible = true;
      t.tiqiuAnim = i.getComponent(sp.Skeleton);
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/anniu", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.btnShootNum.node.addChild(i);
      t.anniuAnim = i.getComponent(sp.Skeleton);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.shootNum = 0;
    this.clickTime = 5;
    this.startTime = 3;
    this.downCount.visible = true;
    this.progressBar.value = 0;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.timeText.text = "";
    this.downCount.text = this.startTime.toString();
    this.intervalId = setInterval(this.startDownTime.bind(this), 1e3);
    this.contentPane.getChild("n46").visible = false;
    this.showTiqiuAnim("step_1_daiji", null, true);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    -1 != this.intervalId && clearInterval(this.intervalId);
  };
  _ctor.prototype.startDownTime = function () {
    if (this.tiqiuAnim) {
      this.startTime--;
      this.downCount.text = this.startTime.toString();
      if (this.startTime <= 0) {
        clearInterval(this.intervalId);
        this.downCount.visible = false;
        this.timeText.text = this.clickTime.toString();
        this.intervalId = setInterval(this.downTime.bind(this), 1e3);
        this.contentPane.getChild("n46").visible = true;
      }
    }
  };
  _ctor.prototype.onClickShootNum = function () {
    if (!(this.startTime > 0 || this.clickTime <= 0)) {
      this.shootNum++;
      this.progressBar.value = this.shootNum;
      this.anniuAnim.setAnimation(0, "animation", false);
      r_UtilsSystem.UtilsSystem.showCoinTip("+" + this.shootNum, cc.v2(this.btnShootNum.x + 130, this.btnShootNum.y - 100), "NumTip");
      r_SoundMgr.SoundMgr.playSound("按钮");
    }
  };
  _ctor.prototype.downTime = function () {
    var e = this;
    this.clickTime--;
    this.timeText.text = this.clickTime.toString();
    if (this.clickTime <= 0) {
      clearInterval(this.intervalId);
      this.intervalId = -1;
      setTimeout(function () {
        e.contentPane.getController("c1").selectedIndex = 1;
        e.showTiqiuAnim("step_2_tiqiu", function () {
          var t = Math.floor(e.shootNum / 5);
          e.showJieqiu(t);
        });
      }, 1e3);
    }
  };
  _ctor.prototype.showJieqiu = function (e) {
    var t = this;
    if (e > 1) {
      e--;
      this.showTiqiuAnim("step_3_jieqiu", function () {
        t.showJieqiu(e);
      });
    } else {
      this.addCoin();
      setTimeout(function () {
        t.hide();
      }, 1e3);
    }
  };
  _ctor.prototype.showTiqiuAnim = function (e, t, o) {
    undefined === o && (o = false);
    if (this.tiqiuAnim) {
      this.tiqiuAnim.setAnimation(0, e, o);
      this.tiqiuAnim.setCompleteListener(function () {
        t && t();
      });
    }
  };
  _ctor.prototype.addCoin = function () {
    return __awaiter(this, undefined, undefined, function () {
      var e;
      var t;
      return __generator(this, function (o) {
        switch (o.label) {
          case 0:
            e = Math.floor(this.shootNum / 5);
            t = 0;
            o.label = 1;
          case 1:
            if (t < e) {
              r_PlayerData.PlayerData.addCoin("点球大战彩蛋", 5e6, r_ReportSystem.SystemKey.彩票);
              return [4, new Promise(function (e) {
                setTimeout(function () {
                  e(1);
                }, 200);
              })];
            } else {
              return [3, 4];
            }
          case 2:
            o.sent();
            o.label = 3;
          case 3:
            t++;
            return [3, 1];
          case 4:
            return [2];
        }
      });
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PenaltyUI = exp_PenaltyUI;