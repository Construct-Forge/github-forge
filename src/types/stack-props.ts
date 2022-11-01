import {AWSAccount} from "./account";

export interface CommonAWSStackProps {
    readonly account: AWSAccount;
    readonly backendProfile: string;
    readonly stateBucket: string;
    readonly failover?: boolean;
}

export interface CommonAWSConstructProps {
    readonly account: AWSAccount;
}