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
        const githubProvider = new github.provider.GithubProvider(this, 'GithubProvider', {
            owner: props.githubOrg,
        });

        const forgeOrgProject = new github.organizationProject.OrganizationProject(this, 'OrgProjectForge', {
            name: 'aws-construct-forge',
            provider: githubProvider
        })

        new github.projectColumn.ProjectColumn(this, 'TodoColumn', {
            name: 'Todo',
            projectId: forgeOrgProject.id,
        })

        new github.projectColumn.ProjectColumn(this, 'InProgressColumn', {
            name: 'In Progress',
            projectId: forgeOrgProject.id
        })

        new github.projectColumn.ProjectColumn(this, 'DoneColumn', {
            name: 'Done',
            projectId: forgeOrgProject.id
        })

        const githubForgeRepo = new github.repository.Repository(this, 'GithubForge', {
            name: 'github-forge',
            description: 'Holds Github Repos and configs for organization'
        })

        const awsConstructForgeRepo = new github.repository.Repository(this, 'AwsConstructForgeRepo', {
            name: 'construct-forge-aws',
            description: 'Holds AWS Constructs'
        })

        new TerraformOutput(this, 'GithubForgeRepoOutput', {
            description: 'github-forge-url',
            value: githubForgeRepo.gitCloneUrl
        })

        new TerraformOutput(this, 'AwsConstructForgeRepoOutput', {
            description: 'aws-construct-forge-url',
            value: awsConstructForgeRepo.gitCloneUrl
        })
    }
}