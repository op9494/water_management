
# to Setup the project do the 
```sh
$ django-admin startproject main
$ cd dammanagement/
$ py manage.py startapp user
$ py manage.py startapp admin
$ py manage.py startapp auth
$ py manage.py makemigrations app
$ py manage.py migrate app
```
### To activate the virtualenv use the following command

```py
$ Source py_env\Scripts\activate
```


### To install the packages, run the following command 

make sure you are in the dammanagement app django main directory

```sh
pip install -r requirements.txt
```

### To start the app

```shell
$ py manage.py runserver
```


# API request
To make the API request use following function:

apirequest(method, path, body, params, headers)
- *method= PATCH || POST || GET || DELETE
- *path= path (i.e api/login)
- params= params (optional Json object)
- body= body (optional Json object)
- headers= headers (optional type json object)