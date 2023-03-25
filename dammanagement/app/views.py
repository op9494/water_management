from django.shortcuts import render,redirect
from app.forms import loginForm,registerForm,adminloginForm,AddwaterrequirementForm,AddwaterresourceForm
from django.http import JsonResponse
import requests
import json
import datetime
from django.contrib.messages import constants as messages
from app.others.apirequest import apirequest
from django.contrib import messages
from django import template
from django.template.defaultfilters import stringfilter
register = template.Library()
#  messages.debug(request, '2 SQL statements were executed.' )
#     messages.info(request, 'Three credits remain in your account.')
#     messages.success(request, 'Profile details updated.')
#     messages.warning(request, 'Your account expires in three days.')
#     messages.error(request, 'Document deleted.')
# Create your views here.
user_login_form= loginForm(auto_id="user_login_%s")
user_registeration_form= registerForm(auto_id="user_registeration_%s")
admin_login_form= adminloginForm(auto_id="admin_login_%s")
def app(request):
    appconfig=apirequest("GET","/getappconfig/testapp","","","")
    if appconfig["status"]=="Success":
        
        if request.method == 'POST':
            lform = loginForm(request.POST)
            rform = registerForm(request.POST)
            alform= adminloginForm(request.POST)
            print("request",request.POST)
            if 'register' in request.POST:
                if rform.is_valid() :
                    data=rform.cleaned_data
                    response=apirequest("POST", "/register",data,"","")
                    print(response["status"])
                    if response["status"]=="Success":
                        print("Register Data",response["message"])
                        msg=response["message"]
                        messages.success(request, msg)
                        return render(request, 'index.html', {'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form,'msg':msg,"action":"login"})
                    else :
                        msg=response["message"]
                        messages.error(request, msg)
                        return render(request, 'index.html', {'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form,'msg':msg,"action":"register"})
                        #return JsonResponse({"status":response["status"],"Data": response['data']})
                elif rform.errors :
                    data=rform.errors.as_json()
                    messages.warning(request, data)
                    return render(request, 'index.html', {'loginform': user_login_form,"adminloginform":admin_login_form,"and 'addequipment' in request.POST":user_registeration_form,'msg':data,"action":"register"})
            elif 'user_login' in request.POST:
                if lform.is_valid():
            
                    data=lform.cleaned_data
                
                    response=apirequest("POST", "/login",data,"","")
                    print("desda",response)
                    
                    if response["status"]=="Success" and response['data']:
                        request.session["CS"]=response["data"]
                        print("session data",request.session["CS"])
                        return redirect("/dashboard")
                        #return JsonResponse({"status":response["status"],"Data": response['data']})
                    else:
                        print("Error: " , response);
                        msg=response["message"]
                        messages.error(request, msg)
                        return render(request, 'index.html', {'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form,'msg': response['message'],"action":"login"})
                elif lform.errors:
                    data=lform.errors.as_json()
                    messages.warning(request, data)
                    return render(request, 'index.html', {'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form,"action":"login"})
            elif "admin_login" in request.POST:
                    
                if alform.is_valid():
            
                    data=alform.cleaned_data
                
                    response=apirequest("POST", "/admin/login",data,"","")
                    print("desda",response)
                    
                    if response["status"]=="Success" and response['data']:
                        request.session["CS"]=response["data"]
                        print("session data",request.session["CS"])
                        return redirect("/admindashboard")
                        #return JsonResponse({"status":response["status"],"Data": response['data']})
                    else:
                        print("Error: " , response);
                        msg=response["message"]
                        messages.error(request, msg)
                        return render(request, 'index.html', {'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form,'msg': response['message'],"action":"admin"})
                elif alform.errors :
                    data=alform.errors.as_json()
                    messages.warning(request, data)
                    return render(request, 'index.html', {'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form,"action":"admin"})
        else:
                return render(request, "index.html",{'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form})
    else :
        msg=appconfig["message"]
        messages.error(request, "Not able to access Database")    
        return render(request, "index.html",{'loginform': user_login_form,"adminloginform":admin_login_form,"registerForm":user_registeration_form})


def home(request):
    messages.info(request, "Welcome !!!")
    return render(request,"home.html")
    
def logout(request):
    print(request.session.get("CS"))
    if checksession(request,"CS"):
        del request.session['CS']
        messages.info(request, "Logout successfully!")
        return redirect("/main")
    else:
        messages.info(request, "No session found Login again!")
        return redirect("/main")

        
def equipementdata(request):
    dam_info=apirequest("GET","/getAll/equipements/","","","")
    return JsonResponse(dam_info["data"], safe=False)

def admindashboard(request):
    print(checksession(request,"CS"))
    if checksession(request,"CS"):
        profileData=request.session["CS"]
        if request.method == 'POST':    
            print("datare",'addwaterresource' in request.POST)
            addwaterresourceForm=AddwaterresourceForm (request.POST)
            addwaterrequirementForm=AddwaterrequirementForm (request.POST)
            if addwaterresourceForm.is_valid():
                data=addwaterresourceForm.cleaned_data   
                response=apirequest("POST", "/add/waterresource",data,"","")            
                if response["status"]=="Success":
                    msg=response["message"]
                    messages.success(request, msg)
                    return render(request, "admindashboard.html",{'profileData':profileData,"AddwaterresourceForm":AddwaterresourceForm(auto_id="adwres_%s"),"AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq","action":"adwres"})
                else:
                    msg=response["message"]
                    print("Error",msg)
                    messages.error(request, msg)
                    return render(request, "admindashboard.html",{'profileData':profileData,"AddwaterresourceForm":AddwaterresourceForm(auto_id="adwres_%s"),"AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq","action":"adwres"})
                    #return JsonResponse({"status":response["status"],"Data": response['data']})
            elif addwaterresourceForm.errors and 'addwaterresource' in request.POST:
                data=addwaterresourceForm.errors.as_json()
                print("eqpadd error",data)
                messages.warning(request, data)
                return render(request, "admindashboard.html",{'profileData':profileData,"AddwaterresourceForm":AddwaterresourceForm(auto_id="adwres_%s"),"AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq","action":"adwres"})
                messages.warning(request, data)

            if addwaterrequirementForm.is_valid():
                data=addwaterrequirementForm.cleaned_data   
                print("dara",data)
        
                response=apirequest("POST", "/add/waterrequirement",data,"","")            
                if response["status"]=="Success":
                    msg=response["message"]
                    messages.success(request, msg)
                    return render(request, "admindashboard.html",{'profileData':profileData,"AddwaterresourceForm":AddwaterresourceForm(auto_id="adwres_%s"),"AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq","AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq"})
                else:
                    msg=response["message"]
                    print("Error",msg)
                    messages.error(request, msg)
                    return render(request, "admindashboard.html",{'profileData':profileData,"AddwaterresourceForm":AddwaterresourceForm(auto_id="adwres_%s"),"AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq","action":"adwres"})
                    #return JsonResponse({"status":response["status"],"Data": response['data']})
            elif addwaterrequirementForm.errors and 'addwaterrequirement' in request.POST:
                data=addwaterrequirementForm.errors.as_json()
                print("eqpadd error",data)
                messages.warning(request, data)
                return render(request, "admindashboard.html",{'profileData':profileData,"AddwaterresourceForm":AddwaterresourceForm(auto_id="adwres_%s"),"AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq","action":"adwres"})
                messages.warning(request, data)
        else:
            return render(request, "admindashboard.html",{'profileData':profileData,"AddwaterresourceForm":AddwaterresourceForm(auto_id="adwres_%s"),"AddwaterrequirementForm":AddwaterrequirementForm(auto_id="adwreq_%s"),"action":"adwreq","action":"adwres"})

        
    else:
        messages.error(request, "Session not found please login")
        return redirect("/admindashboard")



def dashboard(request):

    profileData=request.session["CS"]
    print("fasddfa",profileData)
    dam_details=apirequest("GET","/getAll/damdetails","","","")
    waterresouces_details=apirequest("GET","/getAll/waterresource","","","")

    if dam_details["status"]=="Success":
        dam_info=dam_details["data"]
    else:
        dam_info=False
        print("Error","No rententel Equipments found")
    
    if waterresouces_details["status"]=="Success":
        waterresouces=waterresouces_details["data"]
    else:
        waterresouces=False
        print("Error","No rententel Equipments found")
        messages.error(request, "Error","No rententel Equipments found")
    print("damdeadssdfd",dam_info)
    print("data",profileData)
    return render(request, "dashboard.html",{'dam_info':dam_info,'waterresouces':waterresouces,'profileData':profileData,"action":"renteqp"})



       
#find function to handle api request.

def handle_uploaded_file(f):
    with open('./name.txt', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def checksession(request,obj):
    if obj not in request.session:
        return False
    else:
        return True


