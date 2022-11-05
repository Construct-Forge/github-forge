import {Construct} from "constructs";
import {Repository} from '@cdktf/provider-github/lib/repository'
import {BranchProtection} from "@cdktf/provider-github/lib/branch-protection";
import {TerraformOutput} from "cdktf";

export interface ConstructForgeGithubRepoProps {
    repoName: string;
    repoDesc: string;
    hasWiki?: boolean;
    allowMergeCommit?: boolean,
    allowSquashMerge?: boolean,
    allowRebaseMerge?: boolean,
    allowAutoMerge?: boolean,
    deleteBranchOnMerge?: boolean,
    autoInit?: boolean,
    archiveOnDestroy?: boolean,
    vulnerabilityAlerts?: boolean,
    defaultBranch?: string,
    squashMergeCommitTitle?: string,
    squashMergeCommitMessage?: string
}

export class ConstructForgeGithubRepo extends Construct{
    constructor(scope: Construct, id: string, props: ConstructForgeGithubRepoProps) {
        super(scope, id);

        const protectedBranches = [
            "main",
            "release-*"
        ]

        const repo = new Repository(this, 'ConstructForgeGithubRepo', {
            name: props.repoName,
            description: props.repoDesc,
            hasWiki: props.hasWiki ?? false,
            allowMergeCommit: props.allowMergeCommit ?? false,
            allowSquashMerge: props.allowSquashMerge ?? true,
            allowRebaseMerge: props.allowRebaseMerge ?? false,
            allowAutoMerge: props.allowAutoMerge ?? false,
            deleteBranchOnMerge: props.deleteBranchOnMerge ?? true,
            autoInit: props.autoInit ?? true,
            archiveOnDestroy: props.archiveOnDestroy ?? true,
            vulnerabilityAlerts: props.vulnerabilityAlerts ?? true,
            defaultBranch: props.defaultBranch ?? 'main',
            squashMergeCommitTitle: props.squashMergeCommitTitle ?? 'PR_TITLE',
            squashMergeCommitMessage: props.squashMergeCommitMessage ?? 'COMMIT_MESSAGE'
        })

        protectedBranches.forEach(branchPattern => {
            new BranchProtection(this, `ConstructForgeBranchProtection${branchPattern}`, {
                repositoryId: repo.id,
                pattern: branchPattern,
                requiredLinearHistory: true,
                requireConversationResolution: true,
                allowsDeletions: false,
                allowsForcePushes: false,
                requiredPullRequestReviews: [
                    {requiredApprovingReviewCount: 1}
                ]
            })
        })

        new TerraformOutput(this, 'GithubForgeRepoOutput', {
            description: 'github-forge-url',
            value: repo.gitCloneUrl
        })

    }
}