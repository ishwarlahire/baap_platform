import Project from "./project.model";
import Task from "./task.model";
import ProjectStatus from "./projectstatus.model";
import TaskStatus from "./taskstatus.model";
import User from "./user.model";
import UserProfile from "./userProfile.model";

User.hasOne(UserProfile, {
  foreignKey: "user_id",
  as: "profile_user",
  onDelete: "CASCADE"
});

UserProfile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

Project.belongsTo(ProjectStatus, {
  foreignKey: "status_id",
  as: "status"
});

ProjectStatus.hasMany(Project, {
  foreignKey: "status_id",
  as: "projects"
});

Project.hasMany(Task, {
  foreignKey: "project_id",
  as: "tasks"
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project"
});

Task.belongsTo(TaskStatus, {
  foreignKey: "status_id",
  as: "status"
});

TaskStatus.hasMany(Task, {
  foreignKey: "status_id",
  as: "tasks"
});

Project.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator"
});

User.hasMany(Project, {
  foreignKey: "created_by",
  as: "created_projects"
});

// 🔹 Task ↔ User
Task.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignee"
});

User.hasMany(Task, {
  foreignKey: "assigned_to",
  as: "assigned_tasks"
});