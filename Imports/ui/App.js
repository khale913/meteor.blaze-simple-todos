import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import { ReactiveDict } from "meteor/reactive-dict";
import "./App.html";
import "./Task";
import "./Login.js";

const getUser = () => Meteor.user();

const isUserLogged = () => !!getUser();

const HIDE_COMPLETED_STRING = "hideCompleted";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.events({
  "click #hide-completed-button"(event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
    // console.log(event, instance);
  },
});

// pull tasks from db
Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({});
  },
});

// sort todos and hide completed todos
Template.mainContainer.helpers({
  tasks() {
    const instance = Template.instance();

    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const hideCompletedFilter = { isChecked: { $ne: true } };

    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  },
  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },

  // track of how many tasks remaining
  incompleteCount() {
    const incompleteTasksCount = TasksCollection.find({
      isChecked: { $ne: true },
    }).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : "";
  },

  isUserLogged() {
    return isUserLogged();
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
