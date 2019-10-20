---
title: "Callback Functions: Simple Nodejs File IO"
path: "/nodejs-file-io-using-callbacks"
tags: ["NodeJS"]
featuredImage: "./cover.jpg"
excerpt: How to use Callback Functions to handle asynchronous tasks such as reading and writing files in Nodejs.
created: 2019-10-19
updated: 2019-10-19
---
 
## Overview
 
Hi guys! Today, I will be walking you through how to use Callback functions with Asynchronous tasks in Nodejs. The main goal of this tutorial will be to familiarize yourself with reading files in Nodejs while utilizing callback functions. I will be adding more posts in the future, on how to do the same thing with Promises and ES6 Async/Await. However, if you are just starting out callbacks is a great place to start! So, let's get started!
 
## Setup
 
### Getting the files
 
A quick note: Before you can follow the steps of this tutorial you will need to have Nodejs installed on your system as well as Git.
 
To get started, run this command to git clone the repo:
 
```bash
# using https
git clone --branch Starting-Point-v2 https://github.com/andrewgeorgemitchell/amwebdev-nodejs-file-io-tut.git
 
# using ssh
git clone --branch Starting-Point-v2 git@github.com:andrewgeorgemitchell/amwebdev-nodejs-file-io-tut.git
```
 
*If your are curious what the --branch Starting-Point-v2 does, it clones the repo at a tag I setup to allow you to follow along in the tutorial from the beginning. If you wish to just see the finished repo simply remove --branch Starting-Point-v2 from the command. Also, if you’ve already cloned the repo, run git checkout master and you will be checked out to the latest commit.*
 
From here, you can open the folder in your favorite code editor aka **VS Code**.
 
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
 
*Note: You don't have to run npm install fs because fs is included by default inside your installation of Nodejs. However for non-core Nodejs packages you will have to install them using npm.*
 
## How to Read/Write files in 3 Different Methods
 
When reading and writing from files in Nodejs, you are performing what is called an asynchronous action, meaning an action that has no scheduled or predictable end time. Nodejs has 3 different syntactical ways of dealing with asynchronous action and while some are definitely better than others (cough cough async/await) all of them are worth understanding, because the likelihood you come across all three is very high. So we will go over all of them in order of difficulty (for beginners) as well as the order that most people should learn them in.
 
**The three methods are:**
- [Callback Method](#callback-method)
- Promise Method (Coming Soon)
- Async/Await Method (Coming Soon)
 
### Callback Method
 
Simply put, callbacks are a function which you pass into an asynchronous function  that will be executed once the asynchronous function finishes. So in layman terms it works like this:
 
```javascript
// Asynchronous Function: Do some asynchronous action such as read from file
  // Callback Function: Once your done do something with the file
```
 
The strange thing about this is that we don't know when the second line or callback function will execute. It could be in a minute, or in an hour. So in order to avoid errors, we have to make sure our callback function doesn't rely on anything but what is getting passed to it from the original asynchronous function.
 
As a final note, dealing with errors in callbacks can be somewhat repetitive, but it needs to be done, so we will employ what is called error first callbacks which deal with the error case first, then deals with the success case.
 
So let’s adjust the pseudo code to handle errors:
 
```javascript
// Asynchronous Function: Do some asynchronous action
  // Callback Function: Once said action is done
    // If there is an error deal with it
    // If there isn't an error do what I wanted
```
 
#### Reading from file
 
When it comes to implementing a function to read a file from the filesystem we will take advantage of nodes built in fs (filesystem) module to do this. Specifically we will be using the [fs.readFile](https://nodejs.org/api/fs.html) method which takes two arguments:
 - the path to the file you want to read
 - the callback function to execute once it has the files data
 
So let’s take the pseudo code from above and add some Nodejs skeleton to it.
 
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
 
So above you can see we actually moved the callback function above the fs.readFile which seems counterintuitive but we are actually just declaring the callback function so it can be **passed down into** fs.readFile(). This method is actually somewhat unorthodox as normally what is very common for callback functions is not give it a name at all, but instead to just declare it as an anonymous function when you need it like this:
 
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
 
Great! Now we are using an anonymous function, which is definitely the more popular approach when using callbacks. That being said, this can definitely be more confusing for beginners, so if you wish to use the first method feel free, but I will be using the second as it is more of an industry standard.
 
Now we actually have a working function that will read the file’s contents, but we need to do something with the raw file data that was passed into our callback by fs.readFile. Spoiler alert, fs.readFile gives the raw buffer data which isn't very useful to anyone, so let’s look into how to change into a string. So let’s use the very helpful .toString method available on any variable that is of type buffer.
 
To do this we need only add one line, but let’s also add the code to actually read the file of our choosing because filepath is not defined yet: 
 
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
 
Now if we run our program using this command:
 
```bash
node index.js
```
 
We will get this output to the console.
 
```bash
name, age, favAnimal
Eli Miller, 24, Dog
John Smith, 35, Tiger
Betsy Blue, 19, Warthog
Justin Long, 15, Cat
```
 
This isn't very useful though so let’s convert this CSV string into a javascript array of user objects where the first row is used as the keys and the rows after that are the values. To keep our code clean, let’s create a helper function to do this called convert csvToObject.
 
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
 
Perfect! Now we have our array of users that we could do all types of things with.
 
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
 
Callbacks and asynchronous functions can be complicated when you first start, but like most programming principles, if you keep practicing you will get the hang of them. In the future I will be adding guides for both Promises and Async/Await, so if callbacks and their messy looking coding style left you feeling icky then you should stay tuned. Callbacks are a thing of the past and Promises and Async/Await are the future.
 
### Part 2: Simple Nodejs File IO With Promises (Coming Soon)
 
### Part 3: Simple Nodejs File IO With Async/Await (Coming Soon)

