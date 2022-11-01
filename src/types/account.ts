import {AvailableRegion} from "../constants/avail-zones";

export interface AWSAccount {
    readonly name: string;
    readonly accountId: string;
    readonly majorRegion: AvailableRegion;
    readonly minorRegion?: AvailableRegion;
    readonly deployProfile?: string;
}

export interface AWSAccountList {
    readonly [account: string]: AWSAccount;
}
