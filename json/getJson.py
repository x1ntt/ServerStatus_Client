import requests as rq
import time
while True:
    r = rq.get("https://tz.cloudcpp.com/json/stats.json");
    with open ("stats.json", 'wb') as f:
        f.write(r.content);
    time.sleep(1);