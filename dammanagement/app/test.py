
import requests
import json


domine = 'http://localhost:3000/api'

def apirequest( method, path, body, params, headers):
    parameters =None
    if params!="":
        parameters = params
    if path!="":
        url = domine+path
    else:
        return {"msg":"invalid path" ,"Description":"Invalid domine path sent"}
    print("Path: " + url)

    if method == "POST":       
        try:
            response = requests.post(url,data=json.dumps(body),headers={'Content-Type': 'application/json'})
        except requests.exceptions.HTTPError as error:
            response=error
    elif method == "GET":
        try:
            response = requests.get(url, params=parameters,headers={'Content-Type': 'application/json'})
        except requests.exceptions.HTTPError as error:
            response=error
    elif method == "DELETE":
        try:
            response = requests.delete(url)
        except requests.exceptions.HTTPError as error:
            response=error
    elif method == "PATCH":
        try:
            response = requests.patch(url,data=json.dumps(body),headers={'Content-Type': 'application/json'})
        except requests.exceptions.HTTPError as error:
            response=error
    else:
        return {"msg":"invalid method" ,"Description":"Method not supported","Status Code":405}
    print("return_response")
    print(response.json())
    return response.json()


