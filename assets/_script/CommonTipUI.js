var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipUI = exports.UnlockPlayTypeCN = exports.UnlockPlayType = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
(function (e) {
  e[e.None = 0] = "None";
  e[e.Daughter = 1] = "Daughter";
  e[e.Eye = 2] = "Eye";
  e[e.Car = 3] = "Car";
  e[e.Eat = 4] = "Eat";
  e[e.Gambling = 5] = "Gambling";
  e[e.Egg = 6] = "Egg";
  e[e.Bit = 7] = "Bit";
  e[e.Field = 8] = "Field";
  e[e.GirlAi = 9] = "GirlAi";
  e[e.Challenge = 10] = "Challenge";
  e[e.Broadcast = 11] = "Broadcast";
  e[e.FightMonster = 12] = "FightMonster";
  e[e.NightClub = 13] = "NightClub";
  e[e.BeautySalon = 14] = "BeautySalon";
  e[e.Forge = 15] = "Forge";
  e[e.BeachGrash = 16] = "BeachGrash";
  e[e.VideoGame = 17] = "VideoGame";
  e[e.Tower = 18] = "Tower";
  e[e.Tg = 19] = "Tg";
  e[e.Role = 20] = "Role";
  e[e.House = 21] = "House";
  e[e.Business = 22] = "Business";
})(exports.UnlockPlayType || (exports.UnlockPlayType = {}));
exports.UnlockPlayTypeCN = [">占位<", "养女儿", "眼力大挑战", "二手车", "社区活动中心", "彩票中心", "砸金蛋", "地下投资", "石油", "女友体验馆", "称号挑战", "直播", "挑战神兽", "白金汉", "美容院", "武器铺", "捡垃圾", "游戏厅", "爬塔", "天工", "雇佣", "房产", "企业"];
var exp_CommonTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.CommonTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CommonTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CommonTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onclickBtnClose, this);
    this.btnVideo.onClick(this.onClickVideo, this);
    this.videoCtrl = this.contentPane.getController("video");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data && this.data.desc) {
      this.tipDesc.text = this.data.desc;
    } else {
      this.tipDesc.text = "";
    }
    if (this.data && this.data.unlockPlayType) {
      this.videoCtrl.selectedIndex = 1;
      this.curUnlockPlayType = this.data.unlockPlayType;
      this.btnVideo.title = "解锁" + r_PlayerData.PlayerData.getPlayTypeUnlockedCount(this.curUnlockPlayType) + "/" + _ctor.UnlockPlayTypeMax;
    } else {
      this.videoCtrl.selectedIndex = 0;
    }
  };
  _ctor.prototype.onclickBtnClose = function () {
    this.hide();
    this.data.callback && this.data.callback();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    cc.log("解锁玩法" + exports.UnlockPlayTypeCN[this.curUnlockPlayType]);
    r_PlatformSystem.PlatformSystem.showVideo("解锁玩法" + exports.UnlockPlayTypeCN[this.curUnlockPlayType], function () {
      r_PlayerData.PlayerData.addPlayTypeUnlockedCount(e.curUnlockPlayType);
      e.btnVideo.title = "解锁" + r_PlayerData.PlayerData.getPlayTypeUnlockedCount(e.curUnlockPlayType) + "/" + _ctor.UnlockPlayTypeMax;
      if (r_PlayerData.PlayerData.getPlayTypeUnlockedCount(e.curUnlockPlayType) >= 2 && e.data.doneThing) {
        e.data.doneThing();
        e.hide();
        e.data.callback && e.data.callback();
      }
    });
  };
  _ctor.UnlockPlayTypeMaxCount = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
  _ctor.UnlockPlayTypeMax = 2;
  __decorate([r_DecorateFunction1.AutoFind("tipDesc")], _ctor.prototype, "tipDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.CommonTipUI = exp_CommonTipUI;