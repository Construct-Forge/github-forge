import { App } from "cdktf";
import {GithubReposStack} from "./src/stacks/github-repos";
import {storageAccount} from "./src/constants/accounts";

const app = new App();
const stateBucket = 'construct-forge-cdktf'
const backendProfile = 'storage'
const githubOrg = 'Construct-Forge'


new GithubReposStack(app, 'GithubRepos', {
    account: storageAccount,
    stateBucket: stateBucket,
    backendProfile: backendProfile,
    githubOrg: githubOrg,
    stackName: 'github-forge-repos',
})

app.synth();
