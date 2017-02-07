from flask import Flask
from flask import request
import psutil
import requests

app = Flask(__name__)


@app.route('/kill-process')
def kill_process():
    pid = request.args.get('pid')
    kill_status = kill_a_process(pid)
    if kill_status:
        return "success"
    return "Failed"


def kill_a_process(pid):
    print(pid)
    if pid is not None:
        proc = psutil.Process(int(pid))
        proc.kill()
        return True
    return False


def send_self_info():
    r = requests.get("http://localhost:4000/api/v1/py-info", {"port": 5000})
    print(r)

if __name__ == "__main__":
    send_self_info()
    app.run()
