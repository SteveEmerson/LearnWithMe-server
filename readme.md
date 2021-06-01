# LearnWithMe App Server

## Endpoints

| Endpoint                     | Verb   | Description                                         | Protected? |     |
| :--------------------------- | :----- | :-------------------------------------------------- | ---------- | --- |
| /teacher/register            | POST   | Create a new teacher.                               | No         |     |
|                              |        |                                                     |
| /teacher/signin              | POST   | Login an existing teacher and create session token. | No         |     |
|                              |        |                                                     |
| /teacher/:id                 | PUT    | Update teacher info including password.             | Yes        |
|                              |        |                                                     |
| /teacher/:id                 | PATCH  | Update teacher info with no new password.           | Yes        |
|                              |        |                                                     |
| /teacher/:id                 | GET    | Gets individual teacher by id.                      | Yes        |
|                              |        |                                                     |
| /teacher/                    | GET    | Retrieve all teachers.                              | Yes        |
|                              |        |
| /student/register            | POST   | Create a new student.                               | No         |     |
|                              |        |                                                     |
| /student/signin              | POST   | Login an existing student and create session token. | No         |     |
|                              |        |                                                     |
| /student/:id                 | PUT    | Update student info including password.             | Yes        |
|                              |        |                                                     |
| /student/:id                 | PATCH  | Update student info with no new password.           | Yes        |
|                              |        |                                                     |
| /student/:id                 | GET    | Gets individual student by id.                      | Yes        |
|                              |        |                                                     |
| /student/                    | GET    | Retrieve all students.                              | Yes        |
|                              |        |                                                     |
| /meeting/student_create      | POST   | Student create a new meeting.                       | Yes        |     |
|                              |        |                                                     |
| /meeting/student_update/:id  | PUT    | Student update a meeting.                           | Yes        |
|                              |        |                                                     |
| /meeting/student_get         | GET    | Retrieve meetings by student id.                    | Yes        |
|                              |        |                                                     |
| /meeting/student_delete/:id  | DELETE | Student delete a meeting.                           | Yes        |     |
|                              |
| /meeting/teacher_create      | POST   | Teacher create a new meeting.                       | Yes        |     |
|                              |        |                                                     |
| /meeting/teacher_update/:id  | PUT    | Teacher update a meeting.                           | Yes        |
|                              |        |                                                     |
| /meeting/teacher_get         | GET    | Retrieve meetings by teacher id.                    | Yes        |
|                              |        |                                                     |
| /meeting/teacher_delete/:id  | DELETE | Teacher delete a meeting.                           | Yes        |
|                              |        |                                                     |
| /mtg_note/student_create     | POST   | Student create a new meeting note.                  | Yes        |     |
|                              |        |                                                     |
| /mtg_note/student_update/:id | PUT    | Student update a meeting note.                      | Yes        |
|                              |        |                                                     |
| /mtg_note/student_get        | GET    | Retrieve meeting notes by student id.               | Yes        |
|                              |        |                                                     |
| /mtg_note/student_get/:id    | GET    | Retrieve meeting notes by meeting id.               | Yes        |
|                              |        |                                                     |
| /mtg_note/student_delete/:id | DELETE | Student delete a meeting note.                      | Yes        |
|                              |        |                                                     |
| /mtg_note/teacher_create     | POST   | Teacher create a new meeting note.                  | Yes        |     |
|                              |        |                                                     |
| /mtg_note/teacher_update/:id | PUT    | Teacher update a meeting note.                      | Yes        |
|                              |        |                                                     |
| /mtg_note/teacher_get        | GET    | Retrieve meeting notes by teacher id.               | Yes        |
|                              |        |                                                     |
| /mtg_note/teacher_get/:id    | GET    | Retrieve meeting notes by meeting id.               | Yes        |
|                              |        |                                                     |
| /mtg_note/teacher_delete/:id | DELETE | Teacher delete a meeting note.                      | Yes        |
|                              |        |                                                     |
| /goal/student_create         | POST   | Student create a new goal.                          | Yes        |     |
|                              |        |                                                     |
| /goal/student_update/:id     | PUT    | Student update a meeting.                           | Yes        |
|                              |        |                                                     |
| /goal/student_get            | GET    | Retrieve goals by student id.                       | Yes        |
|                              |        |                                                     |
| /goal/student_delete/:id     | DELETE | Student delete a goal (personal only).              | Yes        |     |
|                              |
| /goal/teacher_create         | POST   | Teacher create a new goal.                          | Yes        |     |
|                              |        |                                                     |
| /goal/teacher_update/:id     | PUT    | Teacher update a goal.                              | Yes        |
|                              |        |                                                     |
| /goal/teacher_get            | GET    | Retrieve goals by teacher id.                       | Yes        |
|                              |        |                                                     |
| /goal/teacher_delete/:id     | DELETE | Teacher delete a goal.                              | Yes        |
|                              |        |                                                     |
| /task/student_create         | POST   | Student create a new task.                          | Yes        |     |
|                              |        |                                                     |
| /task/student_bulk           | POST   | Student create a set of tasks at the same time.     | Yes        |     |
|                              |        |                                                     |
| /task/student_update/:id     | PUT    | Student update a task.                              | Yes        |
|                              |        |                                                     |
| /task/student_get            | GET    | Retrieve tasks by student id.                       | Yes        |
|                              |        |                                                     |
| /task/student_get/:id        | GET    | Retrieve tasks by goal id.                          | Yes        |
|                              |        |                                                     |
| /task/student_delete/:id     | DELETE | Student delete a task.                              | Yes        |
|                              |        |                                                     |
| /task/teacher_create         | POST   | Teacher create a new task.                          | Yes        |     |
|                              |        |                                                     |
| /task/teacher_bulk           | POST   | Teacher create a set of tasks at the same time.     | Yes        |     |
|                              |        |                                                     |
| /task/teacher_update/:id     | PUT    | Teacher update a task.                              | Yes        |
|                              |        |                                                     |
| /task/teacher_get            | GET    | Retrieve tasks by teacher id.                       | Yes        |
|                              |        |                                                     |
| /task/teacher_get/:id        | GET    | Retrieve tasks by goal id.                          | Yes        |
|                              |        |                                                     |
| /task/teacher_delete/:id     | DELETE | Teacher delete a task.                              | Yes        |
|                              |        |                                                     |
