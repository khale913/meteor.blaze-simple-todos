import { Template } from "meteor/templating";

import "./Task.html";

Template.task.events({
  "click .toggle-checked"(e) {
    // set checked to opposite of value
    Meteor.call("tasks.setIsChecked", this._id, !this.isChecked);

    if (!this.isChecked) {
      const selectedItem = e.target.closest("#taskBox");
      selectedItem.style.background = "#8CE68C";

      console.log(selectedItem);
    } else {
      const selectedItem = e.target.closest("#taskBox");
      selectedItem.style.background = "none";
    }
  },

  "click .delete"() {
    Meteor.call("tasks.remove", this._id);
  },
});
