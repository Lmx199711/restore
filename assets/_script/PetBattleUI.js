var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetBattleUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetBattle = require("PetBattle");
var r_PetData = require("PetData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var exp_PetBattleUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetBattleUI) || this;
    t.player = new r_PetBattle.PetBattle();
    t.enemy = new r_PetBattle.PetBattle();
    t.count = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetBattleUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetBattleUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.countDown = this.contentPane.getChild("countDown").asLoader;
    this.playerInfoItem = this.contentPane.getChild("playerInfo").asCom;
    this.enemyInfoItem = this.contentPane.getChild("enemyInfo").asCom;
    this.player.petRoot = this.contentPane.getChild("player").asCom;
    this.enemy.petRoot = this.contentPane.getChild("enemy").asCom;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initBattle();
    r_PlatformSystem.PlatformSystem.report("pet_battle", {
      stage: "进入战斗"
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.player.stop();
    this.enemy.stop();
    r_TimeSystem.TimeSystem.unregistSecondUpdate("countDown");
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_SoundMgr.SoundMgr.stopAllSound();
  };
  _ctor.prototype.initBattle = function () {
    var e = this;
    if (this.player.petRoot) {
      r_ResSystem.ResSystem.loadHeadImg(this.playerInfoItem.getChild("head").asCom.getChild("icon"), r_PlayerData.PlayerData.data.curHead);
      r_ResSystem.ResSystem.loadHeadImg(this.enemyInfoItem.getChild("head").asCom.getChild("icon"), this.data.enemyData.baseInfo.head);
      this.player.init(r_PetData.PetData.getPetBaseInfo(), r_PetData.PetData.getWeaponsInfo().concat(), r_PetData.PetData.getSkillsInfo().concat(), this.playerInfoItem, this.enemy, true);
      this.enemy.init(this.data.enemyData.baseInfo, this.data.enemyData.weapons, this.data.enemyData.skills, this.enemyInfoItem, this.player, false);
      this.count = 3;
      this.countDown.visible = true;
      this.showCountDown();
      r_TimeSystem.TimeSystem.registSecondUpdate("countDown", function () {
        if (e.count <= 0 && e.player.isRun && e.enemy.isRun) {
          if (e.player.getSpeed() >= e.enemy.getSpeed()) {
            e.player.turnStart();
          } else {
            e.enemy.turnStart();
          }
          r_TimeSystem.TimeSystem.unregistSecondUpdate("countDown");
          e.countDown.visible = false;
        }
        if (e.count > 0) {
          e.count--;
          e.showCountDown();
        }
      });
      r_SoundMgr.SoundMgr.playMusic("pet/战斗音乐_01");
    }
  };
  _ctor.prototype.showCountDown = function () {
    this.countDown.url = "ui://Pet/countdown" + this.count;
    this.countDown.scaleX = 0;
    this.countDown.scaleY = 0;
    cc.Tween.stopAllByTarget(this.countDown);
    cc.tween(this.countDown).by(.2, {
      scaleX: 1,
      scaleY: 1
    }).start();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetBattleUI = exp_PetBattleUI;