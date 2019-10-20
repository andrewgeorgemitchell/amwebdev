---
title: "Callback Functions: Simple Nodejs File IO With"
path: "/nodejs-file-io-using-callbacks"
tags: ["NodeJS"]
featuredImage: "./cover.jpg"
excerpt: How to read and write from files with nodejs using callbacks
created: 2019-10-19
updated: 2019-10-19
---

## Overview

In the this tutorial I will be walking you through read from files on your computer in nodejs. A common use case for this is onboarding CSV file in bulk into a database or if you wish to make a simple program that actually uses a csv file as a database. The main goal of this tutorial will be to familiarize you with reading files in nodejs while utilizing callback functions. I will be adding more posts on how to do the same thing with Promises and ES6 Async/Await in the future

## Setup

### Getting the files

To follow the steps of this tutorial you will need to have nodejs installed on your system as well as git.

To get started run this command to git clone the repo:

```bash
# using https
git clone --branch Starting-Point-v2 https://github.com/andrewgeorgemitchell/amwebdev-nodejs-file-io-tut.git

# using ssh
git clone --branch Starting-Point-v2 git@github.com:andrewgeorgemitchell/amwebdev-nodejs-file-io-tut.git
```

*if your are curious what the --branch Starting-Point-v2 does it clones the repo at a tag I setup to allow you to follow along in the tutorial from the beginning if you wish to just see the finished repo simply remove --branch Starting-Point-v2 from the command or if you already have cloned the repos run git checkout master and you will be checked out to the latest commit*

Then open the folder in your favorite code editor aka **VS Code**

### The File Structure

```jsx
- amwebdev-nodejs-file-io-tut/
  - index.js // our entry point file where we will right our program
  - data/ // folder where will read and write our data
    - users.csv // a csv file I made to for data to read from
  - package.json // npm package.json (not used in this tutorial)
```

### Nodejs Modules

In Nodejs most of the core functionality has been segmented out into modules, for example in this tutorial we will be using the 'fs' module for reading and writing to the filesystem. Importing the fs module is simple just **add the following to the top of index.js**:

```javascript
const fs = require('fs');
```

*Note you don't have to run npm install fs because fs is including by default inside your installation of nodejs. However for non core nodejs packages you will have to install them using npm*

## How to Read/Write files in 3 Different Methods

When reading and writing from files in nodejs, you are performing what is called an asynchronous action, meaning an action that has no scheduled or predictable end time. Nodejs has 3 different syntactical ways of dealing with asynchronous action and while some are definitely better than others (cough cough async/await) all of them are worth understanding, because the likelihood you come across all three is very high. So we will go over all of them in order of difficulty (for beginners) as well as the order that most people will should learn them in.

**The three methods are:**
- [Callback Method](#callback-method)
- Promise Method (Coming Soon)
- Async/Await Method (Coming Soon)

### Callback Method

Simply put callbacks are a function which you pass into an asynchronous function would which will be executed once the asynchronous function finishes. So in laymen terms it works like this:

```javascript
// Asynchronous Function: Do some asynchronous action such as read from file
  // Callback Function: Once your done do something with the file
```

The strange thing about this is that we don't know when the second line or callback function will execute. It could be 1 min, or it could be 1 hour. So in order to avoid errors we have to make sure our callback function doesn't rely on anything but what is getting passed to it from the original asynchronous function.

One final note on dealing with errors, dealing with errors in callbacks is somewhat repetitive but it needs to be done so we will employ what is called error first callbacks which deal with the error case first then deals with the success case.

So lets adjust the pseudo code to handle errors:

```javascript
// Asynchronous Function: Do some asynchronous action
  // Callback Function: Once said action is done
    // If there is an error deal with it
    // If there isn't an error do what I wanted
```

#### Reading from file

When it comes to implementing a function to read a file from the the filesystem we will take advantage of nodes built in fs (filesystem) module to do this. Specifically we will be use the [fs.readFile](https://nodejs.org/api/fs.html) method which takes two arguments:
 - the path to the file you want to read
 - the callback function to execute once it has the files data

So lets take the pseudo code from above and add some nodejs skeleton to it.

```javascript
// Callback Function: Do something with the file once its read
const readFileCallbackFunction = (error, file) => {
  // If there is an error deal with it
  if (error) {
    throw error;
  }
  // If there isn't an error do what I wanted with the file
}

// Asynchronous Function: Read file
fs.readFile(filepath, readFileCallbackFunction)
```

So above you can see we actually moved the callback function above the fs.readFile which seems counter intuitive but we are actually just declaring the callback function so it can be **passed down into** fs.readFile(). This method is actually somewhat strange as what is very common for callback functions is not give it a name and just to declare it as an anonymous function when you need it like this:

```javascript
// Asynchronous Function: Read file
fs.readFile(filepath, (error, file) => {
  // If there is an error deal with it
  if (error) {
    throw error;
  }
  // If there isn't an error do what I wanted
});
```

Great! Now we are using an anonymous function which is definitely the more popular approach when using callbacks, it definitely can be more confusing for beginners though so if you wish to use the first method feel free, but I will use the second as it is more of an industry standard.

Now we actually have the a working function that will read the file but we need to do something with the raw file data that was passed into our callback by fs.readFile. Spoiler alert fs.readFile gives the raw buffer data which isn't very useful to anyone so lets look into how to change into a string which is what we need so lets use the very helpful .toString method available on any variable that is of type buffer.

To do this we need only add one line, but lets also add the code to actually read the file of our choosing because filepath is not defined yet: 

```javascript
const filepath = `${__dirname}/data/users.csv`;

// Asynchronous Function: Read file
fs.readFile(filepath, (error, file) => {
  // If there is an error deal with it
  if (error) {
    throw error;
  }
  // If there isn't an error do what I wanted
  const fileStringData = file.toString();
  console.log(fileStringData)
});
```

Now if we run our program using this command

```bash
node index.js
```

We will get this output to the console

```bash
name, age, favAnimal
Eli Miller, 24, Dog
John Smith, 35, Tiger
Betsy Blue, 19, Warthog
Justin Long, 15, Cat
```

This isn't very useful though so lets convert this csv string into a javascript array of user objects where the first row is used as the keys and the rows after that are the values. To keep our code clean lets create a helper function to do this called convert csvToObject

```javascript
const csvToObject = (csvString) => {
  const splitByLineEndingAndCommas = csvString
    .split('\n') // splits the string by new line so we end of with an array where each line is now on its own
    .map((lineString) => lineString.split(',')); // Split each line by , so that each value is on its own

  // We end up with this:
  // [
  //   [ 'name', ' age', ' favAnimal' ],
  //   [ 'Eli Miller', ' 24', ' Dog' ],
  //   [ 'John Smith', ' 35', ' Tiger' ],
  //   [ 'Betsy Blue', ' 19', ' Warthog' ],
  //   [ 'Justin Long', ' 15', ' Cat' ]
  // ]

  // Create a header row for reference
  const headerRow = splitByLineEndingAndCommas[0];
  // Create our array of user objects
  const users = [];
  // Loop over the lines skipping the first header row because it doesn't represent a user
  for (let i = 1; i < splitByLineEndingAndCommas.length; i += 1) {
    // Create the blank object for the current user
    const newUser = {};
    // Create a reference variable to the current line array
    const line = splitByLineEndingAndCommas[i];
    // Loop over the headers row
    for (let b = 0; b < headerRow.length; b++) {
      const headerKey = headerRow[b];
      // Assign the key value pair for each header
      newUser[headerKey] = line[b];
    }
    // Push the finished user to the users array
    users.push(newUser);
  }

  return users;
}
```

Which results in very clean data like this:

```javascript
users: [
  { name: 'Eli Miller', age: '24', favAnimal: 'Dog' },
  { name: 'John Smith', age: '35', favAnimal: 'Tiger' },
  { name: 'Betsy Blue', age: '19', favAnimal: 'Warthog' },
  { name: 'Justin Long', age: '15', favAnimal: 'Cat' }
]
```

Perfect now we have our array of users that we could do all types of things with.

```javascript
// Asynchronous Function: Read file
fs.readFile(filepath, (error, file) => {
  // If there is an error deal with it
  if (error) {
    throw error;
  }
  // If there isn't an error do what I wanted
  const fileStringData = file.toString();
  const users = csvToObject(fileStringData);
  // Do something with users
});
```

## Wrapping Up

Callbacks and asynchronous functions can be complicated when you first start, if you keep practicing you will get the hang of them. In the future I will add guides for both Promises and Async/Await because if callbacks and their messy looking coding style left you feeling icky then you should stay tuned, Callbacks are thing of the past and Promises and Async/Await are the future.

### Part 2: Simple Nodejs File IO With Promises (Coming Soon)

### Part 3: Simple Nodejs File IO With Async/Await (Coming Soon)