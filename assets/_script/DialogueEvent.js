Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogueShow = exports.DialogueObject = exports.DialogueEventType = undefined;
var i;
var r_ChatSystem = require("ChatSystem");
var r_PlayerData = require("PlayerData");
var r_VillageBuyUI = require("VillageBuyUI");
var r_BagSystem = require("BagSystem");
var r_FairyLandGuide = require("FairyLandGuide");
var r_FairyLandShopUI = require("FairyLandShopUI");
(function (e) {
  e[e["挑战"] = 0] = "挑战";
  e[e["显示"] = 1] = "显示";
  e[e["隐藏"] = 2] = "隐藏";
  e[e["手机消息"] = 3] = "手机消息";
  e[e["对话结束"] = 4] = "对话结束";
  e[e["看广告"] = 5] = "看广告";
  e[e["花钱"] = 6] = "花钱";
  e[e["解锁"] = 7] = "解锁";
})(i = exports.DialogueEventType || (exports.DialogueEventType = {}));
exports.DialogueObject = {
  小强回收: {
    type: "btn",
    func: function () {
      r_VillageBuyUI.VillageBuyUI.showUI();
    }
  },
  小强回收彩蛋完成: {
    type: "btn",
    func: function () {
      r_PlayerData.PlayerData.data.riverHaiBoDong.isCancaidan = 1;
      r_BagSystem.BagSystem.setPlayerGoodsInfoById(42, -1);
      r_PlayerData.PlayerData.saveData();
      r_VillageBuyUI.VillageBuyUI.showUI();
    }
  },
  数钱彩蛋1: {
    type: "btn",
    func: function () {
      r_ChatSystem.ChatSystem.addNewChatTaskById(47);
    }
  },
  荒古遗迹引导: {
    type: "btn",
    func: function () {
      r_FairyLandGuide.FairyLandGuide.curGuideStep = 1;
      r_FairyLandGuide.FairyLandGuide.showUI();
    }
  },
  荒古遗迹引导2: {
    type: "btn",
    func: function () {
      r_FairyLandGuide.FairyLandGuide.curGuideStep = 2;
      r_FairyLandShopUI.FairyLandShopUI.Inst && (r_FairyLandGuide.FairyLandGuide.curGuideStep = 0 == r_FairyLandShopUI.FairyLandShopUI.Inst.contentPane.getController("state").selectedIndex ? 2 : 3);
      console.log("FairyLandGuide.curGuideStep: ", r_FairyLandGuide.FairyLandGuide.curGuideStep);
      r_FairyLandGuide.FairyLandGuide.showUI();
    }
  }
};
var exp_DialogueShow = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    e.type && (this.type = e.type);
    if (!(i[this.type] != i.显示 && i[this.type] != i.看广告 && i[this.type] != i.花钱 && i[this.type] != i.解锁)) {
      if (exports.DialogueObject[e.obj].func) {
        exports.DialogueObject[e.obj].func && exports.DialogueObject[e.obj].func();
      } else if ("class" == exports.DialogueObject[e.obj].type) {
        if (exports.DialogueObject[e.obj].para) {
          exports.DialogueObject[e.obj].main_object.showUI(exports.DialogueObject[e.obj].para);
        } else {
          exports.DialogueObject[e.obj].main_object.showUI();
        }
      }
    }
  };
  return _ctor;
}();
exports.DialogueShow = exp_DialogueShow;