import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import "./App.html";

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({});
  },
});

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
