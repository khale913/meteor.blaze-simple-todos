import { Template } from "meteor/templating";

import "./Task.html";

Template.task.events({
  "click .toggle-checked"() {
    // set checked to opposite of value
    Meteor.call("tasks.setIsChecked", this._id, !this.isChecked);
  },

  "click .delete"() {
    Meteor.call("tasks.remove", this._id);
  },
});

// Template.task.events({
//   "click .delete"() {
//     // delete the task item
//     TasksCollection.remove(this._id);
//   },
// });
