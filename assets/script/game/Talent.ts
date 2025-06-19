export enum ETalentType {
    POWER = 'power',
    DEFENSE = 'defense',
}


export class TalentData {
    [ETalentType.POWER] = { name: 'Power Talent', description: 'Increases attack power.' };
    [ETalentType.DEFENSE] = { name: 'Defense Talent', description: 'Increases defense power.' };
}

export class Talent {
    id: number;
    level: number;
    constructor(id: number, level: number) {
        this.id = id;
        this.level = level;
    }

}

export class TalentManager {
    private static _instance: TalentManager = null;
    public static get instance(): TalentManager {
        if (this._instance == null) {
            this._instance = new TalentManager();
        }
        return this._instance;
    }

    private _talents: Record<number, Talent> = {};

    public addTalent(id: number, level: number): void {
        if (!this._talents[id]) {
            this._talents[id] = new Talent(id, level);
        } else {
            this._talents[id].level += level;
        }
    }

    public getTalent(id: number): Talent | null {
        return this._talents[id] || null;
    }

    public getAllTalents(): Record<number, Talent> {
        return this._talents;
    }
}