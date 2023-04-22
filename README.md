# Azure Git Repositories Puller
Clone or update all Git repositories under an Azure project you specified to a local folder you specified. Works on both Mac and Windows. Linux not tested but should also work.

## Prerequisit
* Have `git` installed on your system.
* Have access to the Azure project setup so that you can manually clone one repository.
* Have NodeJS installed on your system. This project is developed and tested on NodeJS 16, but older and newer versions of NodeJS could also work.

## Setup
* Make a copy of `.env.example` and rename to `.env`. Follow the comments in it to gather all the required variables:
  * An Azure org has its own name and it can have multiple projects each have its own name.
  * You need both the org name and the project name. We do not support clone all repos under all projects yet.
  * Documentation on how to generate your Personal Access Token can be found [here](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows)
* Run from root folder of this project `npm i`

## Run
Run from root folder of this project `npm start`