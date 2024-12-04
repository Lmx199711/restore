var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewTipsUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_BaseLayer = require("BaseLayer");
require("GameTipUI");
var r_LoadMgr = require("LoadMgr");
var r_LevelConfig = require("LevelConfig");
var r_GameEvent = require("GameEvent");
var r_PlatformSystem = require("PlatformSystem");
var exp_ViewTipsUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Wenzi, r_UIDef.UIDef.Res.UI.ViewTipsUI) || this;
    t.tipMap = {};
    return t;
  }
  __extends(_ctor, e);
  _ctor.reset = function () {
    this.clickAnswerCallBack = null;
  };
  _ctor.showAnserTip = function (e, o) {
    _ctor.showUI({
      type: "showTip",
      content: e,
      pngUrl: o
    });
  };
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ViewTipsUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ViewTipsUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback("close", "tip", "answer");
    this.tipSprite = this.contentPane.getChild("icon").asLoader;
    this.ansSprite = this.contentPane.getChild("icon2").asLoader;
    this.imgText_img = this.contentPane.getChild("icon3").asLoader;
    this.tipLabel = this.contentPane.getChild("txt1").asTextField;
    this.ansLabel = this.contentPane.getChild("txt2").asTextField;
    this.imgText_txt = this.contentPane.getChild("txt3").asTextField;
    this.c1 = this.contentPane.getController("c1");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_Index.App.inst.dispatchEventWith(r_GameEvent.default.ResumeGame);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_Index.App.inst.dispatchEventWith(r_GameEvent.default.PauseGame);
    if (_ctor.needRefreshPage) {
      this.initViewTip();
      _ctor.needRefreshPage = false;
    }
    if (this.data && "showTip" == this.data.type) {
      if (this.data.pngUrl) {
        this.c1.selectedIndex = 3;
        this.loadImgText_Img(this.data.pngUrl);
      } else {
        this.c1.selectedIndex = 2;
        this.ansLabel.text = this.data.content;
        this.ansSprite.texture = null;
      }
    }
  };
  _ctor.prototype.loadImgText_Img = function (e) {
    return __awaiter(this, undefined, undefined, function () {
      var t;
      return __generator(this, function (o) {
        switch (o.label) {
          case 0:
            t = this;
            return [4, r_LoadMgr.default.loadResImgFuncByLevel(e)];
          case 1:
            t.tempImg = o.sent();
            this.imgText_img.texture = this.tempImg;
            this.imgText_txt.text = this.data.content;
            return [2];
        }
      });
    });
  };
  _ctor.prototype.initViewTip = function () {
    this.refreshUI();
    var e = r_LevelConfig.default.levelInfo[r_LoadMgr.default.currLv];
    if ("url" == e.tip1) {
      this.tipSprite.texture = r_LoadMgr.default.labelTip;
      this.tipLabel.text = "";
    } else {
      this.tipLabel.text = e.tip1;
      this.tipSprite.texture = null;
    }
    if ("url" == e.tip2) {
      this.ansSprite.texture = r_LoadMgr.default.ansTip;
      this.ansLabel.text = "";
    } else {
      this.ansLabel.text = e.tip2;
      this.ansSprite.texture = null;
    }
  };
  _ctor.prototype.refreshUI = function () {
    if (this.tipMap[r_LoadMgr.default.currLv] && null != this.tipMap[r_LoadMgr.default.currLv].answer) {
      this.c1.selectedIndex = 2;
    } else if (this.tipMap[r_LoadMgr.default.currLv] && null != this.tipMap[r_LoadMgr.default.currLv].tip) {
      this.c1.selectedIndex = 1;
    } else {
      this.c1.selectedIndex = 0;
    }
  };
  _ctor.prototype.refreshBtnStatus = function () {
    var e = this.page.getCurrentPageIndex();
    var t = this.page.getPages().length;
    this.prevBtn.visible = e > 0;
    this.nextBtn.visible = e < t - 1;
  };
  _ctor.prototype.nextCallback = function () {
    var e = this.page.getCurrentPageIndex();
    this.page.setCurrentPageIndex(e + 1);
    this.refreshBtnStatus();
  };
  _ctor.prototype.prevCallback = function () {
    var e = this.page.getCurrentPageIndex();
    this.page.setCurrentPageIndex(e - 1);
    this.refreshBtnStatus();
  };
  _ctor.prototype.closeCallback = function () {
    this.continueCallback();
  };
  _ctor.prototype.tipCallback = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("查看提示" + r_LoadMgr.default.currLv, function () {
      e.tipMap[r_LoadMgr.default.currLv] || (e.tipMap[r_LoadMgr.default.currLv] = {});
      e.tipMap[r_LoadMgr.default.currLv].tip = 1;
      e.refreshUI();
    });
  };
  _ctor.prototype.answerCallback = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("查看答案" + r_LoadMgr.default.currLv, function () {
      e.tipMap[r_LoadMgr.default.currLv] || (e.tipMap[r_LoadMgr.default.currLv] = {});
      e.tipMap[r_LoadMgr.default.currLv].answer = 1;
      e.refreshUI();
    });
  };
  _ctor.prototype.continueCallback = function () {
    this.hide();
  };
  _ctor.Inst = null;
  _ctor.clickAnswerCallBack = null;
  _ctor.needRefreshPage = false;
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.ViewTipsUI = exp_ViewTipsUI;