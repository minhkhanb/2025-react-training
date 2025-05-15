🚀 Basic Git Workflow for Teams

🧭 1. Initial Setup

- Clone the repository:

  git clone \<repository_url>

- Check current status:

  git status

- Always work on a feature branch (don’t commit directly to main or develop):

  git checkout -b feature/<feature-name>

Example:

git checkout -b feature/login-form

🎯 2. Work on Your Feature Branch

- Add or modify files

- Check status:

  git status

- Stage changes:

  git add <file>
  or all: git add .

- Commit:

  git commit -m "Short, clear summary of the feature"

💡 Tip: Keep commits small, focused, and descriptive.

🔄 3. Sync With main (To Stay Up-to-Date)

Before pushing or creating a Pull Request (PR), sync your branch with the latest main:

a. Fetch changes:

git fetch origin

b. Merge (safe) or Rebase (clean history):

git merge origin/main
or
git rebase origin/main

If you use rebase, then:

git push --force-with-lease

📦 4. Push to Remote

Push your feature branch to origin:

git push origin feature/<feature-name>

📝 5. Create Pull Request (PR)

- Open GitHub/GitLab
- Create PR: feature/<name> → main (or develop)
- Request review

📌 Tip:

- Describe what your PR does
- Link to issues or tasks if applicable

🧪 6. Review & Fixes

- If feedback is given:

  - Make changes
  - Then:

    git add .
    git commit --amend or new commit
    git push --force-with-lease

✅ 7. Merge PR & Clean Up

- After approval, merge the PR
- Delete branch:

  git branch -d feature/<name>
  git push origin --delete feature/<name>

🧨 8. Handling Pull Request Conflicts

If your PR shows “This branch has conflicts,” resolve it like this:

a. Checkout your feature branch:

git checkout feature/<name>

b. Sync with main:

git fetch origin
git rebase origin/main

# or git merge origin/main

c. Resolve conflicts manually in files marked with <<<<<<< HEAD

d. Stage resolved files:

git add <file>

e. Continue:

git rebase --continue

# or git commit (if merged)

f. Push changes:

git push --force-with-lease (if rebase)
git push (if merge)

g. Go back to PR: Conflict should be resolved.

📌 Team Best Practices

| Rule                           | Explanation                                                   |
| ------------------------------ | ------------------------------------------------------------- |
| Always create a feature branch | Avoid conflicts when collaborating                            |
| Never commit directly to main  | Keep main clean for deploy/release                            |
| Pull regularly                 | Prevent future merge conflicts                                |
| Write clear commit messages    | Helps with readability, debugging, and reviewing              |
| Rebase carefully after push    | Use push --force-with-lease to avoid deleting others’ commits |
| One feature = One pull request | Easier to test, review, and roll back if needed               |
