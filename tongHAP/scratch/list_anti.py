import os

def list_all(start_path):
    for root, dirs, files in os.walk(start_path):
        print(f"Directory: {root}")
        for d in dirs:
            print(f"  [DIR] {d}")
        for f in files:
            print(f"  [FILE] {f}")

list_all("D:\\OneDrive\\Anti")
