var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_BlockSystem = require("BlockSystem");
var exp_DebugUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Debug, r_UIDef.UIDef.Res.UI.DebugUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DebugUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DebugUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    var t = this.contentPane.getChild("List");
    this.rootNode = t._children[0];
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initSelectContent(this.rootNode.getChild("stone"), "stoneType");
    this.initSelectContent(this.rootNode.getChild("race"), "raceType");
    this.initSelectContent(this.rootNode.getChild("lottery"), "lotteryType");
    this.initSelectContent(this.rootNode.getChild("mail"), "mailType");
    this.initSelectContent(this.rootNode.getChild("transfer"), "transferType");
    this.initSelectContent(this.rootNode.getChild("almanac"), "almanacType");
    this.initSelectContent(this.rootNode.getChild("tiger"), "tigerType");
    this.initSelectContent(this.rootNode.getChild("luckBag"), "luckBagType");
    this.initSelectContent(this.rootNode.getChild("catchFish"), "fishType");
    this.initSelectContent(this.rootNode.getChild("goodsShop"), "goodsShopType");
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.热梗合集)) {
      this.rootNode.getChild("woodenPeople").visible = false;
    } else {
      this.rootNode.getChild("woodenPeople").visible = true;
      this.initSelectContent(this.rootNode.getChild("woodenPeople"), "woodenPeopleType");
    }
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.农场)) {
      this.rootNode.getChild("farm").visible = false;
    } else {
      this.rootNode.getChild("farm").visible = true;
      this.initSelectContent(this.rootNode.getChild("farm"), "farmType");
    }
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.派红包)) {
      this.rootNode.getChild("giveRedPacket").visible = false;
    } else {
      this.rootNode.getChild("giveRedPacket").visible = true;
      this.initSelectContent(this.rootNode.getChild("giveRedPacket"), "giveRedPacketType", 10);
    }
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.神秘商店)) {
      this.rootNode.getChild("mysteryShop").visible = false;
    } else {
      this.rootNode.getChild("mysteryShop").visible = true;
      this.initSelectContent(this.rootNode.getChild("mysteryShop"), "mysteryShopType", 9);
    }
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.套圈)) {
      this.rootNode.getChild("ferrule").visible = false;
    } else {
      this.rootNode.getChild("ferrule").visible = true;
      this.initSelectContent(this.rootNode.getChild("ferrule"), "ferruleType", 5);
    }
    this.updateRootNodeChildPos();
  };
  _ctor.prototype.updateRootNodeChildPos = function () {
    var e = 0;
    for (var t = 0; t < this.rootNode._children.length; t++) {
      var o = this.rootNode._children[t];
      if (o.visible) {
        o.y = e;
        o.x = 0;
        e += o.height + 20;
      }
    }
    this.rootNode.height = e;
  };
  _ctor.prototype.initSelectContent = function (e, t, o) {
    undefined === o && (o = 5);
    var i = function () {
      for (var i = 1; i <= o; i++) {
        var n = e.getChild("select" + i);
        if (n) {
          if (r_DebugSystem.DebugSystem[t] == i - 1) {
            n.getController("mode").selectedIndex = 1;
          } else {
            n.getController("mode").selectedIndex = 0;
          }
        }
      }
    };
    var n = function (o) {
      var n = e.getChild("select" + o);
      if (n) {
        n.clearClick();
        n.onClick(function () {
          r_DebugSystem.DebugSystem[t] = o - 1;
          i();
        }, a);
      }
    };
    var a = this;
    for (var s = 1; s <= o; s++) {
      n(s);
    }
    i();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.DebugUI = exp_DebugUI;