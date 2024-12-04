Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LoadingUI = require("LoadingUI");
var r_MainUI = require("MainUI");
var r_GamingUI = require("GamingUI");
var r_EnergyUI = require("EnergyUI");
var r_SettingUI = require("SettingUI");
var r_ChatDetailUI = require("ChatDetailUI");
var r_ChatResultUI = require("ChatResultUI");
var r_ChatUI = require("ChatUI");
var r_BillUI = require("BillUI");
var r_LoanUI = require("LoanUI");
var r_PayUI = require("PayUI");
var r_PhoneMakeOldUI = require("PhoneMakeOldUI");
var r_SquareUI = require("SquareUI");
var r_FootballUI = require("FootballUI");
var r_LuckyTenUI = require("LuckyTenUI");
var r_JobUI = require("JobUI");
var r_StoneUI = require("StoneUI");
var r_StoneResultUI = require("StoneResultUI");
var r_StoneCutUI = require("StoneCutUI");
var r_StoneTipUI = require("StoneTipUI");
var r_JobAnswerUI = require("JobAnswerUI");
var r_JobFindUI = require("JobFindUI");
var r_JobTipUI = require("JobTipUI");
var r_JobResultUI = require("JobResultUI");
var r_GuideMsgUI = require("GuideMsgUI");
var r_GuideStartUI = require("GuideStartUI");
var r_RaceUI = require("RaceUI");
var r_RaceTipUI = require("RaceTipUI");
var r_FunUI = require("FunUI");
var r_RaceResultUI = require("RaceResultUI");
var r_FinanceUI = require("FinanceUI");
var r_FundBuyUI = require("FundBuyUI");
var r_FundUI = require("FundUI");
var r_StockBrokeUI = require("StockBrokeUI");
var r_RankAreaUI = require("RankAreaUI");
var r_RankDonateUI = require("RankDonateUI");
var r_RankPaperUI = require("RankPaperUI");
var r_RankRewardUI = require("RankRewardUI");
var r_CoinBillUI = require("CoinBillUI");
var r_PhoneUI = require("PhoneUI");
var r_MomoUI = require("MomoUI");
var r_MomoChatUI = require("MomoChatUI");
var r_MomoTipUI = require("MomoTipUI");
var r_MomoVipUI = require("MomoVipUI");
var r_StockBuyUI = require("StockBuyUI");
var r_StockResultUI = require("StockResultUI");
var r_StockSellUI = require("StockSellUI");
var r_StockTipUI = require("StockTipUI");
var r_StockUI = require("StockUI");
var r_DebugUI = require("DebugUI");
var r_CowUI = require("CowUI");
var r_NumBallResultUI = require("NumBallResultUI");
var r_MailRewardUI = require("MailRewardUI");
var r_MailBookUI = require("MailBookUI");
var r_MailUI = require("MailUI");
var r_RankUI = require("RankUI");
var r_MailTipUI = require("MailTipUI");
var r_StockMailUI = require("StockMailUI");
var r_RankTipUI = require("RankTipUI");
var r_ChatTransferUI = require("ChatTransferUI");
var r_EmgcUI = require("EmgcUI");
var r_AlmanacResultUI = require("AlmanacResultUI");
var r_AlmanacUI = require("AlmanacUI");
var r_ChatImageUI = require("ChatImageUI");
var r_SecretUI = require("SecretUI");
var r_SecretBuyUI = require("SecretBuyUI");
var r_VentureUI = require("VentureUI");
var r_SecretGetUI = require("SecretGetUI");
var r_SecretStoryUI = require("SecretStoryUI");
var r_FiledSelectUI = require("FiledSelectUI");
var r_FiledGameUI = require("FiledGameUI");
var r_FIeldTipUI = require("FIeldTipUI");
var r_SecretRemoveUI = require("SecretRemoveUI");
var r_FiledCoinUI = require("FiledCoinUI");
var r_MoveBrickUI = require("MoveBrickUI");
var r_GuideStoryUI = require("GuideStoryUI");
var r_BitGameUI = require("BitGameUI");
var r_BitResultUI = require("BitResultUI");
var r_BitTipUI = require("BitTipUI");
var r_VentureLoadingUI = require("VentureLoadingUI");
var r_SalvageSellUI = require("SalvageSellUI");
var r_SalvageUI = require("SalvageUI");
var r_SalvageTipUI = require("SalvageTipUI");
var r_SideGiftUI = require("SideGiftUI");
var r_SalvageResultUI = require("SalvageResultUI");
var r_BottleUI = require("BottleUI");
var r_BottleResultUI = require("BottleResultUI");
var r_PhoneMakeUI2 = require("PhoneMakeUI2");
var r_MailCompUI = require("MailCompUI");
var r_MailCompReward = require("MailCompReward");
var r_TigerGameUI = require("TigerGameUI");
var r_TigerRuleUI = require("TigerRuleUI");
var r_FruitsUI = require("FruitsUI");
var r_FruitsGameUI = require("FruitsGameUI");
var r_FruitsRsultUI = require("FruitsRsultUI");
var r_NiuniuUI = require("NiuniuUI");
var r_SubwayGameUI = require("SubwayGameUI");
var r_SubwayUI = require("SubwayUI");
var r_TigerCaidanUI = require("TigerCaidanUI");
var r_BigSmallUI = require("BigSmallUI");
var r_City85UI = require("City85UI");
var r_CityResultUI = require("CityResultUI");
var r_HouseUI = require("HouseUI");
var r_HomeBedUI = require("HomeBedUI");
var r_HouseMarketUI = require("HouseMarketUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_GameTipUI = require("GameTipUI");
var r_RelaxTipUI = require("RelaxTipUI");
var r_HouseOutUI = require("HouseOutUI");
var r_HouseLeaseUI = require("HouseLeaseUI");
var r_HomeWawaUI = require("HomeWawaUI");
var r_AlertUI = require("AlertUI");
var r_EntryUI = require("EntryUI");
var r_HomeResultUI = require("HomeResultUI");
var r_TanqiuUI = require("TanqiuUI");
var r_TanqiuSelectUI = require("TanqiuSelectUI");
var r_EmgcUI2 = require("EmgcUI2");
var r_SecretOffline = require("SecretOffline");
var r_YugongUI = require("YugongUI");
var r_GodWealthUI = require("GodWealthUI");
var r_GodWealthResultUI = require("GodWealthResultUI");
var r_BankUI = require("BankUI");
var r_BankTipUI = require("BankTipUI");
var r_BankResultUI = require("BankResultUI");
var r_BankDebugUI = require("BankDebugUI");
var r_GirlsFriendUI = require("GirlsFriendUI");
var r_PenaltyUI = require("PenaltyUI");
var r_EntrySecurityUI = require("EntrySecurityUI");
var r_BartenderUI = require("BartenderUI");
var r_ElemeUI = require("ElemeUI");
var r_BartenderResultUI = require("BartenderResultUI");
var r_MonopolyUI = require("MonopolyUI");
var r_BartenderJCUI = require("BartenderJCUI");
var r_BartenderTipUI = require("BartenderTipUI");
var r_LampUI = require("LampUI");
var r_MinGameUI = require("MinGameUI");
var r_LampNameUI = require("LampNameUI");
var r_LampResultUI = require("LampResultUI");
var r_PencilUI = require("PencilUI");
var r_BartenderCaidanUI = require("BartenderCaidanUI");
var r_MonopolyBankUI = require("MonopolyBankUI");
var r_MonopolyEmgcUI = require("MonopolyEmgcUI");
var r_MonopolyFreeUI = require("MonopolyFreeUI");
var r_MonopolyLuckyUI = require("MonopolyLuckyUI");
var r_BlowFeatherUI = require("BlowFeatherUI");
var r_SCResultUI = require("SCResultUI");
var r_SCClickShowUI = require("SCClickShowUI");
var r_ScrapingCarUI = require("ScrapingCarUI");
var r_PrinterUI = require("PrinterUI");
var r_LevelUpUI = require("LevelUpUI");
var r_PrintCardUI = require("PrintCardUI");
var r_NewCardUI = require("NewCardUI");
var r_BuyInkUI = require("BuyInkUI");
var r_CardGroupFinishUI = require("CardGroupFinishUI");
var r_SellCardGroupUI = require("SellCardGroupUI");
var r_PrintHelpUI = require("PrintHelpUI");
var r_FGCertificateUI = require("FGCertificateUI");
var r_FGResultUI = require("FGResultUI");
var r_FlirtingGirlUI = require("FlirtingGirlUI");
var r_CommerceUI = require("CommerceUI");
var r_CommerceResultUI = require("CommerceResultUI");
var r_WuGangUI = require("WuGangUI");
var r_FlirtingGirlCaidanUI = require("FlirtingGirlCaidanUI");
var r_MainHomeUI = require("MainHomeUI");
var r_PhoneMakeUI3 = require("PhoneMakeUI3");
var r_BattleLvelUI = require("BattleLvelUI");
var r_BattleUpUI = require("BattleUpUI");
var r_DrawCardUI = require("DrawCardUI");
var r_DrawSecretGetUI = require("DrawSecretGetUI");
var r_DrawUI = require("DrawUI");
var r_AutoTouchUI = require("AutoTouchUI");
var r_EarnUpUI = require("EarnUpUI");
var r_TouchNumUI = require("TouchNumUI");
var r_NewGuideChatUI = require("NewGuideChatUI");
var r_NewGuideGirlUI = require("NewGuideGirlUI");
var r_NewGuidePaperUI = require("NewGuidePaperUI");
var r_NewGuideResultUI = require("NewGuideResultUI");
var r_NewGuideTipUI = require("NewGuideTipUI");
var r_CutDoughUI = require("CutDoughUI");
var r_CutOverUI = require("CutOverUI");
var r_NoodlesUI = require("NoodlesUI");
var r_OpenDoughUI = require("OpenDoughUI");
var r_CityResultUI37 = require("CityResultUI37");
var r_TheSimsUI = require("TheSimsUI");
var r_TheSimsResultUI = require("TheSimsResultUI");
var r_GuessSongUI = require("GuessSongUI");
var r_GuessSongResultUI = require("GuessSongResultUI");
var r_FlyGodUI = require("FlyGodUI");
var r_OfflineUI = require("OfflineUI");
var r_CaidanUI = require("CaidanUI");
var r_EntryChooseUI = require("EntryChooseUI");
var r_EntryResultUI = require("EntryResultUI");
var r_SleepAppUI = require("SleepAppUI");
var r_ViewDreamUI = require("ViewDreamUI");
var r_PetCallUI = require("PetCallUI");
var r_PetCallAgainUI = require("PetCallAgainUI");
var r_PetInfoUI = require("PetInfoUI");
var r_PetShopUI = require("PetShopUI");
var r_PetWeaponUI = require("PetWeaponUI");
var r_PetUpgradeResultUI = require("PetUpgradeResultUI");
var r_PetUpgradeUI = require("PetUpgradeUI");
var r_PetBattleUI = require("PetBattleUI");
var r_PetBattleMatchUI = require("PetBattleMatchUI");
var r_PetBattleRule = require("PetBattleRule");
var r_PetBattleResultUI = require("PetBattleResultUI");
var r_PetBossUI = require("PetBossUI");
var r_PetLevelUpUI = require("PetLevelUpUI");
var r_PetMatchInfoUI = require("PetMatchInfoUI");
var r_PetBuyVitalityUI = require("PetBuyVitalityUI");
var r_PetRankUI = require("PetRankUI");
var r_CatchDogUI = require("CatchDogUI");
var r_CatchDogResultUI = require("CatchDogResultUI");
var r_BridePriceTipUI = require("BridePriceTipUI");
var r_BridePriceUI = require("BridePriceUI");
var r_DogSchemeUI = require("DogSchemeUI");
var r_TrainUI = require("TrainUI");
var r_WeddingUI = require("WeddingUI");
var r_WeddingResultUI = require("WeddingResultUI");
var r_ComputerUI = require("ComputerUI");
var r_ComputerTimeUI = require("ComputerTimeUI");
var r_ComputerResultUI = require("ComputerResultUI");
var r_DeskUI = require("DeskUI");
var r_ShopGameUI = require("ShopGameUI");
var r_ShopRuleUI = require("ShopRuleUI");
var r_ShopTipUI = require("ShopTipUI");
var r_ShopResultUI = require("ShopResultUI");
var r_ShopBillUI = require("ShopBillUI");
var r_ShopCaidanUI = require("ShopCaidanUI");
var r_StoneNewUI = require("StoneNewUI");
var r_StoneNewTipUI = require("StoneNewTipUI");
var r_StoneNewCutUI = require("StoneNewCutUI");
var r_StoneNewResultUI = require("StoneNewResultUI");
var r_StoneNewDogzUI = require("StoneNewDogzUI");
var r_StoneNewCaidanUI = require("StoneNewCaidanUI");
var r_StoneNewDebugUI = require("StoneNewDebugUI");
var r_LoadWaitUI = require("LoadWaitUI");
var r_BuyStoneUI = require("BuyStoneUI");
var r_FairyEventChooseUI = require("FairyEventChooseUI");
var r_FairyEventGiftUI = require("FairyEventGiftUI");
var r_FairyLandAdviceUI = require("FairyLandAdviceUI");
var r_FairyLandDrawCardUI = require("FairyLandDrawCardUI");
var r_FairyLandDrawResultUI = require("FairyLandDrawResultUI");
var r_FairyLandDrawUI = require("FairyLandDrawUI");
var r_FairyLandShopUI = require("FairyLandShopUI");
var r_FairyLandTgUI = require("FairyLandTgUI");
var r_FairyLandUI = require("FairyLandUI");
var r_FairyLandWashUI = require("FairyLandWashUI");
var r_FairyShopPetBkUI = require("FairyShopPetBkUI");
var r_FairyShopPetUI = require("FairyShopPetUI");
var r_FairyTreeThingUI = require("FairyTreeThingUI");
var r_FairyTreeUI = require("FairyTreeUI");
var r_PopFruitUI = require("PopFruitUI");
var r_WeaponStrongUI = require("WeaponStrongUI");
var r_WpForgeResUI = require("WpForgeResUI");
var r_WpForgeUI = require("WpForgeUI");
var r_WpInfoUI = require("WpInfoUI");
var r_WpRecFactUI = require("WpRecFactUI");
var r_WpRecWayUI = require("WpRecWayUI");
var r_WeaponRankUI = require("WeaponRankUI");
var r_Tip2StateUI = require("Tip2StateUI");
var r_TowerBookUI = require("TowerBookUI");
var r_TowerBossUI = require("TowerBossUI");
var r_TowerFightUI = require("TowerFightUI");
var r_TowerResultUI = require("TowerResultUI");
var r_TowerUI = require("TowerUI");
var r_TowerWaitUI = require("TowerWaitUI");
var r_StoneVideoUI = require("StoneVideoUI");
var r_CommonTipUI = require("CommonTipUI");
var r_CommonTipUI2 = require("CommonTipUI2");
var r_CommonEnterUI = require("CommonEnterUI");
var r_CommonWordAdUI = require("CommonWordAdUI");
var r_Tip2BtnUI = require("Tip2BtnUI");
var r_Tip2BtnAdUI = require("Tip2BtnAdUI");
var r_SecretUpUI = require("SecretUpUI");
var r_SecretCodexUI = require("SecretCodexUI");
var r_SecretUpGetUI = require("SecretUpGetUI");
var r_SecretUpDebugUI = require("SecretUpDebugUI");
var r_EscapeRoomUI = require("EscapeRoomUI");
var r_EscapeRoomResultUI = require("EscapeRoomResultUI");
var r_EscapeRoomTipUI = require("EscapeRoomTipUI");
var r_PetBuyPropUI = require("PetBuyPropUI");
var r_PetCardUI = require("PetCardUI");
var r_PetCardOpenUI = require("PetCardOpenUI");
var r_PetNewWeaponUI = require("PetNewWeaponUI");
var r_PetTierRewardUI = require("PetTierRewardUI");
var r_PetStoryUI = require("PetStoryUI");
var r_ChineseChessUI = require("ChineseChessUI");
var r_MedusaUI = require("MedusaUI");
var r_MedusaResultUI = require("MedusaResultUI");
var r_HomeWayUI = require("HomeWayUI");
var r_TaskUI = require("TaskUI");
var r_NewHomeWayChatUI = require("NewHomeWayChatUI");
var r_HomeWayRewardTipUI = require("HomeWayRewardTipUI");
var r_ChessRuleUI = require("ChessRuleUI");
var r_ChessResultUI = require("ChessResultUI");
var r_RebuildHomeUI = require("RebuildHomeUI");
var r_RebuideResUI = require("RebuideResUI");
var r_ElevenTickUI = require("ElevenTickUI");
var r_ShareUI = require("ShareUI");
var r_BanquetUI = require("BanquetUI");
var r_EatBanquetUI = require("EatBanquetUI");
var r_BanquetEnterUI = require("BanquetEnterUI");
var r_BanquetDownUI = require("BanquetDownUI");
var r_BanquetEndUI = require("BanquetEndUI");
var r_HelpGrandUI = require("HelpGrandUI");
var r_HelpGrandResultUI = require("HelpGrandResultUI");
var r_TextTipUI = require("TextTipUI");
var r_VerifyUI = require("VerifyUI");
var r_BanquetEgg = require("BanquetEgg");
var r_TakeTrashUI = require("TakeTrashUI");
var r_TakeTrashResultUI = require("TakeTrashResultUI");
var r_EmoManUI = require("EmoManUI");
var r_MainAuditUI = require("MainAuditUI");
var r_TakeTrashDebug = require("TakeTrashDebug");
var r_BathResultUI = require("BathResultUI");
var r_BathUI = require("BathUI");
var r_EntryCityUI = require("EntryCityUI");
var r_JumpFishUI = require("JumpFishUI");
var r_DragonUI = require("DragonUI");
var r_JumpFishFailUI = require("JumpFishFailUI");
var r_HostessUI2 = require("HostessUI2");
var r_BathGameUI = require("BathGameUI");
var r_BattleResultUI = require("BattleResultUI");
var r_BattleDebugUI = require("BattleDebugUI");
var r_ShenronUI = require("ShenronUI");
var r_MiniGamingUI = require("MiniGamingUI");
var r_PotatoUI = require("PotatoUI");
var r_PotatoResultUI = require("PotatoResultUI");
var r_PotatoEntryUI = require("PotatoEntryUI");
var r_LuckBagUI = require("LuckBagUI");
var r_LuckBagOpenUI = require("LuckBagOpenUI");
var r_LuckBagResultUI = require("LuckBagResultUI");
var r_LuckBagGetRewardUI = require("LuckBagGetRewardUI");
var r_LuckBagCollectUI = require("LuckBagCollectUI");
var r_WoodenPeopleUI = require("WoodenPeopleUI");
var r_WoodenPeopleResultUI = require("WoodenPeopleResultUI");
var r_CaishenUI = require("CaishenUI");
var r_PokonyanUI = require("PokonyanUI");
var r_PokonyanDebugUI = require("PokonyanDebugUI");
var r_AetherUI = require("AetherUI");
var r_AetherTipUI = require("AetherTipUI");
var r_AetherResultUI = require("AetherResultUI");
var r_CatchFishUI = require("CatchFishUI");
var r_CatchUI = require("CatchUI");
var r_DialogueUI = require("DialogueUI");
var r_GoodsShopBuyUI = require("GoodsShopBuyUI");
var r_BagGoodsUI = require("BagGoodsUI");
var r_GoodsSellUI = require("GoodsSellUI");
var r_ShopTurntableUI = require("ShopTurntableUI");
var r_NewScene = require("NewScene");
var r_OldScene = require("OldScene");
var r_VillageScene = require("VillageScene");
var r_ShopGetTurnRewardUI = require("ShopGetTurnRewardUI");
var r_OpenDriftBottleUI = require("OpenDriftBottleUI");
var r_DriftBottleTipUI = require("DriftBottleTipUI");
var r_FarmUI = require("FarmUI");
var r_HarvestUI = require("HarvestUI");
var r_DailyUI = require("DailyUI");
var r_OpenCardUI = require("OpenCardUI");
var r_HelpUI = require("HelpUI");
var r_CollectUI = require("CollectUI");
var r_GoodsShopUI = require("GoodsShopUI");
var r_ShopUI = require("ShopUI");
var r_VillageBuyUI = require("VillageBuyUI");
var r_MarketUI = require("MarketUI");
var r_MagicBoardUI = require("MagicBoardUI");
var r_MagicBoardTipUI = require("MagicBoardTipUI");
var r_MagicBoardEndUI = require("MagicBoardEndUI");
var r_OpenBoxUI = require("OpenBoxUI");
var r_YesOrNoUI = require("YesOrNoUI");
var r_GoldMineUI = require("GoldMineUI");
var r_GoldResultUI = require("GoldResultUI");
var r_ZhazhaHuiUI = require("ZhazhaHuiUI");
var r_PetCommon = require("PetCommon");
var r_CountMoneyUI = require("CountMoneyUI");
var r_BackWorkUI = require("BackWorkUI");
var r_EatTangYuanUI = require("EatTangYuanUI");
var r_BecomeGambleGodUI = require("BecomeGambleGodUI");
var r_NianMonsterUI = require("NianMonsterUI");
var r_GameGuide3ChatUI = require("GameGuide3ChatUI");
var r_GameGuideStory2UI = require("GameGuideStory2UI");
var r_GameGuideChatUI = require("GameGuideChatUI");
var r_GameGuide2ChatUI = require("GameGuide2ChatUI");
var r_GameGuideStory4UI = require("GameGuideStory4UI");
var r_GameGuideStory3UI = require("GameGuideStory3UI");
var r_OnlineGiftUI = require("OnlineGiftUI");
var r_GameGuideStory5UI = require("GameGuideStory5UI");
var r_FairyLandGuide = require("FairyLandGuide");
var r_GetItemComUI = require("GetItemComUI");
var r_SignIn2UI = require("SignIn2UI");
var r_SignGetUI = require("SignGetUI");
var r_WangPoUI = require("WangPoUI");
var r_RocketToSkyUI = require("RocketToSkyUI");
var r_DrawAndGuessUI = require("DrawAndGuessUI");
var r_HamUI = require("HamUI");
var r_DissUI = require("DissUI");
var r_PhoneCarUI = require("PhoneCarUI");
var r_ErShouCarUI = require("ErShouCarUI");
var def_Config = function () {
  function _ctor() {}
  _ctor.init = function () {
    this.isDebug = false;
  };
  _ctor.gameVersion = "1.0.0";
  _ctor.gameId = 1173;
  _ctor.modalLayerColor = new cc.Color(0, 0, 0, 204);
  _ctor.httpsAdress = "https://wxxcx.tanyu.mobi:4443/admin/api/";
  _ctor.uiClass = [r_LoadingUI.LoadingUI, r_MainUI.MainUI, r_MainHomeUI.default, r_GamingUI.GamingUI, r_EnergyUI.EnergyUI, r_SettingUI.SettingUI, r_ChatDetailUI.ChatDetailUI, r_ChatResultUI.ChatResultUI, r_ChatUI.ChatUI, r_BillUI.BillUI, r_PayUI.PayUI, r_LoanUI.LoanUI, r_GetItemComUI.GetItemComUI, r_SideGiftUI.SideGiftUI, r_SignGetUI.SignGetUI, r_SignIn2UI.SignIn2UI, r_PhoneMakeOldUI.PhoneMakeOldUI, r_SquareUI.SquareUI, r_FootballUI.FootballUI, r_LuckyTenUI.LuckyTenUI, r_JobUI.JobUI, r_StoneUI.StoneUI, r_StoneResultUI.StoneResultUI, r_StoneCutUI.StoneCutUI, r_StoneTipUI.StoneTipUI, r_JobAnswerUI.JobAnswerUI, r_JobFindUI.JobFindUI, r_JobTipUI.JobTipUI, r_JobResultUI.JobResultUI, r_GuideMsgUI.GuideMsgUI, r_GuideStartUI.GuideStartUI, r_GuideStoryUI.GuideStoryUI, r_FunUI.FunUI, r_RaceUI.RaceUI, r_RaceResultUI.RaceResultUI, r_StockUI.StockUI, r_FinanceUI.FinanceUI, r_FundBuyUI.FundBuyUI, r_FundUI.FundUI, r_StockBuyUI.StockBuyUI, r_StockResultUI.StockResultUI, r_StockSellUI.StockSellUI, r_StockTipUI.StockTipUI, r_StockBrokeUI.StockBrokeUI, r_RankAreaUI.RankAreaUI, r_RankDonateUI.RankDonateUI, r_RankPaperUI.RankPaperUI, r_RankRewardUI.RankRewardUI, r_PhoneUI.PhoneUI, r_HomeWayUI.HomeWayUI, r_ElemeUI.ElemeUI, r_CoinBillUI.CoinBillUI, r_MomoUI.MomoUI, r_MomoVipUI.MomoVipUI, r_MomoChatUI.MomoChatUI, r_MomoTipUI.MomoTipUI, r_DebugUI.DebugUI, r_CowUI.CowUI, r_PencilUI.PencilUI, r_RaceTipUI.RaceTipUI, r_NumBallResultUI.NumBallResultUI, r_YugongUI.default, r_MailUI.MailUI, r_MailRewardUI.MailRewardUI, r_MailBookUI.MailBookUI, r_MailCompUI.MailCompUI, r_MailCompReward.MailCompReward, r_RankUI.RankUI, r_MailTipUI.MailTipUI, r_StockMailUI.StockMailUI, r_RankTipUI.RankTipUI, r_ChatTransferUI.ChatTransferUI, r_EmgcUI.EmgcUI, r_AlmanacUI.AlmanacUI, r_AlmanacResultUI.AlmanacResultUI, r_ChatImageUI.ChatImageUI, r_DrawSecretGetUI.DrawSecretGetUI, r_SecretUI.SecretUI, r_SecretBuyUI.SecretBuyUI, r_VentureUI.VentureUI, r_VentureLoadingUI.VentureLoadingUI, r_SecretGetUI.SecretGetUI, r_SecretStoryUI.SecretStoryUI, r_FiledSelectUI.FiledSelectUI, r_FiledGameUI.FiledGameUI, r_FIeldTipUI.FIeldTipUI, r_FiledCoinUI.FiledCoinUI, r_SecretRemoveUI.SecretRemoveUI, r_PetBattleMatchUI.PetBattleMatchUI, r_PetBattleResultUI.PetBattleResultUI, r_PetBattleRule.PetBattleRule, r_PetBattleUI.PetBattleUI, r_PetBossUI.PetBossUI, r_PetBuyVitalityUI.PetBuyVitalityUI, r_PetBuyPropUI.PetBuyPropUI, r_PetStoryUI.PetStoryUI, r_PetCardUI.PetCardUI, r_PetCardOpenUI.PetCardOpenUI, r_PetNewWeaponUI.PetNewWeaponUI, r_PetTierRewardUI.PetTierRewardUI, r_PetCallAgainUI.PetCallAgainUI, r_PetCallUI.PetCallUI, r_PetInfoUI.PetInfoUI, r_PetLevelUpUI.PetLevelUpUI, r_PetMatchInfoUI.PetMatchInfoUI, r_PetRankUI.PetRankUI, r_PetShopUI.PetShopUI, r_PetUpgradeResultUI.PetUpgradeResultUI, r_PetUpgradeUI.PetUpgradeUI, r_PetWeaponUI.PetWeaponUI, r_MoveBrickUI.MoveBrickUI, r_OnlineGiftUI.default, r_BitGameUI.BitGameUI, r_BitResultUI.BitResultUI, r_BitTipUI.BitTipUI, r_BitGameUI.BitGameUI, r_BitResultUI.BitResultUI, r_BitTipUI.BitTipUI, r_SalvageSellUI.SalvageSellUI, r_SalvageUI.SalvageUI, r_SalvageTipUI.SalvageTipUI, r_SalvageResultUI.SalvageResultUI, r_BottleUI.default, r_BottleResultUI.default, r_PhoneMakeUI2.PhoneMakeUI2, r_PhoneMakeUI3.PhoneMakeUI3, r_TigerGameUI.default, r_TigerRuleUI.default, r_TigerCaidanUI.default, r_FruitsUI.FruitsUI, r_FruitsGameUI.FruitsGameUI, r_FruitsRsultUI.default, r_NiuniuUI.default, r_BigSmallUI.default, r_GirlsFriendUI.default, r_SubwayUI.SubwayUI, r_SubwayGameUI.SubwayGameUI, r_City85UI.default, r_RelaxTipUI.default, r_CityResultUI.default, r_CityResultUI37.default, r_HouseUI.default, r_HomeBedUI.default, r_HouseMarketUI.default, r_HouseOutUI.default, r_HouseLeaseUI.default, r_ViewTipsUI.ViewTipsUI, r_GameTipUI.GameTipUI, r_HomeWawaUI.default, r_AlertUI.AlertUI, r_EntryUI.default, r_HomeResultUI.default, r_TanqiuUI.default, r_TanqiuSelectUI.default, r_EmgcUI2.EmgcUI2, r_SecretOffline.SecretOffline, r_GodWealthUI.default, r_GodWealthResultUI.default, r_BankUI.BankUI, r_BankTipUI.BankTipUI, r_BankResultUI.BankResultUI, r_BankDebugUI.BankDebugUI, r_PenaltyUI.PenaltyUI, r_EntrySecurityUI.default, r_BartenderUI.default, r_BartenderResultUI.default, r_BartenderJCUI.default, r_BartenderTipUI.default, r_BartenderCaidanUI.default, r_MonopolyUI.default, r_MonopolyBankUI.default, r_MonopolyEmgcUI.default, r_MonopolyFreeUI.default, r_MonopolyLuckyUI.default, r_LampUI.LampUI, r_MinGameUI.MinGameUI, r_LampNameUI.LampNameUI, r_LampResultUI.LampResultUI, r_BlowFeatherUI.BlowFeatherUI, r_ScrapingCarUI.ScrapingCarUI, r_SCResultUI.SCResultUI, r_SCClickShowUI.SCClickShowUI, r_EarnUpUI.default, r_AutoTouchUI.default, r_TouchNumUI.default, r_TheSimsUI.TheSimsUI, r_TheSimsResultUI.TheSimsResultUI, r_GuessSongUI.GuessSongUI, r_GuessSongResultUI.GuessSongResultUI, r_SleepAppUI.SleepAppUI, r_ViewDreamUI.ViewDreamUI, r_NoodlesUI.NoodlesUI, r_OpenDoughUI.OpenDoughUI, r_CutDoughUI.CutDoughUI, r_CutOverUI.CutOverUI, r_PrinterUI.PrinterUI, r_LevelUpUI.LevelUpUI, r_CardGroupFinishUI.CardGroupFinishUI, r_SellCardGroupUI.SellCardGroupUI, r_PrintHelpUI.PrintHelpUI, r_PrintCardUI.PrintCardUI, r_NewCardUI.NewCardUI, r_BuyInkUI.BuyInkUI, r_FlirtingGirlUI.default, r_FGResultUI.FGResultUI, r_FGCertificateUI.FGCertificateUI, r_BattleUpUI.default, r_BattleLvelUI.default, r_FlirtingGirlCaidanUI.default, r_CommerceUI.default, r_CommerceResultUI.default, r_WuGangUI.default, r_NewGuideChatUI.default, r_NewHomeWayChatUI.default, r_HomeWayRewardTipUI.default, r_NewGuideTipUI.default, r_NewGuideGirlUI.default, r_NewGuidePaperUI.default, r_NewGuideResultUI.default, r_DrawUI.DrawUI, r_DrawCardUI.DrawCardUI, r_FlyGodUI.default, r_OfflineUI.default, r_CaidanUI.default, r_EntryChooseUI.default, r_EntryResultUI.default, r_CatchDogUI.default, r_CatchDogResultUI.default, r_BridePriceUI.default, r_DogSchemeUI.default, r_BridePriceTipUI.default, r_RebuildHomeUI.RebuildHomeUI, r_TrainUI.default, r_WeddingUI.default, r_WeddingResultUI.default, r_ComputerUI.default, r_ComputerTimeUI.default, r_ComputerResultUI.default, r_DeskUI.default, r_ShopGameUI.default, r_ShopRuleUI.default, r_ShopTipUI.default, r_ShopResultUI.default, r_ShopBillUI.default, r_ShopCaidanUI.default, r_StoneNewUI.default, r_StoneNewTipUI.StoneNewTipUI, r_StoneNewCutUI.StoneNewCutUI, r_StoneNewResultUI.default, r_StoneNewDogzUI.default, r_StoneNewCaidanUI.default, r_StoneNewDebugUI.default, r_LoadWaitUI.LoadWaitUI, r_BuyStoneUI.BuyStoneUI, r_FairyLandGuide.FairyLandGuide, r_FairyEventChooseUI.FairyEventChooseUI, r_FairyEventGiftUI.FairyEventGiftUI, r_FairyLandAdviceUI.FairyLandAdviceUI, r_FairyLandDrawCardUI.FairyLandDrawCardUI, r_FairyLandDrawResultUI.FairyLandDrawResultUI, r_FairyLandDrawUI.FairyLandDrawUI, r_FairyLandShopUI.FairyLandShopUI, r_FairyLandTgUI.FairyLandTgUI, r_FairyLandUI.FairyLandUI, r_FairyLandWashUI.FairyLandWashUI, r_FairyShopPetBkUI.FairyShopPetBkUI, r_FairyShopPetUI.FairyShopPetUI, r_FairyTreeThingUI.FairyTreeThingUI, r_FairyTreeUI.FairyTreeUI, r_PopFruitUI.PopFruitUI, r_WeaponStrongUI.WeaponStrongUI, r_WpForgeResUI.WpForgeResUI, r_WpForgeUI.WpForgeUI, r_WpInfoUI.WpInfoUI, r_WpRecFactUI.WpRecFactUI, r_WpRecWayUI.WpRecWayUI, r_WeaponRankUI.WeaponRankUI, r_Tip2StateUI.Tip2StateUI, r_TowerBookUI.TowerBookUI, r_TowerBossUI.TowerBossUI, r_TowerFightUI.TowerFightUI, r_TowerResultUI.TowerResultUI, r_TowerUI.TowerUI, r_TowerWaitUI.TowerWaitUI, r_StoneVideoUI.StoneVideoUI, r_CommonTipUI.CommonTipUI, r_CommonTipUI2.CommonTipUI2, r_CommonEnterUI.CommonEnterUI, r_CommonWordAdUI.CommonWordAdUI, r_Tip2BtnUI.Tip2BtnUI, r_Tip2BtnAdUI.Tip2BtnAdUI, r_SecretUpUI.SecretUpUI, r_SecretCodexUI.default, r_SecretUpGetUI.default, r_SecretUpDebugUI.default, r_EscapeRoomUI.default, r_EscapeRoomResultUI.default, r_EscapeRoomTipUI.default, r_ChineseChessUI.ChineseChessUI, r_ChessRuleUI.ChessRuleUI, r_ChessResultUI.ChessResultUI, r_MedusaUI.default, r_MedusaResultUI.default, r_RebuideResUI.RebuideResUI, r_TaskUI.default, r_ElevenTickUI.default, r_BanquetUI.BanquetUI, r_EatBanquetUI.EatBanquetUI, r_BanquetEnterUI.BanquetEnterUI, r_BanquetDownUI.BanquetDownUI, r_BanquetEndUI.BanquetEndUI, r_BanquetEgg.BanquetEgg, r_ShareUI.default, r_VerifyUI.VerifyUI, r_TakeTrashUI.default, r_TakeTrashResultUI.default, r_EmoManUI.EmoManUI, r_MainAuditUI.default, r_TakeTrashDebug.default, r_BathResultUI.default, r_BathUI.default, r_EntryCityUI.default, r_JumpFishUI.JumpFishUI, r_JumpFishFailUI.JumpFishFailUI, r_DragonUI.DragonUI, r_HostessUI2.HostessUI2, r_BathGameUI.default, r_BattleResultUI.default, r_BattleDebugUI.default, r_ShenronUI.default, r_MiniGamingUI.MiniGamingUI, r_PotatoUI.default, r_PotatoResultUI.default, r_PotatoEntryUI.default, r_LuckBagUI.default, r_LuckBagOpenUI.LuckBagOpenUI, r_LuckBagResultUI.default, r_LuckBagGetRewardUI.default, r_LuckBagCollectUI.default, r_WoodenPeopleUI.WoodenPeopleUI, r_WoodenPeopleResultUI.default, r_CaishenUI.default, r_PokonyanUI.default, r_PokonyanDebugUI.default, r_AetherUI.default, r_AetherTipUI.AetherTipUI, r_AetherResultUI.AetherResultUI, r_CatchFishUI.CatchFishUI, r_CatchUI.CatchUI, r_DialogueUI.DialogueUI, r_GoodsShopBuyUI.GoodsShopBuyUI, r_BagGoodsUI.BagGoodsUI, r_GoodsShopUI.GoodsShopUI, r_GoodsSellUI.GoodsSellUI, r_VillageBuyUI.VillageBuyUI, r_ShopTurntableUI.ShopTurntableUI, r_ShopGetTurnRewardUI.ShopGetTurnRewardUI, r_OpenDriftBottleUI.OpenDriftBottleUI, r_DriftBottleTipUI.DriftBottleTipUI, r_FarmUI.FarmUI, r_HarvestUI.HarvestUI, r_CollectUI.CollectUI, r_DailyUI.DailyUI, r_HelpUI.HelpUI, r_ShopUI.ShopUI, r_OpenCardUI.OpenCardUI, r_HelpGrandResultUI.HelpGrandResultUI, r_HelpGrandUI.HelpGrandUI, r_TextTipUI.TextTipUI, r_MarketUI.MarketUI, r_MagicBoardUI.MagicBoardUI, r_MagicBoardTipUI.MagicBoardTipUI, r_MagicBoardEndUI.MagicBoardEndUI, r_OpenBoxUI.OpenBoxUI, r_GoldMineUI.GoldMineUI, r_GoldResultUI.GoldResultUI];
  _ctor.uiClassMap = {
    HomeWayUI: r_HomeWayUI.HomeWayUI,
    MiniGamingUI: r_MiniGamingUI.MiniGamingUI,
    HostessUI2: r_HostessUI2.HostessUI2,
    HelpGrandUI: r_HelpGrandUI.HelpGrandUI,
    EscapeRoomUI: r_EscapeRoomUI.default,
    EmoManUI: r_EmoManUI.EmoManUI,
    RebuildHomeUI: r_RebuildHomeUI.RebuildHomeUI,
    MedusaUI: r_MedusaUI.default,
    TheSimsUI: r_TheSimsUI.TheSimsUI,
    LampNameUI: r_LampNameUI.LampNameUI,
    GuessSongUI: r_GuessSongUI.GuessSongUI,
    ComputerUI: r_ComputerUI.default,
    NoodlesUI: r_NoodlesUI.NoodlesUI,
    MainUI: r_MainUI.MainUI,
    MainHomeUI: r_MainHomeUI.default,
    NewScene: r_NewScene.NewScene,
    OldScene: r_OldScene.OldScene,
    VillageScene: r_VillageScene.VillageScene,
    YesOrNoUI: r_YesOrNoUI.YesOrNoUI,
    ZhazhaHuiUI: r_ZhazhaHuiUI.default,
    ChatUI: r_ChatUI.ChatUI,
    MomoUI: r_MomoUI.MomoUI,
    CoinBillUI: r_CoinBillUI.CoinBillUI,
    ChatDetailUI: r_ChatDetailUI.ChatDetailUI,
    PetCommon: r_PetCommon.PetCommon,
    ElemeUI: r_ElemeUI.ElemeUI,
    MonopolyUI: r_MonopolyUI.default,
    SleepAppUI: r_SleepAppUI.SleepAppUI,
    PrinterUI: r_PrinterUI.PrinterUI,
    GodWealthUI: r_GodWealthUI.default,
    WoodenPeopleUI: r_WoodenPeopleUI.WoodenPeopleUI,
    BartenderUI: r_BartenderUI.default,
    CommerceUI: r_CommerceUI.default,
    ShopGameUI: r_ShopGameUI.default,
    JobAnswerUI: r_JobAnswerUI.JobAnswerUI,
    JobFindUI: r_JobFindUI.JobFindUI,
    CountMoneyUI: r_CountMoneyUI.CountMoneyUI,
    PhoneCarUI: r_PhoneCarUI.PhoneCarUI,
    ErShouCarUI: r_ErShouCarUI.ErShouCarUI,
    PencilUI: r_PencilUI.PencilUI,
    YugongUI: r_YugongUI.default,
    GirlsFriendUI: r_GirlsFriendUI.default,
    FootballUI: r_FootballUI.FootballUI,
    ElevenTickUI: r_ElevenTickUI.default,
    ShenronUI: r_ShenronUI.default,
    BigSmallUI: r_BigSmallUI.default,
    CaishenUI: r_CaishenUI.default,
    BackWorkUI: r_BackWorkUI.BackWorkUI,
    EatTangYuanUI: r_EatTangYuanUI.EatTangYuanUI,
    BecomeGambleGodUI: r_BecomeGambleGodUI.BecomeGambleGodUI,
    NianMonsterUI: r_NianMonsterUI.default,
    GameGuideChatUI: r_GameGuideChatUI.default,
    GameGuide2ChatUI: r_GameGuide2ChatUI.default,
    GameGuide3ChatUI: r_GameGuide3ChatUI.default,
    GameGuideStory2UI: r_GameGuideStory2UI.default,
    GameGuideStory3UI: r_GameGuideStory3UI.default,
    GameGuideStory4UI: r_GameGuideStory4UI.default,
    GameGuideStory5UI: r_GameGuideStory5UI.default,
    WangPoUI: r_WangPoUI.default,
    RocketToSkyUI: r_RocketToSkyUI.default,
    DrawAndGuessUI: r_DrawAndGuessUI.DrawAndGuessUI,
    HamUI: r_HamUI.default,
    HouseUI: r_HouseUI.default,
    DissUI: r_DissUI.default,
    ScrapingCarUI: r_ScrapingCarUI.ScrapingCarUI
  };
  _ctor.uiExtensions = [];
  _ctor.gameModel = [];
  _ctor.tableModel = [];
  _ctor.firstNeedLoadRes = [];
  _ctor.isDebug = true;
  _ctor.needVerify = true;
  _ctor.verifyCode = "6789";
  return _ctor;
}();
exports.default = def_Config;