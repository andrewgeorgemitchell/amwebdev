---
title: "Github Actions: Getting Started Guide"
path: "/getting-started-with-github-actions"
tags: ["DevOps"]
featuredImage: "./cover.jpg"
excerpt: How to get up and running with Github Actions, in only a couple minutes.
created: 2020-11-23
updated: 2020-11-24
---
 
## Overview

Hello again! Today I'm going to get you started using Github Actions. Github Actions are an absolutely amazing resource for helping developers perform mundane tasks automatically. If you have never setup CI/CD systems before and want to get started, there is no better way than with Github Actions. So, let's get started!

## Github Actions Pricing

**TLDR; It's free for public repos and really reasonable for private repos with a very generous free tier! (2000 minutes free)** 

So, let's talk pricing first since you don't want to read a tutorial about some great product that you can't afford. Luckily for you Github Actions Pricing is very affordable and by affordable I mean basically free for most users (I personally haven't payed a dime) and still pretty cost-effective for larger teams and organizations. But you don't have to take my word for it. Their [pricing page](https://github.com/pricing) is super straightforward and gives a really solid outline of how the tiered system works.

![Github Pricing Plan Page Screenshot](./GithubPricing.png)

## Getting Started

For starters, I'm going to assume you have a repo, preferably a Javascript repo, that you'll want to follow along with in this Github Actions Tutorial. In this run through I'm going to go over how to setup an automatic eslint checker for your code! Exciting stuff I know, so let's get started!


### Create Github Workflows Folder

First things first we need to create the ```.github/workflows``` folders in the root of your repo. You can do this in your VS Code sidebar or by using the terminal with the following code:

 ```mkdir .github/workflows```

This is where all your Github Actions live in your repo. By adding this folder we are letting Github know that there are actions inside this repo that it needs to be executed the next time you push up your code.

### Create Our First Github Action

Next, let's go ahead and create our file. Github Actions use YAML files for configuration so our file will end with ```.yml```. In this case let's call just call it ```eslint.yml```, again you can create it in VS Code or using the following command:

```touch .github/workflows/eslint.yml```

Go ahead and open your new file and let's start coding!


### Name Our Workflow
The first thing we need to add is name of our Github Action Workflow. Like this:

```yaml
# eslint.yml

name: Our First Eslint Checker 👶
```

### Specify When Our Workflow Should Trigger

Next, we are going to define when this action should trigger. There are a couple options here, but we're going to go with whenever a **Pull Request** is **created** or **updated**, which we specify in the file using the ```on``` keyword:

```yaml
# eslint.yml

name: Our First Eslint Checker 👶

on:
  pull_request:
    branches: [ main ] # PRs to main only
```

### Setup Our Workflow Environment
Ok, the last thing we have to do before we get to the meat of it is specify the environment or virtual machine we want our CI to run in. For most cases using ubuntu-latest is going to be our best bet. So, let's do that:

```yaml
# eslint.yml

name: Our First Eslint Checker 👶

on:
  pull_request:
    branches: [ main ] # PRs to main only

jobs: # Jobs to be run
  run-linters: # Name of job (pretty arbitrary can be called basically anything)
    name: Lint Frontend # (!Important) This name will show up in the Github UI so its important
    runs-on: ubuntu-latest # Virtual env to use
```

### Define Our Workflow Steps

Ok last, but not least, we get to define the steps that our action should take to perform our linting task. These steps operate very similarly to pseudo code, because each step has a name (which will be visible in the Github UI for debugging) and an action that it executes. The actions can either be a command that the terminal will execute or better yet, you can it can execute an entire plugin from the Github Marketplace. So let's go ahead and layout our actions in a step-by-step manner:

```yaml
# eslint.yml

name: Our First Eslint Checker 👶

on:
  pull_request:
    branches: [ main ] # PRs to main only

jobs: # Jobs to be run
  run-linters: # Name of job (pretty arbitrary can be called basically anything)
    name: Lint Code # (!Important) This name will show up in the Github UI so its important
    runs-on: ubuntu-latest # Virtual env to use

    steps:
      - name: Check out Git repository # The first step of most actions is going to 
        uses: actions/checkout@v2      # use this plugin to clone the repo to the virtual machine

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

And there you have it. Go ahead and create a PR with these changes and you will see the Github Action takes no time in telling you about all your eslint errors!

![Github Action in Action!](./ActionScreenshot.png)

## Conclusion

There is so much more you can do with Github Actions, and I will probably create more tutorials in the future taking about this in more depth, so stay turned for those upcoming posts. If you have any more questions feel free to reach out either via my contact page or better yet leave a comment below and I'd be happy to help you in anyway I can!
