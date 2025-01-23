from flask import Flask, request, jsonify
import csv
from flask_cors import CORS
import files

def fetch_data():
    try:
        with open(files.MASTERLIST_FILE, mode="r") as file:
            reader = csv.DictReader(file)
            data = [row for row in reader]  # Convert rows to a list of dictionaries
        return jsonify(data), 200
    except FileNotFoundError:
        return jsonify({"error": "Masterlist file not found"}), 404
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    
