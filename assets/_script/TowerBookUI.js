var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerBookUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TowerSystem = require("TowerSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_WpInfoUI = require("WpInfoUI");
var r_DecorateFunction1 = require("DecorateFunction1");
var exp_TowerBookUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tower, r_UIDef.UIDef.Res.UI.TowerBookUI) || this;
    t.weaponList = [];
    t.weaponListHide = [];
    t.curBoss = null;
    t.isClickInfo = false;
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
    this.show(r_UIDef.UIDef.Urls.UI.TowerBookUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TowerBookUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.expandContr = this.contentPane.getController("expand");
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.leftArrow = this.bottomCom.getChild("left");
    this.leftArrow.onClick(function () {
      t.trunPage("left");
    });
    this.rightArrow = this.bottomCom.getChild("right");
    this.rightArrow.onClick(function () {
      t.trunPage("right");
    });
    this.list.on(fgui.Event.SCROLL_END, function () {
      t.scroolEnd();
    });
  };
  _ctor.prototype.trunPage = function (e) {
    if (!(Math.floor(this.list.scrollPane.contentWidth / this.list.viewWidth) < 2)) {
      var t = this.list.scrollPane.percX;
      if ("left" == e) {
        t > 0 && this.list.scrollPane.scrollLeft(1, true);
      } else {
        t < 1 && this.list.scrollPane.scrollRight(1, true);
      }
    }
  };
  _ctor.prototype.scroolEnd = function () {
    this.updatePageText();
  };
  _ctor.prototype.updatePageText = function () {
    var e = Math.floor(this.list.scrollPane.contentWidth / this.list.viewWidth);
    this.bottomCom.getChild("txtPage").text = Math.floor(this.list.scrollPane.posX / 600) + 1 + "/" + e;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.freshBook, this.refreshList, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.clickWpInfo, this.refreshItemByIndex, this);
    this.isClickInfo = false;
    if (this.data && this.data.isClickInfo) {
      this.isClickInfo = this.data.isClickInfo;
      this.list.lineGap = -43;
      this.expandContr.selectedIndex = 0;
      this.list.height = 895;
      this.bottomCom.height = 134;
    } else {
      this.list.lineGap = -7;
      this.expandContr.selectedIndex = 1;
      this.list.height = 996;
      this.bottomCom.height = 117;
    }
    this.refreshList();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.freshBook, this.refreshList, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.clickWpInfo, this.refreshItemByIndex, this);
  };
  _ctor.prototype.refreshItemByIndex = function (e) {
    var t = e.data.id;
    if (t && r_PlayerData.PlayerData.data.weapon.weapons[t]) {
      r_PlayerData.PlayerData.data.weapon.weapons[t].isNew = 0;
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.refreshList = function () {
    this.weaponList = [];
    this.weaponListHide = [];
    for (var e = 0; e < r_WeaponSystem.WeaponSystem.WeaponList.length; e++) {
      var t = r_WeaponSystem.WeaponSystem.WeaponList[e];
      if (r_PlayerData.PlayerData.data.weapon && r_PlayerData.PlayerData.data.weapon.weapons && r_PlayerData.PlayerData.data.weapon.weapons[t.id]) {
        this.weaponList.push(t);
      } else {
        this.weaponListHide.push(t);
      }
    }
    this.weaponList.sort(function (e, t) {
      return r_WeaponSystem.WeaponSystem.GetWeaponPoint(t.id) - r_WeaponSystem.WeaponSystem.GetWeaponPoint(e.id);
    });
    var o = this.isClickInfo ? r_WeaponSystem.WeaponSystem.WeaponList.length : this.weaponList.length;
    this.list.numItems = o;
    this.updatePageText();
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o;
    var i = this;
    var n = this.weaponList[e];
    t.getChild("btnEquip").clearClick();
    t.getChild("iconTouch").clearClick();
    if (this.isClickInfo) {
      if (e < this.weaponList.length) {
        ;
      } else {
        var a = e - this.weaponList.length;
        n = this.weaponListHide[a];
      }
      t.getChild("btnEquip").visible = false;
      t.getController("mode").selectedIndex = 0;
      t.getChild("iconTouch").onClick(function () {
        r_WpInfoUI.WpInfoUI.showUI({
          info: n
        });
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.clickWpInfo, {
          id: n.id
        });
      });
    } else {
      if (n.id == r_TowerSystem.TowerSystem.getCurWeapon()) {
        t.getController("mode").selectedIndex = 1;
      } else {
        t.getController("mode").selectedIndex = 0;
      }
      t.getChild("btnEquip").visible = true;
      t.getChild("btnEquip").onClick(function () {
        r_SoundMgr.SoundMgr.playSound("tower/更换装备武器音效");
        r_TowerSystem.TowerSystem.equipWeapon(n.id);
        i.refreshList();
      }, this);
    }
    t.getChild("name").text = n.name;
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "bdWeaponForge", "weapon/small/" + n.name);
    console.log("PlayerData.data.weapon:", r_PlayerData.PlayerData.data.weapon);
    var s = null === (o = r_PlayerData.PlayerData.data.weapon) || undefined === o ? undefined : o.weapons[n.id];
    if (s) {
      t.getChild("icon").color = cc.Color.WHITE;
      var y = s.isNew;
      t.getChild("fight").text = "战力：" + r_WeaponSystem.WeaponSystem.GetWeaponPoint(n.id);
      t.getController("new").selectedIndex = y || 0;
    } else {
      t.getChild("icon").color = new cc.Color(71, 54, 38);
      t.getChild("fight").text = "战力：??";
      t.getController("new").selectedIndex = 0;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("centerNode")], _ctor.prototype, "centerNode", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bottomCom")], _ctor.prototype, "bottomCom", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.TowerBookUI = exp_TowerBookUI;