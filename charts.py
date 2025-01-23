from flask import Flask
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading
import time
import files

app = Flask(__name__)
questions = {
    "Q1": "Program",
    "Q2": "Level",
    "Q3": "Status",
    "Q4": "Experience Satisfaction",
    "Q5": "Personal Growth",
    "Q6": "Challenges",
    "Q7": "Improvements",
    "Q8": "Academic and Personal Goals",
    "Q10": "Teaching and Learning Satisfaction",
    "Q11": "Other Facilities Satisfaction",
}
# Cached charts
cached_charts = []

def plot_pie_charts():
    global cached_charts
    data = pd.read_csv(files.RESPONSES_FILE, encoding='ISO-8859-1')
    charts = []

    for column in data.columns:
        if column not in ["Q9", "Q12"]:
            separated_list = []

            if column in ["Q3", "Q5", "Q6"]:
                for response in data[column].dropna():
                    separated_list.extend(response.split(", "))
                response_counts = pd.Series(separated_list).value_counts()
            else:
                response_counts = data[column].value_counts()

            sorted_responses = response_counts.sort_index()

            fig, ax = plt.subplots(figsize=(7, 6))
            plt.subplots_adjust(left=-0.1, right=0.9, top=0.9, bottom=0, hspace=0.4)

            sorted_responses.plot.pie(
                autopct='%1.1f%%',
                startangle=90,
                textprops={'fontsize': 10},
                colors=plt.cm.Paired.colors,
                ax=ax,
                labels=None,
            )

            ax.legend(
                sorted_responses.index,
                loc="upper left",
                bbox_to_anchor=(0.85, 1),
                fontsize=10,
            )

            plt.title(f"{questions[column]}", loc="left", fontsize=12, fontweight="bold")
            plt.ylabel("")
            plt.xlabel("")

            buffer = io.BytesIO()
            plt.savefig(buffer, format="png")
            buffer.seek(0)

            img_base64 = base64.b64encode(buffer.read()).decode("utf-8")
            buffer.close()
            plt.close(fig)

            charts.append({"column": column, "image": img_base64})
    cached_charts = charts
    # print(charts)
    return charts

# Endpoint to serve the charts

# def get_charts():
#     plot_pie_charts()
#     return jsonify(cached_charts)


# File Watcher
class FileWatcher(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path == files.RESPONSES_FILE:
            print("CSV file updated, regenerating charts...")
            plot_pie_charts()

def start_watcher():
    event_handler = FileWatcher()
    observer = Observer()
    observer.schedule(event_handler, path=files.RESPONSES_FILE, recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

# Start the file watcher in a separate thread
threading.Thread(target=start_watcher, daemon=True).start()


# if __name__ == "__main__":
#     plot_pie_charts()  # Initial chart generation
#     app.run(debug=True)






            # Adjust layout to prevent clipping of the legend
            # plt.tight_layout()

#             # Show the chart (or save it, if necessary)
#             plt.show()

# # Call the function to plot the pie charts
# plot_pie_charts()