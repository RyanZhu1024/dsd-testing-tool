from flask import Flask
import psutil
import requests

app = Flask(__name__)


@app.route('/kill-process')
def kill_process():
    kill_a_process()
    return "success";


def kill_a_process():
    r = requests.get("http://localhost:8080/api/pid")
    pid = r.json()
    proc = psutil.Process(pid)
    proc.kill()


if __name__ == "__main__":
    app.run()