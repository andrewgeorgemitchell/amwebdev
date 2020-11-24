---
title: "Github Action: Getting Started Guide"
path: "/getting-started-with-github-actions"
tags: ["NodeJS"]
featuredImage: "./cover.jpg"
excerpt: How to get up and running with Github Actions, in only a couple minutes.
created: 2020-11-23
updated: 2020-11-23
---
 
## Overview

Hello again, today I'm get you started using Github Actions. Github Actions are an absolutely amazing resource for helping developers perform mundane tasks automatically. If you have never setup CI/CD systems before and want to get started, there is no better way than with Github Actions. So lets get started!

## Github Actions Pricing

**TLDR; Its free for public repos and very cheap for private repos with a very generous free tier! (2000 Minute Free Tier)** 

So lets talk pricing first since you don't want to read a tutorial about some great product that you can't afford, luckily for you Github Actions Pricing is very affordable and by affordable I mean basically free for most users (I personally have payed a dime) and very affordable for larger teams and organizations, but don't take my word for it go checkout their pricing page: [Github Actions Pricing Page](https://github.com/pricing).

![Github Pricing Plan Page Screenshot](./GithubPricing.png)

## Getting Started

For starters I'm going to assume you have a repo preferably a Javascript repo that you want to follow along with in this Github Actions Tutorial. In this tutorial I'm going to go over how to setup and automatic eslint checker for your code! Exciting stuff I know, so lets get started!


### Create .github/workflows folder

First things first we need to create the ```.github/workflows``` folders in the root of your repo. You can do this in your VS Code sidebar or by using the terminal with the following code:

 ```mkdir .github/workflows```

This is where all your Github Actions live in your repo and by adding this folder we are letting Github know that there are actions inside this repo that it needs to run the next time you push up your code.

### Create our first Github Action

Next lets go ahead and create our file, Github Actions use YAML files so our file will end with ```.yml``` in this case lets call just call it ```eslint.yml``` again you can create it in VS Code or using the following command:

```touch .github/workflows/eslint.yml```

Go ahead and open your new file and lets start coding!


#### Name our Workflow
The first thing we need to add is name of our Github Action Workflow. Like this:

```yaml
# eslint.yml

name: Our First Eslint Checker 👶
```

#### Specify when our workflow should trigger

Next lets we are going to define when this action should run. There are a couple options here but we going to go with whenever a Pull request is created or updated, which we specify in the file using the ```on``` key:

```yaml
# eslint.yml

name: Our First Eslint Checker 👶

on:
  pull_request:
    branches: [ main ] # PRs to main only
```

#### Setup our workflow environment
Ok the last thing we have to do before we get to the meat of it is specify the environment or virtual machine we want our CI to run in. For most cases using ubuntu-latest is going to be our best bet. So lets do that

```yaml
# eslint.yml

name: Our First Eslint Checker 👶

on:
  pull_request:
    branches: [ main ] # PRs to main only

jobs: # Jobs to be run
  run-linters: # Name of job (pretty arbitrary can be called basically anything)
    name: Lint Frontend # (!Important) This name is what will show up in the Github UI so its important
    runs-on: ubuntu-latest # Virtual env to use
```

#### Define our Workflow steps

Ok last but not least we get to design the steps that our action should take to perform our linting task. These steps operate very similarly to Pseudo code, because each step has a name (which will be visible in the Github UI for debugging) and an action that it will do. The actions can either be a command that the terminal will execute or more powerfully it can execute an entire function from the Github Marketplace, most them are free so don't let the term marketplace scare you! So lets go ahead and layout our actions in a step by step manor:

```yaml
# eslint.yml

name: Our First Eslint Checker 👶

on:
  pull_request:
    branches: [ main ] # PRs to main only

jobs: # Jobs to be run
  run-linters: # Name of job (pretty arbitrary can be called basically anything)
    name: Lint Code # (!Important) This name is what will show up in the Github UI so its important
    runs-on: ubuntu-latest # Virtual env to use

    steps:
      - name: Check out Git repository # The first step of most actions is going to 
        uses: actions/checkout@v2 # use this plugin to clone the repo to the virtual machine

      - name: Set up Node.js # Secondarily because this is a javascript ecosystem we need to install node
        uses: actions/setup-node@v1 # This plugin takes care of that for us
        with:
          node-version: 12 # Some plugins allow for configuration like this

      # Install our packages now that we have node
      - name: Install Node.js dependencies
        run: npx yarn install # I use npx here so I don't have to install yarn globally on this VM

      # Lint the folder system
      - name: Lint Code
        run: yarn eslint . # You could customize this line to use whatever options you needed.

```

And there you have it. Go ahead and create a PR with these changes and you will see the Github Action Takes no time in telling you about all your eslint errors!