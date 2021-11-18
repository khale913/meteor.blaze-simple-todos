import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/Imports/api/TasksCollection";

// default username and password
const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

const insertTask = (taskText) => TasksCollection.insert({ text: taskText });

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Third Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }
});
