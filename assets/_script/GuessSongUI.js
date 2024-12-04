var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessSongUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_GuessSongCfg = require("GuessSongCfg");
var r_SoundMgr = require("SoundMgr");
var r_GuessSongResultUI = require("GuessSongResultUI");
var r_PlayerData = require("PlayerData");
var r_FguiGestureSys = require("FguiGestureSys");
var r_HouseUI = require("HouseUI");
var r_MinGameUI = require("MinGameUI");
var r_PhoneUI = require("PhoneUI");
var exp_GuessSongUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GuessSong, r_UIDef.UIDef.Res.UI.GuessSongUI) || this;
    t.liricIndex = 0;
    t.songIndex = 0;
    t.inputList = [];
    t.isAnswer = false;
    t.hp = 3;
    t.anims = ["animation", "animation2", "animation3"];
    t.moneyCount = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GuessSongUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GuessSongUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.hpCtr = this.contentPane.getChild("hp").asCom.getController("c1");
    this.soundCtr = this.contentPane.getChild("sound").asCom.getController("c1");
    this.keyboard = this.contentPane.getChild("keyboard").asCom;
    this.lyricText = this.contentPane.getChild("lyricText").asTextField;
    this.answerText = this.keyboard.getChild("answerText").asTextField;
    this.keyboard.getChild("btnTip").onClick(function () {
      t.isAnswer || r_PlatformSystem.PlatformSystem.showVideo("提示", function () {
        var e = r_GuessSongCfg.GuessSongCfg[t.songIndex];
        t.answerText.text = e.answer;
        t.answerCorrect();
      });
    }, this);
    this.keyboard.getChild("btnOK").onClick(function () {
      if (!t.isAnswer) {
        var e = r_GuessSongCfg.GuessSongCfg[t.songIndex];
        if (t.answerText.text == e.answer) {
          t.answerCorrect();
        } else {
          "" != t.answerText.text && t.answerWrong();
        }
      }
    }, this);
    this.keyboard.getChild("btnNO").onClick(function () {
      t.isAnswer || 0 != t.inputList.length && (t.inputList.pop().selected = false, t.answerText.text = t.answerText.text.slice(0, t.answerText.text.length - 1));
    }, this);
    this.list = this.keyboard.getChild("list").asList;
    this.list.itemRenderer = this.listItemRenderer.bind(this);
    r_ResSystem.ResSystem.loadBundleRes("game2", "GuessSong/mk", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.contentPane.getChild("light").node.addChild(i);
    });
    r_ResSystem.ResSystem.loadBundleRes("game2", "GuessSong/tw", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.contentPane.getChild("role").node.addChild(i);
      t.roleAnim = i.getComponent(sp.Skeleton);
      t.showAnim();
    });
    this.initCaidan();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.songIndex = 0;
    this.hp = 3;
    this.hpCtr.selectedIndex = this.hp;
    this.initSong(this.songIndex);
    r_SoundMgr.SoundMgr.pauseMusic();
    this.showCaidan(0);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("showLiric");
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("showLiric");
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.resumeMusic();
  };
  _ctor.prototype.initSong = function (e) {
    if (!(e >= r_GuessSongCfg.GuessSongCfg.length)) {
      var t = r_GuessSongCfg.GuessSongCfg[e];
      this.liricIndex = 0;
      this.answerText.text = "";
      this.list.numItems = t.keyboard.length;
      this.inputList.length = 0;
      this.isAnswer = false;
      this.soundCtr.selectedIndex = 0;
      this.showLiric();
      this.showAnim();
      r_SoundMgr.SoundMgr.playSound("guessSong/跳舞BGM_01_01", true);
    }
  };
  _ctor.prototype.showAnim = function () {
    if (this.roleAnim) {
      this.roleAnim.paused = false;
      var e = this.songIndex % this.anims.length;
      this.roleAnim.setAnimation(0, this.anims[e], true);
    }
  };
  _ctor.prototype.showLiric = function () {
    var e = this;
    var t = r_GuessSongCfg.GuessSongCfg[this.songIndex];
    if (this.liricIndex >= t.lyric.length) {
      r_TimeSystem.TimeSystem.clearTimeMapUpdate("showLiric");
      if (this.isAnswer) {
        if (this.songIndex < r_GuessSongCfg.GuessSongCfg.length - 1) {
          this.songIndex++;
          this.initSong(this.songIndex);
        } else {
          this.lyricText.text = "";
          r_SoundMgr.SoundMgr.stopAllSound();
          r_GuessSongResultUI.GuessSongResultUI.showUI({
            result: 0
          });
        }
      } else {
        this.lyricText.text = "";
        r_SoundMgr.SoundMgr.stopAllSound();
        this.roleAnim.paused = true;
      }
    } else {
      var o = t.lyric[this.liricIndex];
      this.lyricText.text = o;
      var i = -1;
      r_TimeSystem.TimeSystem.timeMapUpdate("showLiric", t.time[this.liricIndex + 1] - t.time[this.liricIndex], function (t) {
        var n = Math.floor(o.length * t) + 1;
        if (n != i) {
          i = n;
          e.lyricText.text = "[color=#0000FF]" + o.substring(0, n) + "[/color]" + o.substring(n);
        }
      });
      r_TimeSystem.TimeSystem.scheduleOnce("showLiric", t.time[this.liricIndex + 1] - t.time[this.liricIndex], function () {
        e.showLiric();
      });
      this.liricIndex++;
    }
  };
  _ctor.prototype.answerCorrect = function () {
    this.isAnswer = true;
    this.liricIndex = 0;
    this.soundCtr.selectedIndex = 1;
    var e = r_GuessSongCfg.GuessSongCfg[this.songIndex];
    this.showLiric();
    this.showAnim();
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound(e.songUrl);
  };
  _ctor.prototype.answerWrong = function () {
    this.hp--;
    this.hpCtr.selectedIndex = this.hp;
    this.hp <= 0 && r_GuessSongResultUI.GuessSongResultUI.showUI({
      result: 1
    });
    r_SoundMgr.SoundMgr.playSound("错误提示");
  };
  _ctor.prototype.listItemRenderer = function (e, t) {
    var o = this;
    var i = r_GuessSongCfg.GuessSongCfg[this.songIndex];
    var n = t.getChild("text").asTextField;
    n.text = i.keyboard[e];
    t.selected = false;
    t.clearClick();
    t.onClick(function () {
      if (!(t.selected || o.inputList.length >= 6 || o.isAnswer)) {
        t.selected = true;
        var a = new fgui.GTextField();
        o.keyboard.addChild(a);
        a.font = n.font;
        a.fontSize = n.fontSize;
        a.color = n.color;
        a.setPivot(.5, .5, true);
        a.text = i.keyboard[e];
        a.setSize(n.width, n.height);
        a.setPosition(o.list.x + t.x + t.width / 2, o.list.y + t.y + t.height / 2);
        cc.tween(a).to(.1, {
          x: o.answerText.x,
          y: o.answerText.y
        }).call(function () {
          a.dispose();
          if (o.inputList.length < 6) {
            o.answerText.text += i.keyboard[e];
            o.inputList.push(t);
          }
        }).start();
      }
    }, this);
  };
  _ctor.prototype.initCaidan = function () {
    var e = this;
    this.contentPane.getChild("btnCaidan").onClick(function () {
      r_PlayerData.PlayerData.data.miniGame.guessSongCaidan = true;
      r_PlayerData.PlayerData.data.baomuId2 = 1;
      r_PlayerData.PlayerData.data.baomuId = null;
      r_PlayerData.PlayerData.saveData();
      e.hide();
      r_MinGameUI.MinGameUI.hide();
      r_PhoneUI.PhoneUI.hide();
      r_HouseUI.default.instace && r_HouseUI.default.instace.isShowing && r_HouseUI.default.instace.restart();
      r_HouseUI.default.showUI();
    }, this);
    var t = this.contentPane.getChild("role2");
    var o = function (o) {
      var n = i.contentPane.getChild("money" + o);
      var a = cc.v2(n.x, n.y);
      r_FguiGestureSys.FguiGestureSys.bindMoveEvent("GuessSongMoney" + o, n, n, t, function () {
        n.x = a.x;
        n.y = a.y;
        n.visible = false;
        e.moneyCount++;
        e.moneyCount >= 9 && (e.contentPane.getChild("btnCaidan").visible = true);
      });
    };
    var i = this;
    for (var n = 0; n < 9; n++) {
      o(n);
    }
  };
  _ctor.prototype.showCaidan = function (e) {
    this.contentPane.getController("c1").selectedIndex = e;
    if (1 == e) {
      this.contentPane.getChild("btnCaidan").visible = false;
      this.moneyCount = 0;
      for (var t = 0; t < 3; t++) {
        this.contentPane.getChild("money" + t).visible = true;
      }
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.GuessSongUI = exp_GuessSongUI;