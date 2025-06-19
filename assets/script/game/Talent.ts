import { utils } from "cc";
import { Utils } from "../core/Utils";

export enum ETalentType {
    POWER = 'power',
    DEFENSE = 'defense',
}
export class ETalentValue {
    name: string;
    description: string;
}

export class TalentData {
    [ETalentType.POWER]: ETalentValue = { name: 'Power Talent', description: 'Increases attack power.' };
    [ETalentType.DEFENSE]: ETalentValue = { name: 'Defense Talent', description: 'Increases defense power.' };
}

export class Talent {
    id: ETalentType;
    level: number;
    constructor(id: ETalentType, level: number) {
        this.id = id;
        this.level = level;
    }

    getData() {
        return TalentData[this.id];
    }
}

export class TalentManager {
    private _talents: Record<number, Talent> = {};
    constructor() {
        this._talents[ETalentType.DEFENSE] = new Talent(ETalentType.DEFENSE, 0);
        this._talents[ETalentType.POWER] = new Talent(ETalentType.POWER, 0);
    }

    public getPackage(): Record<number, { id: ETalentType, level: number }> {
        let data = {};
        data[ETalentType.POWER] = this._talents[ETalentType.POWER].level;
        data[ETalentType.DEFENSE] = this._talents[ETalentType.DEFENSE].level;
        return data;
    }

    setPackage(data: {}) {
        this._talents[ETalentType.DEFENSE].level = Utils.getSafeData(data[ETalentType.DEFENSE], 0);
        this._talents[ETalentType.POWER].level = Utils.getSafeData(data[ETalentType.POWER], 0);
    }
}