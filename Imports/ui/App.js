import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import { ReactiveDict } from "meteor/reactive-dict";
import "./App.html";
import "./Task";
import "./Login.js";

const getUser = () => Meteor.user();

const isUserLogged = () => !!getUser();

const HIDE_COMPLETED_STRING = "hideCompleted";

const getTasksFilter = () => {
  const user = getUser();

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  return { userFilter, pendingOnlyFilter };
};

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.events({
  "click #hide-completed-button"(event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
    // console.log(event, instance);
  },
  "click .user"() {
    Meteor.logout();
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
  // tasks
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const { pendingOnlyFilter, userFilter } = getTasksFilter();

    if (!isUserLogged()) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  },

  // hide completed tasks
  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },

  // track of how many tasks remaining
  incompleteCount() {
    if (!isUserLogged()) {
      return "";
    }

    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTasksCount =
      TasksCollection.find(pendingOnlyFilter).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : "";
  },

  // check if user is logged in
  isUserLogged() {
    return isUserLogged();
  },

  getUser() {
    return getUser();
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
      userId: getUser()._id,
      createdAt: new Date(),
    });

    // clear form input
    target.text.value = "";
  },
});
