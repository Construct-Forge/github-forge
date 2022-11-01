import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import {AWSProviderConfigs} from "../constructs/aws-configs";
import {AWSAccount} from "../types/account";
import * as github from "@cdktf/provider-github"

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
            organization: props.githubOrg
        });

        const githubForgeRepo = new github.repository.Repository(this, 'GithubForge', {
            name: 'github-forge',
            description: 'Holds Github Repos and configs for organization'
        })

        new TerraformOutput(this, 'GithubForgeRepoOutput', {
            description: 'github-forge-url',
            value: githubForgeRepo.gitCloneUrl
        })
    }
}