import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import {AWSProviderConfigs} from "../constructs/aws-configs";
import {AWSAccount} from "../types/account";
import * as github from "@cdktf/provider-github"
import {ConstructForgeGithubRepo} from "../constructs/construct-forge-github-repo";

export interface GithubReposStackProps {
    account: AWSAccount,
    backendProfile: string,
    stackName: string,
    stateBucket: string,
    githubOrg: string
}

export class GithubReposStack extends TerraformStack {
    constructor(scope: Construct, id: string, props: GithubReposStackProps) {
        super(scope, id);

        new AWSProviderConfigs(this, 'GithubReposAWSProviderConfigs', props);
        new github.provider.GithubProvider(this, 'GithubProvider', {
            owner: props.githubOrg,
        });

        new ConstructForgeGithubRepo(this, 'GithubForge', {
            repoName: 'github-forge',
            repoDesc: 'Holds Github Repos and configs for organization',

        })

        new ConstructForgeGithubRepo(this, 'AwsConstructForgeRepo', {
            repoName: 'construct-forge-aws',
            repoDesc: 'Holds AWS Constructs'
        })

        new ConstructForgeGithubRepo(this, 'PracticeForgeRepo', {
            repoName: 'practice-forge',
            repoDesc: 'Holds practice stacks that import construct forge constructs'
        })

    }
}