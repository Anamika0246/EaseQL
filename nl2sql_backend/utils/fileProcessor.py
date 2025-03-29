import pandas as pd
import json
import fitz  # PyMuPDF
import sys

def convert_to_csv(file_path, output_path):
    ext = file_path.split(".")[-1].lower()
    
    if ext == "csv":
        return file_path  # Already CSV
    elif ext == "json":
        with open(file_path, "r") as f:
            data = json.load(f)
        df = pd.DataFrame(data)
    elif ext == "txt":
        with open(file_path, "r") as f:
            lines = f.readlines()
        df = pd.DataFrame({"text": lines})
    elif ext == "pdf":
        text = []
        doc = fitz.open(file_path)
        for page in doc:
            text.append(page.get_text())
        df = pd.DataFrame({"text": text})
    else:
        raise ValueError("Unsupported file type")

    df.to_csv(output_path, index=False)
    print(output_path)

if __name__ == "__main__":
    convert_to_csv(sys.argv[1], sys.argv[2])
