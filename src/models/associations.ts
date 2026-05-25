import Project from "./project.model";
import Task from "./task.model";
import ProjectStatus from "./projectstatus.model";
import TaskStatus from "./taskstatus.model";
import User from "./user.model";
import UserProfile from "./userProfile.model";
import TaskAssignee from "./taskassignee.model";
import ProjectAssignee from "./projectAssignee.model";
import ProjectType from "./projectType.model";

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


Task.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignee"
});

User.hasMany(Task, {
  foreignKey: "assigned_to",
  as: "assigned_tasks"
});

Task.hasMany(TaskAssignee, {
  foreignKey: "task_id",
  as: "assignees"
});

TaskAssignee.belongsTo(Task, {
  foreignKey: "task_id",
  as: "task"
});

TaskAssignee.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignedTo"
});

TaskAssignee.belongsTo(User, {
  foreignKey: "assigned_by",
  as: "assignedByUser"
});

Project.hasMany(ProjectAssignee, {
  foreignKey: "project_id",
  as: "assignees"
});

ProjectAssignee.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project"
});

ProjectAssignee.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignedTo"
});

ProjectAssignee.belongsTo(User, {
  foreignKey: "assigned_by",
  as: "assignedBy"
});

Project.belongsTo(ProjectType, {
  foreignKey: "project_type_id",
  as: "type"
});

ProjectType.hasMany(Project, {
  foreignKey: "project_type_id",
  as: "projects"
});