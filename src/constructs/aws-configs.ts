import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { S3Backend } from 'cdktf';
import { Construct } from 'constructs';
import {CommonAWSStackProps} from "../types/stack-props";

export interface AWSConfigsProps extends CommonAWSStackProps {
    readonly stackName: string;
}

export class AWSProviderConfigs extends Construct {
    public readonly provider: AwsProvider;
    public readonly s3Backend: S3Backend;
    constructor(scope: Construct, name: string, props: AWSConfigsProps) {
        super(scope, name);

        const region = props.failover ? props.account.minorRegion : props.account.majorRegion;

        this.provider = new AwsProvider(this, 'AWSProvider', {
            region: region,
            profile: props.account.deployProfile,
        });

        this.s3Backend = new S3Backend(this, {
            bucket: props.stateBucket,
            profile: props.backendProfile,
            region: region,
            key: `${props.account.name}-${props.stackName}`,
        });
    }
}