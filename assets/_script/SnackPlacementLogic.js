var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SnackRoomFullCfg = require("SnackRoomFullCfg");
var r_SnackPlacementGuide = require("SnackPlacementGuide");
var r_SnackResultUI = require("SnackResultUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var g = [0, 90, 180, 270];
var v = [{
  id: 1,
  name: "相机",
  pic: 1,
  scale: .8,
  shape: 1,
  direction: 1,
  color: 2,
  prefabName: 2,
  boxInfo: [1, 2, 3, 4]
}, {
  id: 2,
  name: "qq糖",
  pic: 2,
  scale: .8,
  shape: 1,
  direction: 1,
  color: 1,
  prefabName: 2,
  boxInfo: [1, 2, 3, 4]
}, {
  id: 3,
  name: "德芙",
  pic: 3,
  scale: .8,
  shape: 1,
  direction: 1,
  color: 3,
  prefabName: 2,
  boxInfo: [1, 2, 3, 4]
}, {
  id: 4,
  name: "小火车",
  pic: 4,
  scale: .8,
  shape: 2,
  direction: 1,
  color: 2,
  prefabName: 2,
  boxInfo: [2, 3, 4]
}, {
  id: 5,
  name: "水枪",
  pic: 5,
  scale: .8,
  shape: 2,
  direction: 3,
  color: 3,
  prefabName: 2,
  boxInfo: [2, 3, 4]
}, {
  id: 6,
  name: "恐龙",
  pic: 6,
  scale: .8,
  shape: 2,
  direction: 1,
  color: 4,
  prefabName: 2,
  boxInfo: [2, 3, 4]
}, {
  id: 7,
  name: "兔子",
  pic: 7,
  scale: .6,
  shape: 3,
  direction: 0,
  color: 4,
  prefabName: 3,
  boxInfo: [2, 4, 5, 6]
}, {
  id: 8,
  name: "UFO",
  pic: 8,
  scale: .6,
  shape: 4,
  direction: 1,
  color: 2,
  prefabName: 3,
  boxInfo: [2, 4, 5, 6]
}, {
  id: 9,
  name: "橙汁",
  pic: 9,
  scale: .8,
  shape: 5,
  direction: 4,
  color: 1,
  prefabName: 0,
  boxInfo: [1, 2]
}, {
  id: 10,
  name: "牛奶糖",
  pic: 10,
  scale: .8,
  shape: 5,
  direction: 1,
  color: 2,
  prefabName: 0,
  boxInfo: [1, 2]
}, {
  id: 11,
  name: "奶糖",
  pic: 11,
  scale: .8,
  shape: 5,
  direction: 1,
  color: 3,
  prefabName: 0,
  boxInfo: [1, 2]
}, {
  id: 12,
  name: "拐杖",
  pic: 12,
  scale: .6,
  shape: 6,
  direction: 2,
  color: 2,
  prefabName: 3,
  boxInfo: [1, 4, 5, 6]
}, {
  id: 13,
  name: "绿箭",
  pic: 13,
  scale: .6,
  shape: 7,
  direction: 1,
  color: 4,
  prefabName: 1,
  boxInfo: [1, 2, 3]
}, {
  id: 14,
  name: "牛轧糖",
  pic: 14,
  scale: .6,
  shape: 7,
  direction: 1,
  color: 3,
  prefabName: 1,
  boxInfo: [1, 2, 3]
}, {
  id: 15,
  name: "棒棒糖",
  pic: 15,
  scale: .6,
  shape: 7,
  direction: 4,
  color: 2,
  prefabName: 1,
  boxInfo: [1, 2, 3]
}];
var def_SnackPlacementLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.Bg = null;
    t.boxLayer = null;
    t.touchNode = null;
    t.placeItem = null;
    t.placeItem1 = null;
    t.placeItem2 = null;
    t.colroBox = null;
    t.placeStartPos = null;
    t.privaterecycle = null;
    t.operationPos = [];
    t.lbNumb = null;
    t.fullAnim = null;
    t.lbTips = null;
    t.scoreTips = null;
    t.boxLayerSpriteFrames = [];
    t.snackItem = [];
    t.itemSpriteFrames = [];
    t.colroBoxSpriteFrames = [];
    t.btnFinish = null;
    t.curMaxNum = 30;
    t.curLevel = 1;
    t.touchStartPos = null;
    t.touchStartTime = null;
    t.moveInfo = null;
    t.moveInfoOldPos = null;
    t.touchMovePos = null;
    t.isClick = true;
    t.isLongTouch = true;
    t.touchTime = 3;
    t.placeItemList = [];
    t.colorItemlist = [];
    t.snackList = [];
    t.placeIndexList = [];
    t.placeAllIndexList = [];
    t.isPlayAnim = false;
    t.curOprateCount = 0;
    t.curGroup = 1;
    t.score = 0;
    t.boxCount = 0;
    t.sameColorLine = 0;
    t.scoreTipsPos = null;
    t.snackType = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.scoreTipsPos = this.scoreTips.getPosition();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.resetData = function () {
    this.curMaxNum = this.curData.baseSnack;
    this.touchStartPos = null;
    this.moveInfo = null;
    this.startID;
    this.moveInfoOldPos = null;
    this.curSelectIndex;
    this.touchMovePos = null;
    this.isClick = true;
    this.placeItemList = [];
    this.colorItemlist = [];
    this.snackList = [];
    this.placeIndexList = [];
    this.placeAllIndexList = [];
    this.isPlayAnim = false;
    this.curGroup = 1;
    this.curOprateCount = 0;
    this.score = 0;
    this.boxCount = 0;
    this.sameColorLine = 0;
    this.snackType = [];
  };
  _ctor.prototype.startGame = function (e) {
    e.index && (this.curLevel = e.index);
    if (1 == this.curLevel) {
      this.curData = r_SnackRoomFullCfg.SnackGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.giftGrade - 1];
      this.boxLayer.getComponent(cc.Sprite).spriteFrame = this.boxLayerSpriteFrames[r_PlayerData.PlayerData.data.snackRoomFull.giftGrade - 1];
    } else {
      this.curData = r_SnackRoomFullCfg.SnackHighGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1];
      this.boxLayer.getComponent(cc.Sprite).spriteFrame = this.boxLayerSpriteFrames[r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1 + 3];
    }
    for (var t = 0; t < this.placeItemList.length; t++) {
      this.placeItemList[t].node.removeFromParent(true);
    }
    for (t = 0; t < this.colorItemlist.length; t++) {
      this.colorItemlist[t].node.removeFromParent(true);
    }
    for (t = 0; t < this.snackList.length; t++) {
      this.snackList[t].node.removeFromParent(true);
    }
    this.resetData();
    e.snackType && e.snackType.length > 0 && (this.snackType = e.snackType);
    this.lbNumb.string = this.curMaxNum - this.curOprateCount + "";
    if (1 == this.curLevel && 1 == this.curData.grade) {
      this.lbTips.active = true;
    } else {
      this.lbTips.active = false;
    }
    this.btnFinish.active = false;
    this.registTouch();
    this.initPlaceItem();
    this.initSnackItem(this.curMaxNum);
  };
  _ctor.prototype.registTouch = function () {
    this.unregistTouch();
    if (!this.touchNode) {
      this.touchNode = new cc.Node();
      this.touchNode.width = 1668;
      this.touchNode.height = 1002;
      this.node.addChild(this.touchNode);
    }
    this.touchNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
  };
  _ctor.prototype.unregistTouch = function () {
    this.touchNode.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.touchNode.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
  };
  _ctor.prototype.touchStart = function (e) {
    e.getLocation();
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = null;
      if (1 != this.isPlayAnim) {
        for (var t = 0; t < this.snackList.length; t++) {
          var o = this.snackList[t];
          o.isFinish || o.active || r_UtilsSystem.UtilsSystem.touchInNode(o.node, this.touchStartPos) && (this.touchStartTime = new Date().getTime(), this.moveInfo = o, this.curSelectIndex = t, this.moveInfo.node.zIndex = 999, this.moveInfoOldPos = o.node.getPosition());
        }
      }
    }
  };
  _ctor.prototype.touchMove = function (e) {
    if (this.moveInfo && !this.isPlayAnim) {
      if (this.startID && this.startID != e.getID()) {
        e.stopPropagation();
      } else {
        var t = e.getLocation();
        var o = this.moveInfo.node.parent.convertToNodeSpaceAR(t);
        this.moveInfo.node.setPosition(o);
        if (this.touchStartPos.sub(e.getLocation()).mag() > 5) {
          this.isClick = false;
          this.moveInfo.node.scale = 1;
        }
        if (this.touchMovePos) {
          this.touchMovePos.sub(t).mag() < 5 && this.checkIsCanPlacement();
          this.touchMovePos = e.getLocation();
        } else {
          this.touchMovePos = e.getLocation();
        }
      }
    }
  };
  _ctor.prototype.touchEnd = function (e) {
    var t = this;
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.isClick = true;
      this.startID = null;
      if (this.moveInfo && !this.isPlayAnim) {
        if (this.touchStartPos.sub(e.getLocation()).mag() < 5 && this.isClick) {
          this.moveInfo.snackInfo.direction++;
          var o = this.moveInfo.snackInfo.direction;
          if (o > 4) {
            o = 1;
            this.moveInfo.snackInfo.direction = 1;
          }
          this.moveInfo.node.angle = -g[o - 1];
          this.isPlayAnim = true;
          cc.tween(this.moveInfo.node).parallel(cc.tween().to(.1, {
            x: this.moveInfoOldPos.x,
            y: this.moveInfoOldPos.y
          }), cc.tween().to(.1, {
            scale: this.moveInfo.snackInfo.scale
          })).call(function () {
            t.isPlayAnim = false;
          }).start();
          !r_PlayerData.PlayerData.data.snackRoomFull.isGameGuide && this.snackType.length <= 0 && r_TimeSystem.TimeSystem.scheduleOnce("placementGuide_0", .5, function () {
            r_SnackPlacementGuide.SnackPlacementGuide.showUI(2);
          });
        } else {
          var i = this.moveInfo.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          if (r_UtilsSystem.UtilsSystem.touchInNode(this.privaterecycle, i)) {
            this.moveInfo.isFinish = true;
            this.moveInfo.node.active = false;
            this.curOprateCount++;
            this.moveInfo = null;
            r_SoundMgr.SoundMgr.playSound("snackRoomFull/回收");
          } else {
            this.checkIsCanPlacement();
            if (this.placeIndexList.length > 0) {
              this.score += r_SnackRoomFullCfg.SnackRoomFullCfg.placeOneSnackScore;
              this.boxCount += this.placeIndexList.length;
              this.saveSnackPlacePos();
              this.setSuccessPos();
              this.setPlaceItemFinish();
              this.calcSameColorLine();
              this.moveInfo.isFinish = true;
              this.moveInfo.node.zIndex = this.moveInfo.zIndex;
              this.moveInfo = null;
              this.placeIndexList = [];
              this.curOprateCount++;
              this.lbTips.active = false;
              r_SoundMgr.SoundMgr.playSound("click");
              if (this.boxCount == this.curData.boxCount) {
                return void this.checkGameOver();
              }
            } else {
              this.isPlayAnim = true;
              cc.tween(this.moveInfo.node).parallel(cc.tween().to(.1, {
                x: this.moveInfoOldPos.x,
                y: this.moveInfoOldPos.y
              }), cc.tween().to(.1, {
                scale: this.moveInfo.snackInfo.scale
              })).call(function () {
                t.isPlayAnim = false;
              }).start();
            }
          }
          this.lbNumb.string = this.curMaxNum - this.curOprateCount + "";
          if (this.curMaxNum - this.curOprateCount <= 0) {
            this.checkGameOver();
          } else {
            this.curOprateCount >= 3 * this.curGroup && (this.curGroup += 1);
            this.setOprationSnackPos();
          }
        }
        this.touchStartTime = null;
      }
    }
  };
  _ctor.prototype.initPlaceItem = function () {
    for (var e = 0; e < this.curData.line.length; e++) {
      var t = this.curData.line[e].split(",");
      for (var o = 0; o < t.length; o++) {
        var i = cc.instantiate(this.placeItem);
        o % 2 == 1 && (i = cc.instantiate(this.placeItem1));
        this.Bg.addChild(i);
        i.x = this.curData.startPlacePos[0] + o * (this.placeItem.width - 4);
        i.y = this.curData.startPlacePos[1] - e * (this.placeItem.height - 4);
        var n = cc.instantiate(this.placeItem2);
        this.Bg.addChild(n);
        n.x = this.curData.startPlacePos[0] + o * (this.placeItem.width - 4);
        n.y = this.curData.startPlacePos[1] - e * (this.placeItem.height - 4);
        var a = undefined;
        if (parseInt(t[o]) > 0) {
          i.active = true;
          n.active = true;
          a = {
            node: n,
            type: 1,
            row: e,
            col: o,
            isFinish: false,
            color: 0
          };
        } else {
          a = {
            node: n,
            type: 0,
            row: e,
            col: o,
            isFinish: false,
            color: 0
          };
          i.active = false;
          n.active = false;
        }
        this.placeItemList.push(a);
        var s = cc.instantiate(this.colroBox);
        this.Bg.addChild(s);
        s.x = this.curData.startPlacePos[0] + o * (this.placeItem.width - 4);
        s.y = this.curData.startPlacePos[1] - e * (this.placeItem.height - 4);
        s.active = false;
        var r = {
          node: s,
          isFinish: false
        };
        this.colorItemlist.push(r);
      }
    }
  };
  _ctor.prototype.getSnackInfoById = function (e) {
    for (var t = 0; t < v.length; t++) {
      if (e == v[t].id) {
        return Object.assign({}, v[t]);
      }
    }
    return null;
  };
  _ctor.prototype.initSnackItem = function (e) {
    for (var t = 0; t < e; t++) {
      var o = 1;
      o = this.snackType.length <= 0 ? r_UtilsSystem.UtilsSystem.getRandomFromArr(this.curData.snackType) : r_UtilsSystem.UtilsSystem.getRandomFromArr(this.snackType);
      if (!r_PlayerData.PlayerData.data.snackRoomFull.isGameGuide && this.snackType.length <= 0) {
        if (0 == t || 1 == t) {
          o = 10;
        } else {
          2 == t && (o = 5);
        }
      }
      var i = this.getSnackInfoById(o);
      if (i) {
        var n = cc.instantiate(this.snackItem[i.prefabName]);
        n.x = 3e3;
        n.y = 3e3;
        this.Bg.addChild(n);
        n.active = false;
        n.getChildByName("pic").getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[i.pic - 1];
        n.angle = -g[i.direction - 1];
        n.scale = i.scale;
        var a = {
          node: n,
          snackInfo: i,
          zIndex: n.zIndex,
          isFinish: false
        };
        this.snackList.push(a);
      }
    }
    if (this.curOprateCount && this.curOprateCount >= 3 * this.curGroup) {
      this.initOprationSnackPos();
    } else {
      0 == this.curOprateCount && this.initOprationSnackPos();
    }
  };
  _ctor.prototype.initOprationSnackPos = function () {
    for (var e = 0; e < this.operationPos.length; e++) {
      if (this.snackList[this.curOprateCount + e]) {
        this.snackList[this.curOprateCount + e].node.x = this.operationPos[e].x;
        this.snackList[this.curOprateCount + e].node.y = this.operationPos[e].y;
        this.snackList[this.curOprateCount + e].node.active = true;
      }
    }
  };
  _ctor.prototype.setOprationSnackPos = function () {
    for (var e = 0; e < this.snackList.length; e++) {
      if (!this.snackList[e].isFinish && this.snackList[e].node.active) {
        return;
      }
    }
    for (e = 0; e < this.operationPos.length; e++) {
      if (this.snackList[this.curOprateCount + e]) {
        this.snackList[this.curOprateCount + e].node.x = this.operationPos[e].x;
        this.snackList[this.curOprateCount + e].node.y = this.operationPos[e].y;
        this.snackList[this.curOprateCount + e].node.active = true;
      }
    }
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo({
      stage: "补充零食",
      sys: "零食满屋"
    }, function () {
      e.curOprateCount >= 3 * e.curGroup && (e.curGroup += 1);
      e.initSnackItem(10);
      e.curMaxNum += 10;
      e.lbNumb.string = e.curMaxNum - e.curOprateCount + "";
    });
  };
  _ctor.prototype.onClickFinish = function () {
    this.checkGameOver(2);
  };
  _ctor.prototype.isExistPlaceIndexList = function (e) {
    for (var t = 0; t < this.placeIndexList.length; t++) {
      if (e == this.placeIndexList[t]) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.checkIsCanPlacement = function () {
    this.placeIndexList = [];
    for (var e = 0; e < this.moveInfo.snackInfo.boxInfo.length; e++) {
      var t = this.moveInfo.node.getChildByName("格子" + this.moveInfo.snackInfo.boxInfo[e]).convertToWorldSpaceAR(cc.Vec2.ZERO);
      for (var o = 0; o < this.placeItemList.length; o++) {
        var i = this.placeItemList[o];
        if (!i.isFinish && i.type && !this.isExistPlaceIndexList(o) && r_UtilsSystem.UtilsSystem.touchInNode(i.node, t)) {
          this.placeIndexList.push(o);
          break;
        }
      }
    }
    if (this.placeIndexList.length == this.moveInfo.snackInfo.boxInfo.length) {
      this.placeIndexList.sort(function (e, t) {
        return e - t;
      });
      console.log("  1111111111111  ", this.placeIndexList);
      this.showColorBox(true);
    } else {
      this.showColorBox(false);
      this.placeIndexList = [];
    }
  };
  _ctor.prototype.saveSnackPlacePos = function () {
    this.placeAllIndexList = [];
    var e = 2;
    if (3 == this.moveInfo.snackInfo.prefabName) {
      e = 6;
    } else if (2 == this.moveInfo.snackInfo.prefabName) {
      e = 4;
    } else {
      1 == this.moveInfo.snackInfo.prefabName && (e = 3);
    }
    for (var t = 0; t < e; t++) {
      var o = this.moveInfo.node.getChildByName("格子" + (t + 1)).convertToWorldSpaceAR(cc.Vec2.ZERO);
      for (var i = 0; i < this.placeItemList.length; i++) {
        var n = this.placeItemList[i];
        if (r_UtilsSystem.UtilsSystem.touchInNode(n.node, o)) {
          this.placeAllIndexList.push(i);
          break;
        }
      }
    }
    this.placeAllIndexList.sort(function (e, t) {
      return e - t;
    });
  };
  _ctor.prototype.showColorBox = function (e) {
    for (var t = 0; t < this.colorItemlist.length; t++) {
      this.colorItemlist[t].isFinish || (this.colorItemlist[t].node.active = false);
    }
    if (e) {
      for (t = 0; t < this.placeIndexList.length; t++) {
        var o = this.placeIndexList[t];
        this.colorItemlist[o].node.active = e;
        this.colorItemlist[o].node.getComponent(cc.Sprite).spriteFrame = this.colroBoxSpriteFrames[this.moveInfo.snackInfo.color - 1];
      }
    }
  };
  _ctor.prototype.setPlaceItemFinish = function () {
    for (var e = 0; e < this.placeIndexList.length; e++) {
      var t = this.placeIndexList[e];
      this.placeItemList[t].isFinish = true;
      this.placeItemList[t].color = this.moveInfo.snackInfo.color;
      this.colorItemlist[t].isFinish = true;
    }
  };
  _ctor.prototype.setSuccessPos = function () {
    this.moveInfo.node.x = (this.placeItemList[this.placeAllIndexList[0]].node.x + this.placeItemList[this.placeAllIndexList[this.placeAllIndexList.length - 1]].node.x) / 2;
    this.moveInfo.node.y = (this.placeItemList[this.placeAllIndexList[0]].node.y + this.placeItemList[this.placeAllIndexList[this.placeAllIndexList.length - 1]].node.y) / 2;
  };
  _ctor.prototype.calcSameColorLine = function () {
    var e = -1;
    var t = -1;
    var o = this.sameColorLine;
    for (var i = 0; i < this.placeIndexList.length; i++) {
      var n = this.placeIndexList[i];
      if (e != this.placeItemList[n].row) {
        this.isHaveSameColorByPlaceRow(this.placeItemList[n]) && (this.sameColorLine += 1);
        e = this.placeItemList[n].row;
        this.isHavePlaceRowFull(this.placeItemList[n]) && (this.btnFinish.active = true);
      }
      if (t != this.placeItemList[n].col) {
        this.isHaveSameColorByPlaceCol(this.placeItemList[n]) && (this.sameColorLine += 1);
        t = this.placeItemList[n].col;
        this.isHavePlaceColFull(this.placeItemList[n]) && (this.btnFinish.active = true);
      }
    }
    var a = this.sameColorLine - o;
    if (1 == a) {
      this.showScoreTips(0);
      this.score += r_SnackRoomFullCfg.SnackRoomFullCfg.oneLineSameColor;
    } else if (2 == a) {
      this.showScoreTips(1);
      this.score += r_SnackRoomFullCfg.SnackRoomFullCfg.twoLineSameColor;
    } else if (3 == a) {
      this.showScoreTips(2);
      this.score += r_SnackRoomFullCfg.SnackRoomFullCfg.thirdLineSameColor;
    }
  };
  _ctor.prototype.isHaveSameColorByPlaceRow = function (e) {
    var t = true;
    for (var o = 0; o < this.placeItemList.length; o++) {
      if (this.placeItemList[o].type > 0 && this.placeItemList[o].row == e.row && (!this.placeItemList[o].isFinish || this.placeItemList[o].color != e.color)) {
        t = false;
        break;
      }
    }
    return t;
  };
  _ctor.prototype.isHaveSameColorByPlaceCol = function (e) {
    var t = true;
    for (var o = 0; o < this.placeItemList.length; o++) {
      if (this.placeItemList[o].type > 0 && this.placeItemList[o].col == e.col && (!this.placeItemList[o].isFinish || this.placeItemList[o].color != e.color)) {
        t = false;
        break;
      }
    }
    return t;
  };
  _ctor.prototype.isHavePlaceRowFull = function (e) {
    var t = true;
    for (var o = 0; o < this.placeItemList.length; o++) {
      if (this.placeItemList[o].type > 0 && this.placeItemList[o].row == e.row && !this.placeItemList[o].isFinish) {
        t = false;
        break;
      }
    }
    return t;
  };
  _ctor.prototype.isHavePlaceColFull = function (e) {
    var t = true;
    for (var o = 0; o < this.placeItemList.length; o++) {
      if (this.placeItemList[o].type > 0 && this.placeItemList[o].col == e.col && !this.placeItemList[o].isFinish) {
        t = false;
        break;
      }
    }
    return t;
  };
  _ctor.prototype.isAllBoxSameColor = function () {
    var e = true;
    for (var t = 1; t < this.placeItemList.length; t++) {
      if (this.placeItemList[t].type > 0 && (!this.placeItemList[t].isFinish || this.placeItemList[t].color != this.placeItemList[0].color)) {
        e = false;
        break;
      }
    }
    return e;
  };
  _ctor.prototype.showFullAnim = function () {
    this.fullAnim.active = true;
    this.fullAnim.opacity = 255;
    cc.Tween.stopAllByTarget(this.fullAnim);
    this.fullAnim.zIndex = 999;
    cc.tween(this.fullAnim).to(1, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.showScoreTips = function (e) {
    var t = this;
    undefined === e && (e = 0);
    r_SoundMgr.SoundMgr.playSound("snackRoomFull/额外得分音效");
    this.scoreTips.active = true;
    this.scoreTips.getComponent(sp.Skeleton).setAnimation(0, ["5", "10", "20", "80"][e], false);
    this.scoreTips.opacity = 255;
    cc.Tween.stopAllByTarget(this.scoreTips);
    this.scoreTips.zIndex = 999;
    cc.tween(this.scoreTips).delay(1).call(function () {
      t.scoreTips.opacity = 0;
    }).start();
  };
  _ctor.prototype.checkGameOver = function (e) {
    undefined === e && (e = 1);
    this.btnFinish.active = false;
    if (this.isAllBoxSameColor()) {
      this.score += r_SnackRoomFullCfg.SnackRoomFullCfg.allSameColorScore;
      this.showScoreTips(2);
    }
    this.boxCount == this.curData.boxCount && this.showFullAnim();
    var t = {
      level: this.curLevel,
      score: this.score,
      boxCount: this.boxCount
    };
    if (1 == e) {
      r_TimeSystem.TimeSystem.scheduleOnce("snackGameover", 1, function () {
        r_SnackResultUI.SnackResultUI.showUI(t);
      });
    } else {
      r_SnackResultUI.SnackResultUI.showUI(t);
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "背景"
  })], _ctor.prototype, "Bg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "棋盘"
  })], _ctor.prototype, "boxLayer", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    displayName: "位置格子节点",
    type: cc.Node
  })], _ctor.prototype, "placeItem", undefined);
  __decorate([_property({
    displayName: "位置格子节点1",
    type: cc.Node
  })], _ctor.prototype, "placeItem1", undefined);
  __decorate([_property({
    displayName: "判断位置的节点1",
    type: cc.Node
  })], _ctor.prototype, "placeItem2", undefined);
  __decorate([_property({
    displayName: "颜色格子",
    type: cc.Node
  })], _ctor.prototype, "colroBox", undefined);
  __decorate([_property({
    displayName: "初始位置（节点）",
    type: cc.Node
  })], _ctor.prototype, "placeStartPos", undefined);
  __decorate([_property({
    displayName: "回收站",
    type: cc.Node
  })], _ctor.prototype, "privaterecycle", undefined);
  __decorate([_property({
    displayName: "操作位置",
    type: cc.Node
  })], _ctor.prototype, "operationPos", undefined);
  __decorate([_property({
    displayName: "数量",
    type: cc.Label
  })], _ctor.prototype, "lbNumb", undefined);
  __decorate([_property({
    displayName: "填满动画",
    type: cc.Node
  })], _ctor.prototype, "fullAnim", undefined);
  __decorate([_property({
    displayName: "摆放的提示（拖动一个就消失）",
    type: cc.Node
  })], _ctor.prototype, "lbTips", undefined);
  __decorate([_property({
    displayName: "摆放好整齐的一个提示",
    type: cc.Node
  })], _ctor.prototype, "scoreTips", undefined);
  __decorate([_property({
    displayName: "棋盘节点精灵的精灵帧",
    type: cc.SpriteFrame
  })], _ctor.prototype, "boxLayerSpriteFrames", undefined);
  __decorate([_property({
    displayName: "零食节点",
    type: cc.Node
  })], _ctor.prototype, "snackItem", undefined);
  __decorate([_property({
    displayName: "零食节点精灵的精灵帧",
    type: cc.SpriteFrame
  })], _ctor.prototype, "itemSpriteFrames", undefined);
  __decorate([_property({
    displayName: "颜色格子节点精灵的精灵帧",
    type: cc.SpriteFrame
  })], _ctor.prototype, "colroBoxSpriteFrames", undefined);
  __decorate([_property({
    displayName: "完成摆放的按钮",
    type: cc.Node
  })], _ctor.prototype, "btnFinish", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SnackPlacementLogic;