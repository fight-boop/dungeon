import { Utils } from "../core/Utils";
import { TalentManager } from "./Talent";

enum EDataKey {
    loginTime = "0",
    AP = "1",
    DP = "2",
    HP = "3",
    MP = "4",
    EXP = "5",
    talent = "6",
}
export class PlayerData {
    loginTime: number = 0;
    //玩家属性
    ap: number = 5; //攻击力
    dp: number = 2; //防御力
    hp: number = 100; //生命值
    mp: number = 0; //魔法值
    exp: number = 0; //经验值

    talent: TalentManager = new TalentManager();
    getPackage() {
        let data = {};
        data[EDataKey.loginTime] = this.loginTime;
        data[EDataKey.AP] = this.ap;
        data[EDataKey.DP] = this.dp;
        data[EDataKey.HP] = this.hp;
        data[EDataKey.MP] = this.mp;
        data[EDataKey.EXP] = this.exp;
        data[EDataKey.talent] = this.talent.getPackage();
        return data;
    }

    setPackage(data: {}) {
        if (!data) {
            return;
        }

        this.loginTime = Utils.getSafeData(data[EDataKey.loginTime], 0);
        this.ap = Utils.getSafeData(data[EDataKey.AP], 5);
        this.dp = Utils.getSafeData(data[EDataKey.DP], 2);
        this.hp = Utils.getSafeData(data[EDataKey.HP], 100);
        this.mp = Utils.getSafeData(data[EDataKey.MP], 0);
        this.exp = Utils.getSafeData(data[EDataKey.EXP], 0);
        this.talent.setPackage(Utils.getSafeData<{}>(data[EDataKey.talent], {}));
    }
}


