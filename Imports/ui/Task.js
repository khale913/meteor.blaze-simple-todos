import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import "./Task.html";

Template.task.events({
  "click .toggle-checked"() {
    // set checked to opposite of value
    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isChecked },
    });
  },
});
