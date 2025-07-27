# LMS Schema README

## 🗂️ Tables

### 1. `users`

| Column        | Type           | Notes              |
| ------------- | -------------- | ------------------ |
| `userid`      | UUID (PK)      | Primary key        |
| `useremailid` | VARCHAR UNIQUE | Login email        |
| `username`    | VARCHAR        | Display name       |
| `password`    | VARCHAR        | Hashed password    |
| `role`        | ENUM           | `admin` or `user`  |
| `created_at`  | TIMESTAMP      | Auto‑set on insert |
| `updated_at`  | TIMESTAMP      | Auto‑set on update |

### 2. `courses`

| Column        | Type      | Notes            |
| ------------- | --------- | ---------------- |
| `courseid`    | UUID (PK) |                  |
| `title`       | VARCHAR   |                  |
| `description` | TEXT      |                  |
| `instructor`  | UUID (FK) | → `users.userid` |
| `price`       | DECIMAL   |                  |
| `created_at`  | TIMESTAMP |                  |
| `updated_at`  | TIMESTAMP |                  |

### 3. `lessons`

| Column          | Type      | Notes                      |
| --------------- | --------- | -------------------------- |
| `lessonid`      | UUID (PK) |                            |
| `courseid`      | UUID (FK) | → `courses.courseid`       |
| `title`         | VARCHAR   |                            |
| `videourl`      | VARCHAR   |                            |
| `display_order` | INT       | Position within the course |
| `created_at`    | TIMESTAMP |                            |
| `updated_at`    | TIMESTAMP |                            |

### 4. `lesson_resources`

| Column          | Type      | Notes                |
| --------------- | --------- | -------------------- |
| `resourceid`    | UUID (PK) |                      |
| `lessonid`      | UUID (FK) | → `lessons.lessonid` |
| `resource_link` | VARCHAR   | URL or path          |
| `created_at`    | TIMESTAMP |                      |
| `updated_at`    | TIMESTAMP |                      |

### 5. `enrollments`

| Column         | Type         | Notes                                              |
| -------------- | ------------ | -------------------------------------------------- |
| `enrollmentid` | UUID (PK)    |                                                    |
| `userid`       | UUID (FK)    | → `users.userid`                                   |
| `courseid`     | UUID (FK)    | → `courses.courseid`                               |
| `enrolled_on`  | TIMESTAMP    | When the user enrolled                             |
| `progress_pct` | DECIMAL      | 0.00–100.00 |
| `created_at`   | TIMESTAMP    |                                                    |
| `updated_at`   | TIMESTAMP    |                                                    |

### 6. `lesson_completion`

| Column         | Type      | Notes                               |
| -------------- | --------- | ----------------------------------- |
| `completionid` | UUID (PK) |                                     |
| `userid`       | UUID (FK) | → `users.userid`                    |
| `lessonid`     | UUID (FK) | → `lessons.lessonid`                |
| `completed_on` | TIMESTAMP | When the lesson was marked complete |
| `created_at`   | TIMESTAMP |                                     |
| `updated_at`   | TIMESTAMP |                                     |

### 7. `questions`

| Column       | Type      | Notes                  |
| ------------ | --------- | ---------------------- |
| `questionid` | UUID (PK) | Reusable question bank |
| `text`       | TEXT      | Question prompt        |
| `created_at` | TIMESTAMP |                        |
| `updated_at` | TIMESTAMP |                        |

### 8. `quiz_questions`

| Column          | Type          | Notes                          |
| --------------- | ------------- | ------------------------------ |
| `quizid`        | UUID (FK, PK) | → `quizzes.quizid`             |
| `questionid`    | UUID (FK, PK) | → `questions.questionid`       |
| `display_order` | INT           | Order of question in this quiz |
| `created_at`    | TIMESTAMP     |                                |
| `updated_at`    | TIMESTAMP     |                                |

### 9. `quiz_options`

| Column          | Type      | Notes                           |
| --------------- | --------- | ------------------------------- |
| `optionid`      | UUID (PK) |                                 |
| `questionid`    | UUID (FK) | → `questions.questionid`        |
| `display_order` | INT       | Order within this question      |
| `text`          | TEXT      | Option text                     |
| `is_correct`    | BOOLEAN   | True for the one correct choice |
| `created_at`    | TIMESTAMP |                                 |
| `updated_at`    | TIMESTAMP |                                 |

### 10. `quizzes`

| Column       | Type      | Notes                |
| ------------ | --------- | -------------------- |
| `quizid`     | UUID (PK) |                      |
| `courseid`   | UUID (FK) | → `courses.courseid` |
| `created_at` | TIMESTAMP |                      |
| `updated_at` | TIMESTAMP |                      |

### 11. `quiz_attempts`

| Column        | Type      | Notes              |
| ------------- | --------- | ------------------ |
| `attemptid`   | UUID (PK) |                    |
| `userid`      | UUID (FK) | → `users.userid`   |
| `quizid`      | UUID (FK) | → `quizzes.quizid` |
| `started_at`  | TIMESTAMP |                    |
| `finished_at` | TIMESTAMP |                    |
| `score`       | INT       | Computed total     |
| `created_at`  | TIMESTAMP |                    |
| `updated_at`  | TIMESTAMP |                    |

### 12. `quiz_answers`

| Column       | Type      | Notes                             |
| ------------ | --------- | --------------------------------- |
| `answerid`   | UUID (PK) |                                   |
| `attemptid`  | UUID (FK) | → `quiz_attempts.attemptid`       |
| `optionid`   | UUID (FK) | → `quiz_options.optionid`         |
| `is_correct` | BOOLEAN   | Mirrors `quiz_options.is_correct` |
| `created_at` | TIMESTAMP |                                   |
| `updated_at` | TIMESTAMP |                                   |

---

## 🔑 Key Relationships

* **1 Course → N Lessons** via `lessons.courseid`
* **1 Lesson → N Resources** via `lesson_resources.lessonid`
* **Users ↔ Courses** many‑to‑many via `enrollments` (with `progress_pct`)
* **Users ↔ Lessons** many‑to‑many via `lesson_completion`
* **1 Course → 1 Quiz** via `quizzes.courseid`
* **Quizzes ↔ Questions** many‑to‑many via `quiz_questions`
* **1 Question → N Options** via `quiz_options.questionid`
* **Users ↔ Quizzes** many‑to‑many via `quiz_attempts` + picks in `quiz_answers`

---

## 🤔 Assumptions & Notes

1. **Per‑course progress stored**

   * `enrollments.progress_pct` holds 0.00–100.00.
   * Each lesson carries equal weight: (progress = completed\_lessons ÷ total\_lessons) × 100.
2. **Single‑correct MCQ**

   * Exactly one `quiz_options.is_correct = TRUE` per question.
3. **Re‑usable question bank**

   * Questions live in `questions`; quizzes reference them via `quiz_questions`.
4. **Strong ordering**

   * `display_order` on `lessons`, `quiz_questions`, `quiz_options` controls presentation.
5. **Audit fields**

   * All tables use `created_at`/`updated_at` to support change tracking.
6. **Instructor is a user**

   * `courses.instructor` FK → `users.userid`.
7. **Scores & grading**

   * `quiz_attempts.score` is computed (e.g. count of correct answers) and stored for quick reporting.


---

This file documents the full relational schema, ready for implementation in PostgreSQL.
