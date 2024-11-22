export default class Task {
  constructor(title, description = "", priority = "low") {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.completed = false;
    this.priority = priority;
    this.createdAt = new Date();
  }
}
