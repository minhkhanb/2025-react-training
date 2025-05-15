Git Workflow cơ bản

git clone <link repo>: Clone 1 repo về local

git pull: kéo code từ repo về local

git add (<file name> hoặc . "Tất cả các file"): Lưu những thay đổi vào staging

git commit -m 'Tên commit': Commit các thay đổi

git push: Đẩy code lên repo


***** Làm việc với nhánh

git branch: xem nhánh

git branch <branch name>: tạo nhánh mới

git checkout <branch name>: di chuyển đến nhánh <branch name>

git checkout -b <branch name>: di chuyển đến nhánh <branch name>, nếu nhánh đó ko tồn tại => sẽ tạo 1 nhánh mới

git merge <branch name>: merge nhánh <branch name> và nhánh hiện tại (chỉ lưu lại commit mới nhất của <branch name> vào nhánh hiện tại)

git rebase <branch name>: merge nhánh <branch name> và nhánh hiện tại (lưu lại tất cả commit <branch name> vào nhánh hiện tại)

