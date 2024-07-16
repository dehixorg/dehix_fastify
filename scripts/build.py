import os
import shutil
from datetime import datetime

current_time = datetime.now().strftime("%d-%m-%Y-%H-%M")
print(f"current_time: {current_time}")

cwd = os.getcwd()
dist_dir = cwd+"/dist"
archive_dir = cwd+f"/zip/build-{current_time}"
archive_file = archive_dir + ".zip"

print("cwd: " + cwd)
print("dist_dir: " + dist_dir)
print("archive_dir: " + archive_dir)
print("archive_file: " + archive_file)

print("Current Node Version Is: ")
os.system("node -v")

print(f"Installing 'node_modules' In '{cwd}' Directory...")
os.system("npm install")

print("Generating Build...")
os.system("npm run build")

print(f"Copying 'eb/package.json' Files Into '{dist_dir}' Directory.")
shutil.copy("./eb/package.json", dist_dir)

print(f"Copying 'eb/package-lock.json' Files Into '{dist_dir}' Directory.")
shutil.copy("./eb/package-lock.json", dist_dir)

os.chdir(dist_dir)

# print(f"Renaming '{dist_dir}/lambda.js' To '{dist_dir}/app.js'...")
# os.rename("./lambda.js", "./app.js")

print(f"Installing 'node_modules' In '{dist_dir}' Directory...")
os.system("npm install")

print(f"Generating Archive In '{cwd}' Directory...")
shutil.make_archive(archive_dir, "zip", ".")

print(f"Removing '{dist_dir}' Directory...")
shutil.rmtree(dist_dir)

print(f"Re-creating '{dist_dir}' Directory...")
os.mkdir(dist_dir)

print(f"Moving '{archive_file}' Into '{dist_dir}' Directory...")
shutil.move(archive_file, dist_dir)

print(f"Please Find Archive In '{dist_dir}'. Also, Rename It Using Latest <GIT-TAG>, Pattern - <GIT-TAG>.zip")