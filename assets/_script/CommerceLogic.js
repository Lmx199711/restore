var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_CommerceCfg = require("CommerceCfg");
var r_CommerceResultUI = require("CommerceResultUI");
var r_CommerceUI = require("CommerceUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_CommerceLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.LJQ = null;
    t.box = null;
    t.inProduction = null;
    t.mask = null;
    t.itemList = [];
    t.textList = [];
    t.numItem = 0;
    t.nowItem = null;
    t.nowId = -1;
    t.itemStr = "";
    t.itemStartPos = cc.v2(0, 0);
    t.LJQ_PF = "zhengchang";
    t.now_PF = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    this.initBtn();
    r_CommerceUI.default.Inst.btnStart.onClick(this.btn_Start, this);
    this.hideItem();
    this.inProductionAction();
  };
  _ctor.prototype.initBtn = function () {
    r_PlayerData.PlayerData.data.isFirstCommerce || (r_CommerceUI.default.Inst.btnStart.getController("btn").selectedIndex = 1);
  };
  _ctor.prototype.btn_Start = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.isFirstCommerce) {
      this.initItem();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("国货配送", function () {
        e.initItem();
      });
    }
    if (r_PlayerData.PlayerData.data && r_PlayerData.PlayerData.data.isFirstCommerce) {
      r_PlayerData.PlayerData.data.isFirstCommerce = false;
      r_PlayerData.PlayerData.saveData();
      this.initBtn();
    }
  };
  _ctor.prototype.initItem = function () {
    r_CommerceUI.default.Inst.btnStart.visible = false;
    for (var e = 0; e < this.itemList.length; e++) {
      this.itemList[e].active = true;
    }
    this.box.active = true;
    for (e = 0; e < this.textList.length; e++) {
      this.textList[e].active = true;
    }
  };
  _ctor.prototype.hideItem = function () {
    this.LJQ.setSkin("zhengchang");
    this.LJQ_PF = "zhengchang";
    r_CommerceUI.default.Inst.btnStart.visible = true;
    for (var e = 0; e < this.itemList.length; e++) {
      this.itemList[e].active = false;
    }
    this.box.active = false;
    this.itemStr = "";
  };
  _ctor.prototype.hideTextList = function () {
    for (var e = 0; e < this.textList.length; e++) {
      this.textList[e].getChildByName("null").active = true;
      this.textList[e].getChildByName("ok").active = false;
      this.textList[e].getChildByName("label").getComponent(cc.RichText).string = "<outline color=black width=2></outline>";
      this.textList[e].active = false;
    }
  };
  _ctor.prototype.setLJQAnimation = function (e, t, o, i) {
    r_SoundMgr.SoundMgr.playSound("commerce/" + o);
    var n = e.setAnimation(1, t, false);
    e.setTrackCompleteListener(n, function () {
      i();
    });
  };
  _ctor.prototype.inProductionAction = function () {
    var e = this;
    var t = cc.tween().delay(.3).call(function () {
      e.inProduction.string = "<outline color=black width=2>制作中</outline>";
    });
    var o = cc.tween().delay(.3).call(function () {
      e.inProduction.string = "<outline color=black width=2>制作中.</outline>";
    });
    var i = cc.tween().delay(.3).call(function () {
      e.inProduction.string = "<outline color=black width=2>制作中..</outline>";
    });
    var n = cc.tween().delay(.3).call(function () {
      e.inProduction.string = "<outline color=black width=2>制作中...</outline>";
    });
    var a = cc.tween().then(t).then(o).then(i).then(n);
    cc.tween(this.inProduction.node).then(a).repeatForever().start();
  };
  _ctor.prototype.touchStart = function (e) {
    if (!this.nowItem) {
      var t = e.getLocation();
      for (var o = 0; o < this.itemList.length; o++) {
        if (this.itemList[o].active && this.itemList[o].getBoundingBoxToWorld().contains(t)) {
          this.nowItem = this.itemList[o];
          this.nowId = o;
          this.itemStartPos.x = this.nowItem.x;
          this.itemStartPos.y = this.nowItem.y;
          if ("头发" == this.nowItem.name) {
            this.nowItem.children[0].active = true;
            if ("meimao" == this.LJQ_PF) {
              this.LJQ.setSkin("default");
              this.now_PF = "default";
            } else {
              this.LJQ.setSkin("toufa");
              this.now_PF = "toufa";
            }
          } else if ("眉毛" == this.nowItem.name) {
            this.nowItem.children[0].active = true;
            if ("toufa" == this.LJQ_PF) {
              this.LJQ.setSkin("default");
              this.now_PF = "default";
            } else {
              this.LJQ.setSkin("meimao");
              this.now_PF = "meimao";
            }
          }
          break;
        }
      }
    }
  };
  _ctor.prototype.touchMove = function (e) {
    var t = e.getLocation();
    if (this.nowItem) {
      var o = this.nowItem.parent.convertToNodeSpaceAR(t);
      this.nowItem.x = o.x;
      this.nowItem.y = o.y;
    }
  };
  _ctor.prototype.touchEnd = function (e) {
    var t = this;
    var o = e.getLocation();
    if (this.nowItem) {
      this.nowItem.x = this.itemStartPos.x;
      this.nowItem.y = this.itemStartPos.y;
      if (this.box.getBoundingBoxToWorld().contains(o)) {
        if ("" != this.now_PF) {
          this.nowItem.children[0].active = false;
          this.LJQ_PF = this.now_PF;
        }
        this.now_PF = "";
        this.nowItem.active = false;
        this.itemStr += (this.nowId + 1).toString();
        this.mask.active = true;
        this.numItem++;
        this.textList[this.numItem - 1].getChildByName("label").getComponent(cc.RichText).string = "<outline color=black width=2>" + r_CommerceCfg.CommerceItemCfg[this.nowId].name + "</outline>";
        this.textList[this.numItem - 1].getChildByName("null").active = false;
        this.textList[this.numItem - 1].getChildByName("ok").active = true;
        this.setLJQAnimation(this.LJQ, r_CommerceCfg.CommerceItemCfg[this.nowId].animation, r_CommerceCfg.CommerceItemCfg[this.nowId].sound, function () {
          if (2 == t.numItem) {
            var e = t.findCfg(t.itemStr, r_CommerceCfg.CommerceCfg);
            console.log(e);
            t.numItem = 0;
            t.hideTextList();
            t.inProduction.node.active = true;
            t.setLJQAnimation(t.LJQ, "3_hecheng", "吹气", function () {
              t.setLJQAnimation(t.LJQ, "4_jiesuan_" + r_CommerceCfg.CommerceCfg[e].animation, "sound" + r_CommerceCfg.CommerceCfg[e].animation, function () {
                t.LJQ.setAnimation(1, "1_daiji", true);
                t.inProduction.node.active = false;
                t.hideItem();
                t.mask.active = false;
                var o = r_CommerceCfg.CommerceCfg[e];
                r_CommerceResultUI.default.showUI(o);
              });
            });
          } else {
            t.LJQ.setAnimation(1, "1_daiji", true);
            t.mask.active = false;
          }
        });
        this.nowId = -1;
      } else if ("" != this.now_PF) {
        this.nowItem.children[0].active = false;
        this.LJQ.setSkin(this.LJQ_PF);
        this.now_PF = "";
      }
    }
    this.itemStartPos = cc.v2(0, 0);
    this.nowItem = null;
  };
  _ctor.prototype.findCfg = function (e, t) {
    var o = true;
    var i = e.split("");
    for (var n in t) {
      for (var a = 0; a < i.length; a++) {
        if (-1 == n.indexOf(i[a], 0)) {
          o = false;
          break;
        }
      }
      if (o) {
        return n;
      }
      o = true;
    }
    return "bad";
  };
  _ctor.prototype.update = function () {};
  __decorate([_property({
    type: sp.Skeleton,
    displayName: "李佳奇"
  })], _ctor.prototype, "LJQ", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "盒子"
  })], _ctor.prototype, "box", undefined);
  __decorate([_property({
    type: cc.RichText,
    displayName: "制作中"
  })], _ctor.prototype, "inProduction", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "遮罩"
  })], _ctor.prototype, "mask", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "物品列表"
  })], _ctor.prototype, "itemList", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "显示文本"
  })], _ctor.prototype, "textList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CommerceLogic;