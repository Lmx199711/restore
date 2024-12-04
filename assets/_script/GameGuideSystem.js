Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryType = exports.GameGuideState = exports.GameGuideSystem = exports._GameGuideSystem = exports.GameGuideSate = undefined;
var r_UIDef = require("UIDef");
var r_DeskUI = require("DeskUI");
var r_GetItemComUI = require("GetItemComUI");
var r_SideGiftUI = require("SideGiftUI");
var r_FairyLandGuide = require("FairyLandGuide");
var r_GameGuide2ChatUI = require("GameGuide2ChatUI");
var r_GameGuide3ChatUI = require("GameGuide3ChatUI");
var r_GameGuideChatUI = require("GameGuideChatUI");
var r_GameGuideComicUI = require("GameGuideComicUI");
var r_GameGuideUI = require("GameGuideUI");
var r_OfflineUI = require("OfflineUI");
var r_SectionUI = require("SectionUI");
var r_FlayBtnSystem = require("FlayBtnSystem");
var r_GroupSystem = require("GroupSystem");
var r_LimitSystem = require("LimitSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
(function (e) {
  e[e["引导点击赚钱和升级"] = 0] = "引导点击赚钱和升级";
  e[e["剧情与柳如烟离婚"] = 1] = "剧情与柳如烟离婚";
  e[e["引导挑战"] = 2] = "引导挑战";
  e[e["剧情女儿读书"] = 3] = "剧情女儿读书";
  e[e["引导招募秘书"] = 4] = "引导招募秘书";
  e[e["剧情给女儿交学费"] = 5] = "剧情给女儿交学费";
})(exports.GameGuideSate || (exports.GameGuideSate = {}));
var S;
var exp__GameGuideSystem = function () {
  function _ctor() {
    this.cfg = {
      1: {
        content: "点击烤炉做烧烤赚钱",
        label: [0, 200],
        finger: [0, 0, 1]
      },
      2: {
        content: "赚钱后进入升级界面",
        label: [30, 100],
        finger: [0, 0, 1]
      },
      3: {
        content: "提高等级，将获得更多的收益。",
        label: [0, 100],
        finger: [0, 0, 1]
      },
      4: {
        content: "关闭弹窗",
        finger: [0, 0, 1],
        label: [-200, 0]
      }
    };
    this.cfg2 = {
      1: {
        content: "点击进入烧烤王挑战",
        label: [-30, 100],
        finger: [0, 0, 1]
      },
      2: {
        content: "点击进行挑战",
        label: [-180, 100],
        finger: [0, 0, 1]
      }
    };
    this.cfg3 = {
      1: {
        content: "点击助理按钮",
        label: [0, 120],
        finger: [0, 0, 1]
      },
      2: {
        content: "点击招聘助理",
        label: [0, -120],
        finger: [0, 0, 1]
      }
    };
    this.tip = {
      1: {
        id: 1,
        icon: "tipIcon1",
        title: "替女儿子涵交上学费用",
        task: "赚200万学费",
        result: "替女儿子涵交上学费用",
        resultIcon: "resultIcon1",
        leftBtnTxt: "上交学费",
        rightBtnTxt: "获得20万",
        price: 2e6,
        addCoin: 2e5,
        time: 599,
        win: "GameGuide3ChatUI",
        type: 0
      },
      2: {
        id: 2,
        icon: "tipIcon2",
        title: "上交摊位保护费",
        task: "积攒5000万",
        result: "上交摊位保护费",
        resultIcon: "tipIcon2",
        leftBtnTxt: "上交摊位费",
        rightBtnTxt: "获得500万",
        price: 5e7,
        addCoin: 5e6,
        time: 1199,
        win: "GameGuideStory2UI",
        type: 0
      },
      3: {
        id: 3,
        icon: "tipIcon3",
        title: "购买特效药治疗子涵",
        task: "赚够200亿",
        result: "购买特效药治疗子涵",
        resultIcon: "tipIcon3",
        leftBtnTxt: "购买特效药",
        rightBtnTxt: "获得20亿",
        price: 2e10,
        addCoin: 2e9,
        time: 3599,
        win: "GameGuideStory3UI",
        type: 0
      },
      4: {
        id: 4,
        icon: "tipIcon4",
        title: "成功收购“如烟大厦”",
        task: "赚到100兆",
        result: "成功收购“如烟大厦”",
        resultIcon: "tipIcon4",
        leftBtnTxt: "点击收购",
        rightBtnTxt: "获得10兆",
        price: 1e14,
        addCoin: 1e13,
        time: 7199,
        win: "GameGuideStory4UI",
        type: 0
      },
      5: {
        id: 5,
        icon: "tipIcon5",
        title: "在荒古遗迹中封印魔剑",
        task: "登天塔击败17层",
        result: "在荒古遗迹中封印魔剑",
        resultIcon: "tipIcon5",
        leftBtnTxt: "前往荒古遗迹",
        leftBtnFinishTxt: "完成任务",
        rightBtnTxt: "",
        price: 17,
        addCoin: 1e3,
        time: 86399,
        win: "GameGuideStory5UI",
        type: 1
      }
    };
    this.curGuideStep = 1;
    this.m_isShowingGuide = false;
  }
  Object.defineProperty(_ctor.prototype, "isShowingGuide", {
    get: function () {
      return this.m_isShowingGuide;
    },
    set: function (e) {
      this.m_isShowingGuide = e;
      if (e) {
        r_FlayBtnSystem.FlayBtnSystem.btnAward.visible = false;
      } else {
        r_FlayBtnSystem.FlayBtnSystem.restart();
      }
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init = function () {
    this.curGuideStep = 1;
    this.isShowingGuide = false;
  };
  _ctor.prototype.checkGuide = function () {
    return !(this.curGuideStep > 1 || (r_PlayerData.PlayerData.data.gameGuide == S.开局漫画 ? (this.curGuideStep = 0, r_GameGuideComicUI.default.showUI(), this.isShowingGuide = true, 0) : r_PlayerData.PlayerData.data.gameGuide == S.点击与升级教程 ? (r_SectionUI.default.showUI({
      id: 0,
      hideCall: function () {
        r_GameGuideUI.default.showUI();
      }
    }), this.curGuideStep = 1, this.isShowingGuide = true, 0) : r_PlayerData.PlayerData.data.gameGuide == S.挑战教程 || r_PlayerData.PlayerData.data.gameGuide == S.助理教程 ? (this.curGuideStep = 1, r_GameGuideUI.default.showUI(), this.isShowingGuide = true, 0) : r_PlayerData.PlayerData.data.gameGuide == S.柳如烟离婚剧情 ? (this.curGuideStep = 1, r_GameGuideChatUI.default.showUI(), this.isShowingGuide = true, 0) : r_PlayerData.PlayerData.data.gameGuide == S.女儿学费剧情 ? (this.curGuideStep = 0, r_GameGuide2ChatUI.default.showUI(), this.isShowingGuide = true, 0) : r_PlayerData.PlayerData.data.storyMap.isShow || 1 != r_PlayerData.PlayerData.data.storyMap.id ? (console.log("111", r_PlayerData.PlayerData.data.storyMap.isShow), console.log("2222", r_PlayerData.PlayerData.data.storyMap.id, r_GroupSystem.GroupSystem.getSectionCfg()[r_PlayerData.PlayerData.data.storyMap.id]), !r_PlayerData.PlayerData.data.storyMap.isShow && r_GroupSystem.GroupSystem.getSectionCfg()[r_PlayerData.PlayerData.data.storyMap.id] ? (this.curGuideStep = 0, r_SectionUI.default.showUI(), 0) : r_FairyLandGuide.FairyLandGuide.needGuide() ? (r_FairyLandGuide.FairyLandGuide.guideFairyLand(), 0) : r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().前往城市) && 0 == r_PlayerData.PlayerData.data.isGotoCity ? r_OfflineUI.default.Inst || r_FairyLandGuide.FairyLandGuide.isPlaying || (r_PlayerData.PlayerData.data.isGotoCity = 1, r_PlayerData.PlayerData.saveData(), r_GetItemComUI.GetItemComUI.showUI({
      scale: 1.5,
      hideTitle: false,
      titleTip: true,
      iconUrl: "ui://" + r_UIDef.UIDef.Pack.MainHome + "/出门",
      getDesc: "前往城市已解锁",
      closeCallback: function () {}
    }), 0) : r_LimitSystem.LimitSystem.getCheckLevelLimit(r_LimitSystem.LimitLevelType.侧拉栏) && 0 == r_PlayerData.PlayerData.data.isGoSideGift && r_PlatformSystem.PlatformSystem.canShowSideGift() ? (r_PlayerData.PlayerData.data.isGoSideGift = 1, r_PlayerData.PlayerData.saveData(), r_SideGiftUI.SideGiftUI.showUI(), 0) : !(r_LimitSystem.LimitSystem.getCheckLevelLimit(r_LimitSystem.LimitLevelType.添加桌面) && 0 == r_PlayerData.PlayerData.data.isGoDeskTop && r_PlatformSystem.PlatformSystem.canShowDesk() && r_PlatformSystem.PlatformSystem.isSupportDesk()) || (r_PlayerData.PlayerData.data.isGoDeskTop = 1, r_PlayerData.PlayerData.saveData(), r_DeskUI.default.showUI(), 0)) : (this.curGuideStep = 0, r_GameGuide3ChatUI.default.showUI(), 0)));
  };
  _ctor.prototype.checkFinishMsg = function () {
    return false;
  };
  _ctor.prototype.getTipCfg = function (e) {
    return this.tip[e];
  };
  _ctor.prototype.getCurrTipCfg = function () {
    return this.getTipCfg(r_PlayerData.PlayerData.data.storyMap.id);
  };
  _ctor.prototype.addStory = function () {
    r_PlayerData.PlayerData.data.storyMap.id++;
    r_PlayerData.PlayerData.data.storyMap.isShow = false;
    r_PlayerData.PlayerData.saveData();
    r_PlatformSystem.PlatformSystem.report("GetTask1", {
      result: r_PlayerData.PlayerData.data.storyMap.id
    });
  };
  return _ctor;
}();
exports._GameGuideSystem = exp__GameGuideSystem;
exports.GameGuideSystem = new exp__GameGuideSystem();
(function (e) {
  e[e["开局漫画"] = 0] = "开局漫画";
  e[e["点击与升级教程"] = 1] = "点击与升级教程";
  e[e["柳如烟离婚剧情"] = 2] = "柳如烟离婚剧情";
  e[e["挑战教程"] = 3] = "挑战教程";
  e[e["女儿学费剧情"] = 4] = "女儿学费剧情";
  e[e["助理教程"] = 5] = "助理教程";
})(S = exports.GameGuideState || (exports.GameGuideState = {}));
(function (e) {
  e[e["金币"] = 0] = "金币";
  e[e["荒古遗迹"] = 1] = "荒古遗迹";
})(exports.StoryType || (exports.StoryType = {}));