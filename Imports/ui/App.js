import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import "./App.html";
import "./Task";

// pull tasks from db
Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({});
  },
});

// sort todos by date created
Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({}, { sort: { createdAt: -1 } });
  },
});

// form submit
Template.form.events({
  "submit .task-form"(e) {
    // stop auto reload
    e.preventDefault();

    //get value
    const target = e.target;
    const text = target.text.value;

    // Insert task into collection
    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });

    // clear form input
    target.text.value = "";
  },
});
