var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_ComputerResultUI = require("ComputerResultUI");
var r_ComputerTimeUI = require("ComputerTimeUI");
var def_ComputerUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Computer, r_UIDef.UIDef.Res.UI.ComputerUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.m_touchChangeNum = 3;
    t.m_touchChangeNum1 = 1;
    t.m_contetntNum = 1;
    t.m_maxContentNum = 3;
    t.m_contetntTouchNum = 0;
    t.m_displayerNum = 1;
    t.m_maxDisplayerNum = 11;
    t.m_displayerTouchNum = 0;
    t.m_frontNum = 1;
    t.m_maxFrontNum = 8;
    t.m_frontTouchNum = 0;
    t.m_onNum = 1;
    t.m_maxOnNum = 7;
    t.m_onTouchNum = 0;
    t.m_rightNum = 1;
    t.m_maxRightNum = 7;
    t.m_rightTouchNum = 0;
    t.m_keyboardNum = 1;
    t.m_maxKeyboardNum = 8;
    t.m_keyboardTouchNum = 0;
    t.m_mouseNum = 1;
    t.m_maxMouseNum = 7;
    t.m_mouseTouchNum = 0;
    t.m_cdNum = 1;
    t.m_maxCdNum = 4;
    t.m_cdTouchNum = 0;
    t.m_time = 60;
    t.m_params = [];
    t.isTouch = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.imgContent = this.imgMster.getChild("imgContent");
    this.imgFront = this.imgMster.getChild("imgFront");
    this.imgOn = this.imgMster.getChild("imgOn");
    this.imgRight = this.imgMster.getChild("imgRight");
    this.imgCD = this.imgMster.getChild("imgCD");
    this.contetntV2 = cc.v2(this.imgContent.x, this.imgContent.y);
    this.frontV2 = cc.v2(this.imgFront.x, this.imgFront.y);
    this.imgOnV2 = cc.v2(this.imgOn.x, this.imgOn.y);
    this.imgRightV2 = cc.v2(this.imgRight.x, this.imgRight.y);
    this.imgCDV2 = cc.v2(this.imgCD.x, this.imgCD.y);
    this.displayerV2 = cc.v2(this.displayer.x, this.displayer.y);
    this.bindBtnCallback(this.imgContent, this.displayer, this.imgFront, this.imgOn, this.imgRight, this.imgKeyboard, this.imgMouse, this.imgCD, this.btnStart);
    this.m_params = [["m_contetntTouchNum", "m_contetntNum", "m_maxContentNum", this.imgContent, "content", 1], ["m_frontTouchNum", "m_frontNum", "m_maxFrontNum", this.imgFront, "front", 0], ["m_rightTouchNum", "m_rightNum", "m_maxRightNum", this.imgRight, "right", 0], ["m_onTouchNum", "m_onNum", "m_maxOnNum", this.imgOn, "on", 0], ["m_displayerTouchNum", "m_displayerNum", "m_maxDisplayerNum", this.displayer, "displayer", 0], ["m_keyboardTouchNum", "m_keyboardNum", "m_maxKeyboardNum", this.imgKeyboard, "keyboard", 1], ["m_mouseTouchNum", "m_mouseNum", "m_maxMouseNum", this.imgMouse, "mouse", 1], ["m_cdTouchNum", "m_cdNum", "m_maxCdNum", this.imgCD, "cd", 1]];
  };
  _ctor.prototype.touchProp = function (e, t) {
    var o = this.m_params[e];
    t && this[o[0]]++;
    this.showNum(o[0], o[1], o[2], o[3], o[4], o[5]);
  };
  _ctor.prototype.showNum = function (e, t, o, i, n, a) {
    undefined === a && (a = 1);
    var s = Math.floor(this[e] / (0 == a ? this.m_touchChangeNum : this.m_touchChangeNum1)) + 1;
    this.changeType(s, t, o, i, n);
  };
  _ctor.prototype.changeType = function (e, t, o, i, n) {
    if (this[o] >= e) {
      this[t] = e;
    } else {
      this[t] = this[o];
    }
    i.url = "ui://Computer/" + n + this[t];
  };
  _ctor.prototype.getStarNum = function () {
    var e = 0;
    this.m_contetntNum >= this.m_maxContentNum && this.m_contetntNum >= this.m_maxContentNum && this.m_frontNum >= this.m_maxFrontNum && this.m_rightNum >= this.m_maxRightNum && this.m_onNum >= this.m_maxOnNum && e++;
    this.m_displayerNum >= this.m_maxDisplayerNum && e++;
    this.m_keyboardNum >= this.m_maxKeyboardNum && e++;
    this.m_mouseNum >= this.m_maxMouseNum && e++;
    this.m_cdNum >= this.m_maxCdNum && e++;
    if (5 == e) {
      r_TimeSystem.TimeSystem.scheduleClear("soc");
      this.isTouch = false;
      r_TimeSystem.TimeSystem.scheduleOnce("gameSucc", 1, this.gameSucc.bind(this));
    }
    return 20 * e;
  };
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ComputerUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ComputerUI);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("gameSucc");
    r_TimeSystem.TimeSystem.scheduleClear("soc");
    r_TimeSystem.TimeSystem.scheduleClear("playContetnt");
    r_TimeSystem.TimeSystem.scheduleClear("onClickbtnStart");
    r_TimeSystem.TimeSystem.scheduleClear("handTouch");
  };
  _ctor.prototype.restart = function () {
    this.initView();
  };
  _ctor.prototype.refreshTime = function () {
    var e = this;
    this.m_time = 60;
    this.labTime.text = this.m_time + "s";
    r_TimeSystem.TimeSystem.schedule("soc", 1, function () {
      e.m_time--;
      e.labTime.text = e.m_time + "s";
      if (e.m_time <= 0) {
        r_TimeSystem.TimeSystem.scheduleClear("soc");
        r_ComputerTimeUI.default.showUI({
          callBack: function () {
            e.refreshTime();
          },
          star: e.getStarNum() / 20
        });
      }
    });
  };
  _ctor.prototype.initView = function () {
    this.m_contetntNum = 1;
    this.m_contetntTouchNum = 0;
    this.m_displayerNum = 1;
    this.m_displayerTouchNum = 0;
    this.m_frontNum = 1;
    this.m_frontTouchNum = 0;
    this.m_onNum = 1;
    this.m_onTouchNum = 0;
    this.m_rightNum = 1;
    this.m_rightTouchNum = 0;
    this.m_keyboardNum = 1;
    this.m_keyboardTouchNum = 0;
    this.m_mouseNum = 1;
    this.m_mouseTouchNum = 0;
    this.m_cdNum = 1;
    this.m_cdTouchNum = 0;
    this.imgContent.x = this.contetntV2.x;
    this.imgContent.y = this.contetntV2.y;
    this.imgContent.visible = true;
    this.imgContent.enabled = true;
    this.imgContent.alpha = 1;
    this.playContetnt(1);
    this.imgFront.x = this.frontV2.x;
    this.imgFront.y = this.frontV2.y;
    this.imgFront.visible = true;
    this.imgFront.enabled = true;
    this.imgFront.alpha = 1;
    this.imgOn.x = this.imgOnV2.x;
    this.imgOn.y = this.imgOnV2.y;
    this.imgOn.visible = true;
    this.imgOn.enabled = true;
    this.imgOn.alpha = 1;
    this.imgRight.x = this.imgRightV2.x;
    this.imgRight.y = this.imgRightV2.y;
    this.imgRight.visible = true;
    this.imgRight.enabled = true;
    this.imgRight.alpha = 1;
    this.imgCD.x = this.imgCDV2.x;
    this.imgCD.y = this.imgCDV2.y;
    this.imgCD.visible = false;
    this.imgCD.enabled = false;
    this.imgCD.alpha = 1;
    this.displayer.y = this.displayerV2.y;
    this.displayer.enabled = true;
    this.showProp();
    this.pro.value = this.getStarNum();
    this.isTouch = true;
    [this.hanDisplayer, this.hanFront, this.hanKey, this.hanMouse, this.hanOn, this.hanRight, this.hanCD].forEach(function (e) {
      e.visible = false;
    });
    this.btnStart.visible = true;
    this.animBug.visible = false;
    this.contentPane.getController("c1").selectedIndex = 0;
    r_SoundMgr.SoundMgr.playSound("computer/老公帮我拿下毛巾_01");
  };
  _ctor.prototype.showProp = function () {
    var e = this;
    Object.values(m).forEach(function (t) {
      0 != t && e.touchProp(t, false);
    });
  };
  _ctor.prototype.gameStart = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    this.refreshTime();
  };
  _ctor.prototype.onClickbtnStart = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("computer/死机之歌");
    this.btnStart.visible = false;
    this.animBug.visible = true;
    this.animBug.playing = false;
    this.animBug.loop = false;
    this.animBug.animationName = "siji";
    this.animBug.playing = true;
    r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnStart", 8, function () {
      e.gameStart();
    });
  };
  _ctor.prototype.onClickimgContent = function () {
    var e = this;
    if (this.isTouch && this.m_frontNum >= this.m_maxFrontNum && this.m_onNum >= this.m_maxOnNum && this.m_onNum >= this.m_maxOnNum && this.m_rightNum >= this.m_maxRightNum) {
      this.handTouch(this.hanFront);
      this.m_contetntNum++;
      this.m_contetntTouchNum++;
      if (this.m_contetntNum >= this.m_maxContentNum) {
        this.playContetnt(3, false);
        this.imgContent.enabled = false;
        r_SoundMgr.SoundMgr.playSound("computer/主机爆炸声_01");
        r_TimeSystem.TimeSystem.scheduleOnce("playContetnt", .5, function () {
          e.playContetnt(4);
        });
      }
      this.pro.value = this.getStarNum();
      this.playFightTween(this.imgMster);
    }
  };
  _ctor.prototype.onClickimgFront = function () {
    var e = this;
    if (this.isTouch) {
      this.touchProp(1, true);
      this.pro.value = this.getStarNum();
      this.playFightTween(this.imgMster);
      this.handTouch(this.hanFront);
      r_SoundMgr.SoundMgr.playSound("computer/拳头砸_01");
      if (this.m_frontNum == this.m_maxFrontNum - 1) {
        this.imgCD.visible = true;
        this.touchProp(7, false);
        this.imgCD.enabled = false;
      } else if (this.m_frontNum >= this.m_maxFrontNum) {
        r_SoundMgr.SoundMgr.playSound("computer/小东西被打落_01");
        this.imgMster.getTransition("animFront").play();
        this.setContetntType();
        this.imgMster.getTransition("animCD").play(function () {
          e.imgCD.enabled = true;
          e.m_cdNum = 2;
          e.m_cdTouchNum = 1;
        });
      }
    }
  };
  _ctor.prototype.onClickimgRight = function () {
    if (this.isTouch) {
      this.touchProp(2, true);
      r_SoundMgr.SoundMgr.playSound("computer/用力拍_01");
      this.pro.value = this.getStarNum();
      this.playFightTween(this.imgMster);
      this.handTouch(this.hanRight);
      if (this.m_rightNum >= this.m_maxRightNum) {
        this.imgMster.getTransition("animRight").play();
        this.setContetntType();
      }
    }
  };
  _ctor.prototype.onClickimgOn = function () {
    if (this.isTouch) {
      this.touchProp(3, true);
      this.pro.value = this.getStarNum();
      this.handTouch(this.hanOn);
      r_SoundMgr.SoundMgr.playSound("computer/拳头砸_01");
      this.playFightTween(this.imgMster);
      if (this.m_onNum >= this.m_maxOnNum) {
        this.imgMster.getTransition("animOn").play();
        this.setContetntType();
        this.imgOn.enabled = false;
      }
    }
  };
  _ctor.prototype.onClickdisplayer = function () {
    if (this.isTouch) {
      this.touchProp(4, true);
      this.pro.value = this.getStarNum();
      this.handTouch(this.hanDisplayer);
      r_SoundMgr.SoundMgr.playSound("computer/出拳直接打_01");
      21 == this.m_displayerTouchNum && r_SoundMgr.SoundMgr.playSound("computer/屏幕碎_01");
      if (this.m_displayerNum >= 9) {
        24 == this.m_displayerTouchNum && r_SoundMgr.SoundMgr.playSound("computer/小东西被打落_01");
        this.displayer.y = this.displayerV2.y + 70;
      }
      if (this.m_displayerNum >= this.m_maxDisplayerNum) {
        r_SoundMgr.SoundMgr.playSound("computer/显示器爆炸_01");
        this.displayer.enabled = false;
        r_UtilsSystem.UtilsSystem.playAnim(this.animYan, "jies", false);
      }
      this.playFightTween(this.displayer);
    }
  };
  _ctor.prototype.onClickimgKeyboard = function () {
    if (this.isTouch) {
      this.handTouch(this.hanKey);
      r_SoundMgr.SoundMgr.playSound("computer/拳头砸_01");
      this.touchProp(5, true);
      this.pro.value = this.getStarNum();
      this.playFightTween(this.imgKeyboard);
      this.playMouseAnim();
    }
  };
  _ctor.prototype.onClickimgMouse = function () {
    if (this.isTouch) {
      this.handTouch(this.hanMouse);
      r_SoundMgr.SoundMgr.playSound("computer/拳头砸_01");
      this.touchProp(6, true);
      this.pro.value = this.getStarNum();
      this.playFightTween(this.imgMouse);
    }
  };
  _ctor.prototype.onClickimgCD = function () {
    if (this.isTouch) {
      this.handTouch(this.hanCD);
      r_SoundMgr.SoundMgr.playSound("computer/拳头砸_01");
      this.touchProp(7, true);
      this.pro.value = this.getStarNum();
      this.playFightTween(this.imgCD);
    }
  };
  _ctor.prototype.playFightTween = function (e) {
    cc.Tween.stopAllByTarget(e.node);
    cc.tween(e.node).to(.05, {
      angle: -1
    }).to(.05, {
      angle: 1
    }).to(.05, {
      angle: -1
    }).to(.05, {
      angle: 1
    }).to(.05, {
      angle: 0
    }).start();
  };
  _ctor.prototype.setContetntType = function () {
    this.m_contetntNum = 2;
    this.m_contetntTouchNum = 1;
    this.playContetnt(2);
  };
  _ctor.prototype.playContetnt = function (e, t) {
    undefined === t && (t = true);
    this.imgContent.playing = false;
    this.imgContent.loop = t;
    this.imgContent.animationName = "diann_" + e;
    this.imgContent.playing = true;
  };
  _ctor.prototype.playMouseAnim = function () {
    this.animMouse.playing = false;
    this.animMouse.loop = false;
    this.animMouse.animationName = "anjian_4";
    this.animMouse.playing = true;
  };
  _ctor.prototype.handTouch = function (e) {
    var t = this;
    e.visible = true;
    e.playing = false;
    e.playing = true;
    this.isTouch = false;
    r_TimeSystem.TimeSystem.scheduleOnce("handTouch", .2, function () {
      e.visible = false;
      t.isTouch = true;
    });
  };
  _ctor.prototype.gameSucc = function () {
    r_TimeSystem.TimeSystem.scheduleClear("gameSucc");
    r_ComputerResultUI.default.showUI({
      star: this.getStarNum() / 20
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("imgMster")], _ctor.prototype, "imgMster", undefined);
  __decorate([r_DecorateFunction1.AutoFind("displayer")], _ctor.prototype, "displayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgKeyboard")], _ctor.prototype, "imgKeyboard", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgMouse")], _ctor.prototype, "imgMouse", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pro")], _ctor.prototype, "pro", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hanOn")], _ctor.prototype, "hanOn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hanDisplayer")], _ctor.prototype, "hanDisplayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hanFront")], _ctor.prototype, "hanFront", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hanRight")], _ctor.prototype, "hanRight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hanKey")], _ctor.prototype, "hanKey", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hanMouse")], _ctor.prototype, "hanMouse", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hanCD")], _ctor.prototype, "hanCD", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animBug")], _ctor.prototype, "animBug", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animMouse")], _ctor.prototype, "animMouse", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animYan")], _ctor.prototype, "animYan", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ComputerUI;
var f;
var m = {
  主机内部: 0,
  主机正面: 1,
  主机右边: 2,
  主机上面: 3,
  显示器: 4,
  键盘: 5,
  鼠标: 6
};
(function (e) {
  e[e["主机"] = 0] = "主机";
  e[e["显示器"] = 1] = "显示器";
  e[e["键盘"] = 2] = "键盘";
  e[e["鼠标"] = 3] = "鼠标";
  e[e["光驱"] = 4] = "光驱";
})(f || (f = {}));