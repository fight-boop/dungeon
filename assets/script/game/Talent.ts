import { utils } from "cc";
import { Utils } from "../core/Utils";
import { Core } from "../core/Core";
import { EGameEvent } from "../core/Config";

export enum ETalentType {
    POWER = 'power',
    DEFENSE = 'defense',
}
export class ETalentValue {
    name: string;
    description: string;
}

const TalentData = {
    [ETalentType.POWER]: { name: 'Power Talent', description: 'Increases attack power.' },
    [ETalentType.DEFENSE]: { name: 'Defense Talent', description: 'Increases defense power.' },
}

export class Talent {
    id: ETalentType;
    level: number;
    maxLevel: number = 10; // Maximum level for talents
    constructor(id: ETalentType, level: number) {
        this.id = id;
        this.level = level;
    }

    getData(): ETalentValue {
        return TalentData[this.id];
    }

    upgrade() {
        if (this.level >= this.maxLevel) {
            console.warn(`Talent ${this.id} is already at maximum level.`);
            return;
        }
        let cost = this.level * 100;
        if (Core.instance.playerData.gold < cost) {
            console.warn(`Not enough gold to upgrade talent ${this.id}. Required: ${cost},
    Current: ${Core.instance.playerData.gold}`);
            return;
        }
        Core.instance.playerData.gold -= cost;
        this.level++;
        Core.instance.event.emit(EGameEvent.GAME_SAVE);
    }
}

export class TalentManager {
    public talentList: Record<number, Talent> = {};
    constructor() {
        this.talentList[ETalentType.DEFENSE] = new Talent(ETalentType.DEFENSE, 1);
        this.talentList[ETalentType.POWER] = new Talent(ETalentType.POWER, 1);
    }



    public getPackage(): Record<number, { id: ETalentType, level: number }> {
        let data = {};
        data[ETalentType.POWER] = this.talentList[ETalentType.POWER].level;
        data[ETalentType.DEFENSE] = this.talentList[ETalentType.DEFENSE].level;
        return data;
    }

    setPackage(data: {}) {
        this.talentList[ETalentType.DEFENSE].level = Utils.getSafeData(data[ETalentType.DEFENSE], 0);
        this.talentList[ETalentType.POWER].level = Utils.getSafeData(data[ETalentType.POWER], 0);
    }
}