from flask import Flask, render_template
import datetime
import pytz
import os

app = Flask(__name__, static_folder="static", template_folder="templates")

TIMEZONE = "America/Mexico_City"

@app.route("/")
def home():
    tz = pytz.timezone(TIMEZONE)
    now = datetime.datetime.now(tz)
    # Render server-side snapshot of CDMX time
    cdmx_time = now.strftime("%Y-%m-%d %I:%M:%S %p")
    return render_template("index.html", cdmx_time=cdmx_time)

if __name__ == "__main__":
    # Use port 8080 for Replit compatibility; change as needed
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=False)
