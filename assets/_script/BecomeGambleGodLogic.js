var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_LevelPreload = require("LevelPreload");
var r_SoundMgr = require("SoundMgr");
var r_BecomeGambleGodResult = require("BecomeGambleGodResult");
var r_BecomeGambleGodHelp = require("BecomeGambleGodHelp");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["不能胡"] = 0] = "不能胡";
  e[e["普通胡"] = 1] = "普通胡";
  e[e["清一色"] = 2] = "清一色";
})(s || (s = {}));
(function (e) {
  e[e.hand = 0] = "hand";
  e[e.out = 1] = "out";
  e[e.peng = 2] = "peng";
  e[e.gang = 3] = "gang";
})(r || (r = {}));
var C = {
  1: {
    myCarInfo: {
      hand: [12, 12, 78, 79],
      pengHand: [76, 76, 76, 77, 77, 77, 78, 78, 78],
      moHand: [77, 80, 80, 80, 80, 79]
    },
    otherCardInfo: {
      hand: [71, 71, 71, 72, 72, 72, 73, 73, 73, 74, 74, 74, 79],
      pengHand: [],
      moHand: [17, 20, 20, 20, 20, 19]
    }
  },
  2: {
    myCarInfo: {
      hand: [12, 12, 48, 49],
      pengHand: [46, 46, 46, 47, 47, 47, 48, 48, 48],
      moHand: [47, 50, 50, 50, 50, 49]
    },
    otherCardInfo: {
      hand: [41, 41, 41, 42, 42, 42, 43, 43, 43, 44, 44, 44, 49],
      pengHand: [],
      moHand: [71, 71, 71, 72, 72, 72]
    }
  },
  3: {
    myCarInfo: {
      hand: [42, 42, 18, 19],
      pengHand: [16, 16, 16, 17, 17, 17, 18, 18, 18],
      moHand: [17, 20, 20, 20, 20, 19]
    },
    otherCardInfo: {
      hand: [11, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 19],
      pengHand: [],
      moHand: [41, 41, 41, 42, 42, 42]
    }
  }
};
var S = ["#3cff40", "#de4f36"];
var def_BecomeGambleGodLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.deskNode = null;
    t.roleNode = null;
    t.roleQipao = null;
    t.roleMyNode = null;
    t.roleMyQipao = null;
    t.lbGilrSocre = null;
    t.lbGilrAddSocre = null;
    t.lbMySocre = null;
    t.lbMyAddSocre = null;
    t.lbHuSocre = null;
    t.lbRemain = null;
    t.PlaseOutCard = null;
    t.gangAnim = null;
    t.huAnim = null;
    t.liujuAnim = null;
    t.moShouAnim = null;
    t.moShouAnim1 = null;
    t.jianTouAnim = null;
    t.btnTip = null;
    t.btnHu = null;
    t.btnGang = null;
    t.btnPass = null;
    t.btnMo = null;
    t.playerNodeList = [];
    t.handPrefab = null;
    t.otherHandPrefab = null;
    t.pengPrefab = null;
    t.outCardPrefab = null;
    t.outCard1Prefab = null;
    t.cardAtlas = null;
    t.curClick = 0;
    t.isShowGirlHand = false;
    t.isShowGirlHand1 = false;
    t.myHandList = [];
    t.myMoHandList = [];
    t.otherHandList = [];
    t.otherMoHandList = [];
    t.curIndex = 0;
    t.curMyRound = 0;
    t.curOtherRound = 0;
    t.curOut = 0;
    t.isCanOpreation = false;
    t.isFirstMo = false;
    t.myScore = -1e3;
    t.girlScore = 1e3;
    t.isGameOver = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.registTouch();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    this.init();
    this.startGame();
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.init = function () {
    this.curMyRound = 0;
    this.curClick = 0;
    this.myScore = -1e3;
    this.girlScore = 1e3;
    this.btnHu.active = false;
    this.btnGang.active = false;
    this.btnPass.active = false;
    this.btnMo.active = false;
    this.isFirstMo = false;
    this.showMySocreLabel();
    this.showGirlSocreLabel();
    r_UtilsSystem.UtilsSystem.getDeepChildByName(this.node, "最后一局").setSiblingIndex(this.deskNode.getSiblingIndex() + 1);
  };
  _ctor.prototype.startGame = function () {
    var e = this;
    this.initGameHandCard();
    this.showDeskCardCount();
    this.showGirlRoleAnim(this.roleNode, "step_1", true);
    this.showGirlRoleQiPao("最后一把了，你快点", "最后一把你快点");
    r_TimeSystem.TimeSystem.scheduleOnce("startgame_god", .5, function () {
      e.curOut = 0;
      e.curMyRound = 0;
      e.showMoBtnVisble(true);
    });
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  _ctor.prototype.initGameHandCard = function () {
    this.curIndex = r_UtilsSystem.UtilsSystem.getRandomNum(1, 3);
    for (var e = 0; e < C[this.curIndex].myCarInfo.hand.length; e++) {
      var t = C[this.curIndex].myCarInfo.hand[e];
      this.myHandList.push({
        id: t,
        node: null,
        state: r.hand,
        select: false
      });
    }
    for (e = 0; e < C[this.curIndex].myCarInfo.pengHand.length; e++) {
      t = C[this.curIndex].myCarInfo.pengHand[e];
      this.myHandList.push({
        id: t,
        node: null,
        state: r.peng,
        select: false
      });
    }
    this.myHandList.sort(function (e, t) {
      return e.id - t.id;
    });
    this.myMoHandList = C[this.curIndex].myCarInfo.moHand;
    for (e = 0; e < C[this.curIndex].otherCardInfo.hand.length; e++) {
      t = C[this.curIndex].otherCardInfo.hand[e];
      this.otherHandList.push({
        id: t,
        node: null,
        state: r.hand,
        select: false
      });
    }
    for (e = 0; e < C[this.curIndex].otherCardInfo.pengHand.length; e++) {
      t = C[this.curIndex].otherCardInfo.pengHand[e];
      this.otherHandList.push({
        id: t,
        node: null,
        state: r.peng,
        select: false
      });
    }
    this.otherHandList.sort(function (e, t) {
      return e.id - t.id;
    });
    this.otherMoHandList = C[this.curIndex].otherCardInfo.moHand;
    var o = 0;
    var i = -this.getHandCardByType1(this.myHandList, r.hand) / 2 * this.handPrefab.width;
    for (e = 0; e < this.myHandList.length; e++) {
      if (this.myHandList[e].state == r.hand) {
        var n = this.playerNodeList[0].getChildByName("hand");
        (h = cc.instantiate(this.handPrefab)).getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame("hand_" + this.myHandList[e].id);
        h.x = i + o * this.handPrefab.width;
        h.y = 0;
        h.parent = n;
        o += 1;
        this.myHandList[e].node = h;
      }
    }
    var a = 0;
    var s = -this.pengPrefab.width;
    for (e = 0; e < this.myHandList.length; e++) {
      if (this.myHandList[e].state == r.peng) {
        n = this.playerNodeList[0].getChildByName("peng");
        (h = cc.instantiate(this.pengPrefab)).getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame("peng_" + this.myHandList[e].id);
        h.x = s + this.pengPrefab.width;
        h.y = 0;
        h.parent = n;
        a % 3 == 0 && (h.x = s + this.pengPrefab.width + 20);
        this.myHandList[e].node = h;
        a += 1;
        s = h.x;
      }
    }
    var c = this.getHandCardByType1(this.otherHandList, r.hand) / 2 * this.otherHandPrefab.width;
    var l = 0;
    for (e = 0; e < this.otherHandList.length; e++) {
      if (this.otherHandList[e].state == r.hand) {
        var h;
        n = this.playerNodeList[1].getChildByName("hand");
        (h = cc.instantiate(this.otherHandPrefab)).x = c + l * -this.otherHandPrefab.width;
        h.y = 0;
        h.parent = n;
        l += 1;
        this.otherHandList[e].node = h;
      }
    }
  };
  _ctor.prototype.getHandCardByType1 = function (e, t) {
    var o = 0;
    var i = e;
    for (var n = 0; n < i.length; n++) {
      i[n].state == t && (o += 1);
    }
    return o;
  };
  _ctor.prototype.getHandCardByType = function (e) {
    var t = 0;
    var o = this.myHandList;
    this.curOut && (o = this.otherHandList);
    for (var i = 0; i < o.length; i++) {
      o[i].state == e && (t += 1);
    }
    return t;
  };
  _ctor.prototype.addOutCard = function (e) {
    var t = this.outCardPrefab;
    var o = this.playerNodeList[0];
    if (this.curOut) {
      t = this.outCard1Prefab;
      o = this.playerNodeList[1];
    }
    var i = o.getChildByName("out");
    var n = cc.instantiate(t);
    n.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame("peng_" + e);
    n.x = (this.getHandCardByType(r.out) - 1) * t.width;
    this.curOut && (n.x = (this.getHandCardByType(r.out) - 1) * -t.width);
    n.y = 0;
    n.parent = i;
  };
  _ctor.prototype.addHandCard = function () {
    var e = this;
    var t = this.myMoHandList[this.curMyRound];
    var o = this.handPrefab;
    var i = this.playerNodeList[0];
    if (this.curOut) {
      o = this.otherHandPrefab;
      i = this.playerNodeList[1];
      t = this.otherMoHandList[this.curOtherRound];
    }
    var n = i.getChildByName("hand");
    var a = cc.instantiate(o);
    var s = -this.getHandCardByType1(this.myHandList, r.hand) / 2 * this.handPrefab.width;
    var c = this.getHandCardByType1(this.otherHandList, r.hand) / 2 * this.otherHandPrefab.width;
    a.x = this.getHandCardByType(r.hand) * o.width + o.width;
    if (this.curOut) {
      a.x = c + this.getHandCardByType(r.hand) * -o.width - o.width;
      this.otherHandList.push({
        id: t,
        node: a,
        state: r.hand,
        select: false
      });
    } else {
      a.x = s + this.getHandCardByType1(this.myHandList, r.hand) * o.width + o.width;
      a.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame("hand_" + t);
      this.myHandList.push({
        id: t,
        node: a,
        state: r.hand,
        select: false
      });
      this.showDeskCardCount();
    }
    a.y = 0;
    a.parent = n;
    if (!this.curOut) {
      if (this.isFirstMo) {
        this.isCanOpreation = true;
        this.showArrawAnim(true);
        this.refreshOprationBtn();
      } else {
        this.showMoPaiAnim(function () {
          e.showArrawAnim(true);
          e.refreshOprationBtn();
        });
      }
    }
  };
  _ctor.prototype.showArrawAnim = function (e) {
    undefined === e && (e = true);
    if (e) {
      var t = this.myHandList[this.myHandList.length - 1].node.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var o = this.playerNodeList[0].convertToNodeSpaceAR(t);
      this.jianTouAnim.x = o.x + 7;
      this.jianTouAnim.active = e;
      cc.Tween.stopAllByTarget(this.jianTouAnim);
      cc.tween(this.jianTouAnim).repeatForever(cc.tween().to(.5, {
        y: 100
      }).to(.5, {
        y: 80
      })).start();
    } else {
      cc.Tween.stopAllByTarget(this.jianTouAnim);
      this.jianTouAnim.active = e;
    }
  };
  _ctor.prototype.showMoPaiAnim = function (e) {
    var t = this;
    this.isFirstMo = true;
    var o = this.myHandList[this.myHandList.length - 1].node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var i = this.playerNodeList[0].convertToNodeSpaceAR(o);
    this.moShouAnim.x = i.x + 90;
    this.moShouAnim1.x = i.x + 90;
    this.showSpineAnim(this.moShouAnim, "animation", false, function () {
      t.moShouAnim.active = false;
      t.moShouAnim.active = false;
      e && e();
      t.isCanOpreation = true;
    });
    this.showSpineAnim(this.moShouAnim1, "animation", false, function () {});
  };
  _ctor.prototype.showDeskCardCount = function () {
    var e = this.myMoHandList.length - this.curMyRound - 1;
    e < 0 && (e = 0);
    this.lbRemain.getComponent(cc.Label).string = "剩余" + e + "张牌";
  };
  _ctor.prototype.addGangCard = function () {
    this.pengPrefab;
    var e = this.playerNodeList[0];
    if (this.curOut) {
      this.pengPrefab;
      e = this.playerNodeList[1];
    }
    this.myHandList.sort(function (e, t) {
      return e.id - t.id;
    });
    var t = e.getChildByName("peng");
    var o = 0;
    var i = 1;
    var n = -this.pengPrefab.width;
    t.removeAllChildren();
    for (var a = 0; a < this.myHandList.length; a++) {
      var s = cc.instantiate(this.pengPrefab);
      s.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame("peng_" + this.myHandList[a].id);
      s.y = 0;
      s.parent = t;
      if (this.myHandList[a].state == r.peng) {
        s.x = n + this.pengPrefab.width;
        o == this.myHandList[a].id && (i += 1);
        o = this.myHandList[a].id;
        n = s.x;
        if (i >= 3) {
          n = s.x + 20;
          i = 1;
        }
      } else if (this.myHandList[a].state == r.gang) {
        s.x = n + this.pengPrefab.width;
        if (o == this.myHandList[a].id && (i += 1) >= 4) {
          s.x = n - this.pengPrefab.width;
          s.y = 10;
        }
        o = this.myHandList[a].id;
        n = s.x;
        if (i >= 4) {
          n = s.x + this.pengPrefab.width + 20;
          i = 1;
        }
      }
    }
  };
  _ctor.prototype.setGangCard = function (e) {
    var t = this.myHandList;
    this.curOut && (t = this.otherHandList);
    for (var o = 0; o < t.length; o++) {
      if (t[o].id == e) {
        t[o].state = r.gang;
        t[o].node.active = false;
      }
    }
  };
  _ctor.prototype.showMoBtnVisble = function (e) {
    undefined === e && (e = true);
    this.btnMo.active = e;
    if (e) {
      this.btnHu.active = !e;
      this.btnGang.active = !e;
      this.btnPass.active = !e;
    }
  };
  _ctor.prototype.refreshOprationBtn = function (e) {
    undefined === e && (e = true);
    if (!e) {
      this.btnHu.getComponent(cc.Button).enabled = false;
      this.btnHu.getChildByName("gray").active = true;
      this.btnGang.getComponent(cc.Button).enabled = false;
      this.btnGang.getChildByName("gray").active = true;
      this.btnPass.getComponent(cc.Button).enabled = false;
      this.btnPass.getChildByName("gray").active = true;
      this.lbHuSocre.active = false;
      return void (this.PlaseOutCard.active = false);
    }
    console.log("  btnHu1111 : ", this.checkHu(this.myHandList));
    this.btnHu.active = this.checkHu(this.myHandList) > 0;
    this.btnGang.active = this.checkGang(this.myHandList) > 0;
    this.btnHu.active = true;
    this.btnGang.active = true;
    this.btnPass.active = true;
    if (this.checkHu(this.myHandList) > 0 || this.checkGang(this.myHandList) > 0) {
      if (this.checkHu(this.myHandList)) {
        this.btnHu.getComponent(cc.Button).enabled = true;
        this.btnHu.getChildByName("gray").active = false;
      }
      if (this.checkGang(this.myHandList) > 0) {
        this.btnGang.getComponent(cc.Button).enabled = true;
        this.btnGang.getChildByName("gray").active = false;
      }
      this.btnPass.active = true;
      this.btnPass.getComponent(cc.Button).enabled = true;
      this.btnPass.getChildByName("gray").active = false;
    } else {
      this.btnHu.getComponent(cc.Button).enabled = false;
      this.btnHu.getChildByName("gray").active = true;
      this.btnGang.getComponent(cc.Button).enabled = false;
      this.btnGang.getChildByName("gray").active = true;
      this.btnPass.getComponent(cc.Button).enabled = false;
      this.btnPass.getChildByName("gray").active = true;
      this.PlaseOutCard.active = true;
    }
    console.log("  btnHu22222 : ", this.checkHu(this.myHandList));
    if (this.checkHu(this.myHandList) == s.普通胡) {
      this.lbHuSocre.getComponent(cc.Label).string = "100分";
      this.lbHuSocre.active = true;
    } else if (this.checkHu(this.myHandList) == s.清一色) {
      this.lbHuSocre.getComponent(cc.Label).string = "600分";
      this.lbHuSocre.active = true;
    }
  };
  _ctor.prototype.updateHandPos = function () {
    this.myHandList.sort(function (e, t) {
      return e.id - t.id;
    });
    var e = -this.getHandCardByType1(this.myHandList, r.hand) / 2 * this.handPrefab.width;
    var t = 0;
    for (var o = 0; o < this.myHandList.length; o++) {
      if (this.myHandList[o].state == r.hand) {
        var i = this.myHandList[o].node;
        i.x = e + t * this.handPrefab.width;
        i.y = 0;
        t += 1;
      }
    }
  };
  _ctor.prototype.updateOtherPlayerHandPos = function () {
    var e = 0;
    var t = this.getHandCardByType1(this.otherHandList, r.hand) / 2 * this.otherHandPrefab.width;
    this.isShowGirlHand && (t = this.getHandCardByType1(this.otherHandList, r.hand) / 2 * this.pengPrefab.width);
    for (var o = 0; o < this.otherHandList.length; o++) {
      if (this.otherHandList[o].state == r.hand) {
        var i = this.otherHandPrefab.width;
        var n = this.otherHandList[o].node;
        this.isShowGirlHand && (i = this.pengPrefab.width);
        n.x = t + e * -i;
        n.y = 0;
        e += 1;
      }
    }
  };
  _ctor.prototype.showGirlAllHand = function () {
    var e = 0;
    var t = this.getHandCardByType1(this.otherHandList, r.hand) / 2 * this.pengPrefab.width;
    for (var o = 0; o < this.otherHandList.length; o++) {
      if (this.otherHandList[o].state == r.hand) {
        var i = this.otherHandList[o].node;
        if (i) {
          i.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame("peng_" + this.otherHandList[o].id);
          i.x = t + e * -this.pengPrefab.width;
          i.y = 0;
          e += 1;
        }
      }
    }
  };
  _ctor.prototype.resetGirlAllHand = function () {
    var e = 0;
    var t = this.getHandCardByType1(this.otherHandList, r.hand) / 2 * this.otherHandPrefab.width;
    for (var o = 0; o < this.otherHandList.length; o++) {
      if (this.otherHandList[o].state == r.hand) {
        var i = this.otherHandList[o].node;
        if (i) {
          i.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame("card_block");
          i.x = t + e * -this.otherHandPrefab.width;
          i.y = 0;
          e += 1;
        }
      }
    }
  };
  _ctor.prototype.playerOutCard = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("bcGambleGod/出牌");
    var o = 1;
    if (this.curOut) {
      o = 2;
      this.showGirlRoleAnim(this.roleNode, "step_2", false, function () {
        t.showGirlRoleAnim(t.roleNode, "step_1", true);
        t.addOutCard(e);
        t.updateOtherPlayerHandPos();
      });
    } else {
      this.updateHandPos();
      this.addOutCard(e);
    }
    r_TimeSystem.TimeSystem.scheduleOnce("nextRound", o, function () {
      if (!t.curOut) {
        t.otherHandList.push({
          id: e,
          node: null,
          state: r.hand,
          select: false
        });
        if (t.checkHu(t.otherHandList)) {
          var o = 0;
          if (t.checkHu(t.otherHandList) == s.普通胡) {
            t.myScore -= 100;
            t.girlScore += 100;
            o = 100;
          } else if (t.checkHu(t.otherHandList) == s.清一色) {
            t.myScore -= 600;
            t.girlScore += 600;
            o = 600;
          }
          t.showMyAddScoreAnim(-o);
          t.showGirlScoreAnim(o);
          t.showGirlAllHand();
          r_SoundMgr.SoundMgr.playSound("bcGambleGod/杠胡得分音效");
          t.showSpineAnim(t.huAnim, "animation", false, function () {
            t.huAnim.active = false;
            t.showGirlRoleQiPao("我胡了", "我胡了");
          });
          return void r_TimeSystem.TimeSystem.scheduleOnce("gameover_bc", 3, function () {
            r_BecomeGambleGodResult.BecomeGambleGodResult.showUI({
              myScore: t.myScore,
              girlScore: t.girlScore
            });
          });
        }
        t.otherHandList.splice(t.otherHandList.length - 1, 1);
      }
      t.nextRound();
    });
  };
  _ctor.prototype.nextRound = function () {
    var e = this;
    var t = this;
    this.curOut += 1;
    this.curOut > 1 && (this.curOut = 0);
    if (this.curOut) {
      var o = this.otherMoHandList[this.curOtherRound];
      this.curMyRound += 1;
      this.addHandCard();
      r_TimeSystem.TimeSystem.scheduleOnce("otherAutoOutCard", 1, function () {
        t.otherHandList[t.otherHandList.length - 1].state = r.out;
        t.otherHandList[t.otherHandList.length - 1].node.active = false;
        t.playerOutCard(o);
      });
    } else if (this.curMyRound >= this.myMoHandList.length) {
      this.showGirlAllHand();
      this.showSpineAnim(this.liujuAnim, "animation", false, function () {
        e.liujuAnim.active = false;
        r_BecomeGambleGodResult.BecomeGambleGodResult.showUI({
          myScore: e.myScore,
          girlScore: e.girlScore
        });
      });
    } else {
      this.curOtherRound += 1;
      if (this.isFirstMo) {
        this.addHandCard();
      } else {
        this.showMoBtnVisble(true);
      }
    }
  };
  _ctor.prototype.resetOtherHandCardPos = function () {
    for (var e = 0; e < this.myHandList.length; e++) {
      if (this.myHandList[e].state == r.hand) {
        this.myHandList[e].node.y = 0;
        this.myHandList[e].select = false;
      }
    }
  };
  _ctor.prototype.checkGang = function (e) {
    var t = [];
    for (var o = 0; o < e.length; o++) {
      e[o].state == r.hand && t.push(e[o].id);
    }
    t.sort(function (e, t) {
      return e - t;
    });
    var i = 0;
    var n = 1;
    for (o = 0; o < t.length; o++) {
      if (o > 0 && i == t[o]) {
        if ((n += 1) >= 4) {
          return t[o];
        }
      } else {
        n = 1;
      }
      i = t[o];
    }
    var a = [];
    for (o = 0; o < e.length; o++) {
      e[o].state == r.peng && a.push(e[o].id);
    }
    a.sort(function (e, t) {
      return e - t;
    });
    for (o = 0; o < t.length; o++) {
      for (var s = 0; s < a.length; s++) {
        if (t[o] == a[s]) {
          return t[o];
        }
      }
    }
    return -1;
  };
  _ctor.prototype.isQiYiSe = function (e) {
    if (this.checkHu(e)) {
      var t = 0;
      var o = [];
      for (var i = 0; i < e.length; i++) {
        if (e[i].state == r.hand) {
          t = e[i].id / 10;
          -1 == o.indexOf(t) && o.push(t);
        }
      }
      return o.length < 2;
    }
    return false;
  };
  _ctor.prototype.checkHu = function (e) {
    var t = [];
    for (var o = 0; o < e.length; o++) {
      e[o].state == r.hand && t.push(e[o].id);
    }
    t.sort(function (e, t) {
      return e - t;
    });
    if (t.length % 3 != 2) {
      return s.不能胡;
    }
    var i = [];
    var n = 0;
    var a = false;
    for (o = 0; o < t.length; o++) {
      if (o > 0 && n == t[o]) {
        -1 == i.indexOf(t[o]) && i.push(t[o]);
        n = 0;
      }
      n = t[o];
    }
    for (o = 0; o < i.length; o++) {
      var c = t.concat();
      var l = c.indexOf(i[o]);
      c.splice(l, 2);
      this.findKeZi(c) && (a = true);
    }
    if (a) {
      var u = 0;
      var h = [];
      for (o = 0; o < e.length; o++) {
        if (e[o].state == r.hand) {
          u = Math.floor(e[o].id / 10);
          -1 == h.indexOf(u) && h.push(u);
        }
      }
      if (1 == h.length || 2 == h.length && 1 == Math.abs(h[0] - h[1])) {
        return s.清一色;
      } else {
        return s.普通胡;
      }
    }
    return s.不能胡;
  };
  _ctor.prototype.findKeZi = function (e) {
    for (var t = 0; t < e.length - 2; t++) {
      if (e[t] == e[t + 1] && e[t] == e[t + 2]) {
        var o = e.indexOf(e[t]);
        e.splice(o, 3);
        this.findKeZi(e);
      } else {
        if (e[t] != e[t + 1] - 1 || e[t] != e[t + 2] - 2) {
          return false;
        }
        o = e.indexOf(e[t]);
        e.splice(o, 3);
        this.findKeZi(e);
      }
    }
    return !(e.length > 0);
  };
  _ctor.prototype.showGirlRoleAnim = function (e, t, o, i) {
    undefined === o && (o = true);
    e.active = true;
    var n = e.getComponent(sp.Skeleton);
    n.paused = false;
    n.timeScale = 1;
    console.log("人物动画 ", t);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
  };
  _ctor.prototype.showGirlRoleQiPao = function (e, t, o) {
    var i = this;
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound("bcGambleGod/" + t);
    this.roleQipao.opacity = 255;
    this.roleQipao.parent.opacity = 255;
    this.roleQipao.getChildByName("label").getComponent(cc.Label).string = e;
    cc.Tween.stopAllByTarget(this.roleQipao);
    cc.tween(this.roleQipao).delay(2).call(function () {
      o && o();
      i.roleQipao.opacity = 0;
    }).start();
  };
  _ctor.prototype.showSpineAnim = function (e, t, o, i) {
    undefined === o && (o = true);
    e.active = true;
    var n = e.getComponent(sp.Skeleton);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
  };
  _ctor.prototype.onClickOperation = function (e, t) {
    var o = this;
    r_SoundMgr.SoundMgr.playSound("click");
    var i = false;
    if ("hu" == t) {
      this.isCanOpreation = false;
      r_SoundMgr.SoundMgr.playSound("bcGambleGod/杠胡得分音效");
      this.showSpineAnim(this.huAnim, "animation", false, function () {
        o.huAnim.active = false;
      });
      var n = 0;
      if (this.checkHu(this.myHandList) == s.普通胡) {
        this.myScore += 100;
        this.girlScore -= 100;
        n = 100;
      } else if (this.checkHu(this.myHandList) == s.清一色) {
        this.myScore += 600;
        this.girlScore -= 600;
        n = 600;
      }
      this.showMyAddScoreAnim(n);
      this.showGirlScoreAnim(-n);
      this.showGirlAllHand();
      r_TimeSystem.TimeSystem.scheduleOnce("gameover_bc", 2, function () {
        r_BecomeGambleGodResult.BecomeGambleGodResult.showUI({
          myScore: o.myScore,
          girlScore: o.girlScore
        });
      });
      this.refreshOprationBtn(false);
    } else if ("gang" == t) {
      r_SoundMgr.SoundMgr.playSound("bcGambleGod/杠胡得分音效");
      this.showArrawAnim(false);
      this.showSpineAnim(this.gangAnim, "animation", false, function () {
        o.gangAnim.active = false;
      });
      this.isCanOpreation = false;
      var a = this.checkGang(this.myHandList);
      this.setGangCard(a);
      this.addGangCard(a);
      this.updateHandPos();
      this.myScore += 200;
      this.girlScore -= 200;
      this.showMyAddScoreAnim(200);
      this.showGirlScoreAnim(-200);
      r_TimeSystem.TimeSystem.scheduleOnce("gang_my", .5, function () {
        o.curMyRound += 1;
        if (o.curMyRound >= o.myMoHandList.length) {
          o.showGirlAllHand();
          return void o.showSpineAnim(o.liujuAnim, "animation", false, function () {
            o.liujuAnim.active = false;
            r_BecomeGambleGodResult.BecomeGambleGodResult.showUI({
              myScore: o.myScore,
              girlScore: o.girlScore
            });
          });
        }
        o.isCanOpreation = true;
        o.addHandCard();
      });
      this.refreshOprationBtn(false);
    } else if ("pass" == t) {
      i = true;
      this.refreshOprationBtn(false);
    } else if ("mo" == t) {
      this.showMoBtnVisble(false);
      this.addHandCard();
    }
    i && (this.PlaseOutCard.active = true);
  };
  _ctor.prototype.registTouch = function () {
    if (!this.touchNode) {
      this.touchNode = new cc.Node();
      this.touchNode.width = 1668;
      this.touchNode.height = 1002;
      this.node.addChild(this.touchNode);
    }
    this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  };
  _ctor.prototype.unregistTouch = function () {
    this.touchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart);
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
    this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);
  };
  _ctor.prototype.showBtnTipState = function (e) {
    undefined === e && (e = true);
    this.btnTip.getChildByName("video").active = e;
    this.btnTip.getChildByName("noVideo").active = !e;
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    if (this.btnTip.getChildByName("video").active) {
      r_PlatformSystem.PlatformSystem.showVideo("成为雀神提示", function () {
        e.showBtnTipState(false);
        r_BecomeGambleGodHelp.BecomeGambleGodHelp.showUI({
          mode: e.curIndex - 1
        });
      });
    } else {
      this.showBtnTipState(false);
      r_BecomeGambleGodHelp.BecomeGambleGodHelp.showUI({
        mode: this.curIndex - 1
      });
    }
  };
  _ctor.prototype.onTouchStart = function (e) {
    var t = this;
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = {};
      var o = false;
      if (!this.isShowGirlHand1 && r_UtilsSystem.UtilsSystem.touchInNode(this.roleNode, this.touchStartPos)) {
        0 == this.curClick && r_TimeSystem.TimeSystem.scheduleOnce("caidan2Click", 1, function () {
          t.curClick = 0;
        });
        this.curClick += 1;
        if (this.curClick >= 5) {
          this.isShowGirlHand = true;
          this.isShowGirlHand1 = true;
          this.showGirlRoleAnim(this.roleNode, "step_3", false, function () {
            t.showGirlAllHand();
            t.showGirlRoleQiPao("哎呀，不小心碰倒了", "不小心碰倒了");
            t.showGirlRoleAnim(t.roleNode, "step_1", true);
          });
          r_TimeSystem.TimeSystem.scheduleOnce("resetGirlAllHand", 3, function () {
            t.resetGirlAllHand();
            t.isShowGirlHand = false;
          });
        }
      }
      if (0 == this.curOut && this.isCanOpreation) {
        for (var i = 0; i < this.myHandList.length; i++) {
          if (this.myHandList[i].state == r.hand && r_UtilsSystem.UtilsSystem.touchInNode(this.myHandList[i].node, this.touchStartPos)) {
            o = true;
            if (this.myHandList[i].select) {
              this.myHandList[i].node.active = false;
              this.myHandList[i].state = r.out;
              this.playerOutCard(this.myHandList[i].id);
              this.isCanOpreation = false;
              this.refreshOprationBtn(false);
              this.showArrawAnim(false);
            } else {
              this.resetOtherHandCardPos();
              this.myHandList[i].node.y += 20;
              this.myHandList[i].select = true;
            }
            break;
          }
        }
        o || this.resetOtherHandCardPos();
      }
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else if (this.moveInfo && this.moveInfo.node) {
      var t = e.getLocation().subtract(this.touchStartPos);
      var o = this.touchStartPos.add(t);
      var i = this.moveInfo.node.parent.convertToNodeSpaceAR(o);
      this.moveInfo.node.setPosition(i);
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    this.startID = null;
  };
  _ctor.prototype.onTouchCancel = function () {
    this.startID = null;
    this.moveInfo = null;
    this.moveInfo && this.moveInfo.node && this.moveInfo.node.setPosition(this.moveInfo.mirrorOriginPos);
  };
  _ctor.prototype.showMyAddScoreAnim = function (e) {
    var t = this;
    this.showMySocreLabel();
    var o;
    var i = this.lbMyAddSocre.getPosition();
    this.lbMyAddSocre.active = true;
    cc.Tween.stopAllByTarget(this.lbMyAddSocre);
    if (e > 0) {
      (o = cc.Color.BLACK).fromHEX(S[0]);
      this.lbMyAddSocre.color = o;
    } else {
      (o = cc.Color.BLACK).fromHEX(S[1]);
      this.lbMyAddSocre.color = o;
    }
    this.lbMyAddSocre.getComponent(cc.Label).string = e + "分";
    cc.tween(this.lbMyAddSocre).to(.5, {
      y: i.y + 50
    }).delay(1).call(function () {
      t.lbMyAddSocre.y = i.y;
      t.lbMyAddSocre.active = false;
    }).start();
  };
  _ctor.prototype.showMySocreLabel = function () {
    var e;
    this.lbMySocre.getComponent(cc.Label).string = this.myScore + "分";
    if (this.myScore < 0) {
      (e = cc.Color.BLACK).fromHEX(S[1]);
      this.lbMySocre.color = e;
    } else {
      (e = cc.Color.BLACK).fromHEX(S[0]);
      this.lbMySocre.color = e;
    }
  };
  _ctor.prototype.showGirlScoreAnim = function (e) {
    var t = this;
    this.showGirlSocreLabel();
    var o;
    var i = this.lbGilrAddSocre.getPosition();
    this.lbGilrAddSocre.active = true;
    cc.Tween.stopAllByTarget(this.lbGilrAddSocre);
    if (e > 0) {
      (o = cc.Color.BLACK).fromHEX(S[0]);
      this.lbGilrAddSocre.color = o;
    } else {
      (o = cc.Color.BLACK).fromHEX(S[1]);
      this.lbGilrAddSocre.color = o;
    }
    this.lbGilrAddSocre.getComponent(cc.Label).string = e + "分";
    cc.tween(this.lbGilrAddSocre).to(.5, {
      y: i.y + 50
    }).delay(1).call(function () {
      t.lbGilrAddSocre.y = i.y;
      t.lbGilrAddSocre.active = false;
    }).start();
  };
  _ctor.prototype.showGirlSocreLabel = function () {
    var e;
    this.lbGilrSocre.getComponent(cc.Label).string = this.girlScore + "分";
    if (this.girlScore < 0) {
      (e = cc.Color.BLACK).fromHEX(S[1]);
      this.lbGilrSocre.color = e;
    } else {
      (e = cc.Color.BLACK).fromHEX(S[0]);
      this.lbGilrSocre.color = e;
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "桌子节点"
  })], _ctor.prototype, "deskNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物"
  })], _ctor.prototype, "roleNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物气泡"
  })], _ctor.prototype, "roleQipao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物（男人）"
  })], _ctor.prototype, "roleMyNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物气泡（男人）"
  })], _ctor.prototype, "roleMyQipao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "女友分数"
  })], _ctor.prototype, "lbGilrSocre", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "女友加分提示"
  })], _ctor.prototype, "lbGilrAddSocre", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "我的分数"
  })], _ctor.prototype, "lbMySocre", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "我的加分提示"
  })], _ctor.prototype, "lbMyAddSocre", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "胡的分数"
  })], _ctor.prototype, "lbHuSocre", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "桌上剩余的牌"
  })], _ctor.prototype, "lbRemain", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "出牌提示"
  })], _ctor.prototype, "PlaseOutCard", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "杠动画"
  })], _ctor.prototype, "gangAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "胡动画"
  })], _ctor.prototype, "huAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "流局动画"
  })], _ctor.prototype, "liujuAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "手后动画"
  })], _ctor.prototype, "moShouAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "手前动画"
  })], _ctor.prototype, "moShouAnim1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "箭头动画"
  })], _ctor.prototype, "jianTouAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示按钮"
  })], _ctor.prototype, "btnTip", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "胡牌按钮"
  })], _ctor.prototype, "btnHu", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "杠按钮"
  })], _ctor.prototype, "btnGang", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "过按钮"
  })], _ctor.prototype, "btnPass", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "摸牌按钮"
  })], _ctor.prototype, "btnMo", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "玩家节点"
  })], _ctor.prototype, "playerNodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "自己手牌预制件"
  })], _ctor.prototype, "handPrefab", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "对家手牌预制件"
  })], _ctor.prototype, "otherHandPrefab", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "碰/杠手牌预制件"
  })], _ctor.prototype, "pengPrefab", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "出牌预制件（自己）"
  })], _ctor.prototype, "outCardPrefab", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "出牌预制件(对家)"
  })], _ctor.prototype, "outCard1Prefab", undefined);
  __decorate([_property({
    type: cc.SpriteAtlas,
    displayName: "麻将手牌图集"
  })], _ctor.prototype, "cardAtlas", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_BecomeGambleGodLogic;