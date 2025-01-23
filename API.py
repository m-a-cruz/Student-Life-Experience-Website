
import initialization, validation, data_gathering, charts
from flask import Flask, jsonify
from flask_cors import CORS
import pandas  as pd
import charts

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

initialization.initialize_responses_file()
# Compilation of the API
@app.route('/fetch-data', methods=['GET'])
def fetch_data():
    return validation.fetch_data()

@app.route('/save-data', methods=['POST'])
def save_data():
    return data_gathering.save_data()

@app.route('/update-data', methods=['PUT'])
def update_data():
    return data_gathering.update_data()

# @app.route('/charts-info', methods=['GET'])
# def charts_info():
#     return charts.collect_response_counts(pd.read_csv(files.RESPONSES_FILE))

@app.route('/get-chart', methods=['GET'])
def get_chart():
    return jsonify({"charts": charts.cached_charts})


if __name__ == '__main__':
    charts.plot_pie_charts() 
    app.run(debug=True, threaded=False)