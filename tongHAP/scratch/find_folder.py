import os

def find_folder(start_path, target_name):
    for root, dirs, files in os.walk(start_path):
        for d in dirs:
            if target_name in d:
                print(os.path.join(root, d))

print("Searching in C:\\Users\\note...")
find_folder("C:\\Users\\note", "교리학습")
print("Searching in D:...")
find_folder("D:\\", "교리학습")
