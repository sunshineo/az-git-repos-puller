import * as azdev from "azure-devops-node-api";
import * as dotenv from 'dotenv';
import * as GitApi from "azure-devops-node-api/GitApi";
import * as fs from 'fs';
import path from 'path';
import * as shelljs from 'shelljs';

dotenv.config();

const reposFolder = process.env.reposFolder || '~';
const azGitUrlBase = process.env.azGitUrlBase;
const azOrganizationUrl = process.env.azOrganizationUrl || '';
const azPersonalAccessToken = process.env.azPersonalAccessToken || '';

const authHandler = azdev.getPersonalAccessTokenHandler(azPersonalAccessToken); 
const connection = new azdev.WebApi(azOrganizationUrl, authHandler);    

let main = async () => {
    const git: GitApi.GitApi = await connection.getGitApi();
    const repos = await git.getRepositories();
    for (const repo of repos) {
        // Should not happen but typescript complains if we don't check
        if (!repo.name) continue;
        const localPath = path.join(reposFolder, repo.name)
        console.log(`Checking if folder ${localPath} exists`)
        const exists = fs.existsSync(localPath)
        if (exists) {
            console.log(`Folder exists`)
        }
        else {
            console.log(`Folder does not exists`)
            const githttps = azGitUrlBase + '/' + encodeURIComponent(repo.name ?? '');
            const localPathNormalized = path.normalize(localPath);
            const cloneCmd = `git clone ${githttps} ${localPathNormalized}`
            console.log(cloneCmd)
            shelljs.exec(cloneCmd)
        }
        shelljs.cd(localPath)
        shelljs.exec('git pull --all')
    }
}

main()
