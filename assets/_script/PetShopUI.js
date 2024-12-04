var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetShopUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetCfg = require("PetCfg");
var r_PetData = require("PetData");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PetCommon = require("PetCommon");
var exp_PetShopUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetShopUI) || this;
    t.showProps = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetShopUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetShopUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.itemRenderer = this.shopItemRenderer.bind(this);
    this.showProps = r_PetCfg.PetProps.filter(function (e) {
      return e.isShow;
    });
    this.tab = this.contentPane.getController("tab");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.tab.selectedIndex = 0;
    this.list.numItems = this.showProps.length;
    this.list.scrollPane.scrollTop();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PetInfoUI).showInfo();
  };
  _ctor.prototype.shopItemRenderer = function (e, t) {
    var o = this;
    var i = this.showProps[e];
    t.getChild("name").asTextField.text = i.name;
    t.getChild("desc").asTextField.text = i.desc;
    t.getChild("icon").asLoader.url = "ui://Pet/" + i.icon;
    t.getChild("propNum").visible = false;
    t.getChild("limitNum").visible = false;
    if (i.limit > 0) {
      var n = new Date().getDate();
      var a = r_PetData.PetData.getData("buyNum" + i.id, 0);
      if (r_PetData.PetData.getData("buyDay", 0) != n) {
        r_PetData.PetData.setData("buyNum" + i.id, 0);
        a = 0;
      }
      t.getChild("limitNum").visible = true;
      t.getChild("limitNum").asTextField.setVar("num", a + "/" + i.limit).flushVars();
    }
    t.getChild("btnUse").visible = false;
    var s = t.getChild("btnBuy").asButton;
    s.visible = true;
    s.getController("type").selectedIndex = i.costType;
    if (1 == i.costType) {
      s.title = "";
      s.icon = "ui://Pet/免费";
    } else {
      s.title = i.cost.toString();
    }
    s.clearClick();
    s.onClick(function () {
      var e = new Date().getDate();
      var n = r_PetData.PetData.getData("buyNum" + i.id, 0);
      if (i.limit > 0 && (r_PetData.PetData.getData("buyDay", 0) != e && (r_PetData.PetData.setData("buyNum" + i.id, 0), n = 0), n >= i.limit)) {
        r_UtilsSystem.UtilsSystem.showTip("今日购买次数已达上限");
      } else {
        var a = function () {
          o.useProp(i.id, t);
          if (i.limit > 0) {
            n++;
            r_PetData.PetData.setData("buyDay", e);
            r_PetData.PetData.setData("buyNum" + i.id, n);
            t.getChild("limitNum").asTextField.setVar("num", n + "/" + i.limit).flushVars();
          }
          r_UtilsSystem.UtilsSystem.showTip("购买成功");
          r_PlatformSystem.PlatformSystem.report("pet_shop_buy", {
            stage: i.name
          });
        };
        if (0 == i.costType) {
          if (r_PlayerData.PlayerData.deleteDiamond(i.cost)) {
            a();
          } else {
            r_UtilsSystem.UtilsSystem.showTip("钻石不足");
          }
        } else {
          r_PlatformSystem.PlatformSystem.showVideo(i.name, function () {
            a();
          });
        }
      }
    }, this);
  };
  _ctor.prototype.bagItemRenderer = function (e, t) {
    var o = this;
    var i = r_PetData.PetData.getBagProps()[e];
    var n = r_PetCfg.PetProps.find(function (e) {
      return e.id == i.id;
    });
    t.getChild("name").asTextField.text = n.name;
    t.getChild("desc").asTextField.text = n.desc;
    t.getChild("icon").asLoader.url = "ui://Pet/" + n.icon;
    t.getChild("limitNum").visible = false;
    t.getChild("propNum").visible = true;
    t.getChild("propNum").asTextField.setVar("num", i.num + "").flushVars();
    t.getChild("btnBuy").visible = false;
    t.getChild("btnUse").visible = i.id > 2;
    t.getChild("btnUse").clearClick();
    t.getChild("btnUse").onClick(function () {
      o.useProp(i.id, t);
    }, this);
  };
  _ctor.prototype.useProp = function (e) {
    var t = r_PetData.PetData.getPetBaseInfo();
    var o = 0;
    switch (e) {
      case 1:
      case 2:
        return;
      case 3:
        r_PetData.PetData.addVitality(3);
        break;
      case 4:
        r_PetData.PetData.addVitality(1);
        break;
      case 5:
        r_PetData.PetData.setData("expProp", 3);
        break;
      case 6:
        if (!(t.strength / (t.speed + t.dexterity + t.strength) >= .25)) {
          return void r_UtilsSystem.UtilsSystem.showTip("力量值过低不可使用");
        }
        t.strength--;
        if (Math.random() < .5) {
          t.speed++;
        } else {
          t.dexterity++;
        }
        break;
      case 7:
        if (!(t.dexterity / (t.speed + t.dexterity + t.strength) >= .25)) {
          return void r_UtilsSystem.UtilsSystem.showTip("闪避值过低不可使用");
        }
        t.dexterity--;
        if (Math.random() < .5) {
          t.speed++;
        } else {
          t.strength++;
        }
        break;
      case 8:
        if (!(t.speed / (t.speed + t.dexterity + t.strength) >= .25)) {
          return void r_UtilsSystem.UtilsSystem.showTip("速度值过低不可使用");
        }
        t.speed--;
        if (Math.random() < .5) {
          t.dexterity++;
        } else {
          t.strength++;
        }
        break;
      case 9:
        if (Math.random() < .5) {
          t.hp++;
          r_UtilsSystem.UtilsSystem.showTip("刷新成功");
          o += 50;
        } else {
          r_UtilsSystem.UtilsSystem.showTip("刷新失败");
        }
        break;
      case 10:
        t.strength++;
        o += 50;
        break;
      case 11:
        t.dexterity++;
        o += 50;
        break;
      case 12:
        t.speed++;
        o += 50;
        break;
      case 13:
        t.hp++;
        o += 50;
    }
    r_PetData.PetData.setPetBaseInfo(t);
    o > 0 && r_PetCommon.PetCommon.showBattleValTip(o);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetShopUI = exp_PetShopUI;