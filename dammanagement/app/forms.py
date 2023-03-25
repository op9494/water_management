from django import forms
from django.forms import TextInput, EmailInput
from app.others.apirequest import apirequest



class loginForm(forms.Form):
    aadarnumber = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': 'Aadarnumber', 'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'password', 'class': 'form-control'}))

class adminloginForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'email', 'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'password', 'class': 'form-control'}))

class AddwaterresourceForm(forms.Form):
    villagename = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Name', 'class': 'form-control'}))
    location = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'address', 'class': 'form-control'}))
    capacity = forms.IntegerField()
    height = forms.IntegerField()
    
class registerForm(forms.Form):
    name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Name', 'class': 'form-control'}))
    aadarnumber = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': 'Aadarnumber', 'class': 'form-control'}))
    phonenumber = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': 'Phonenumer', 'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'password', 'class': 'form-control'}))


class AddwaterrequirementForm(forms.Form):
    villagename = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Village Name', 'class': 'form-control'}))
    Area = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'vehicleNo', 'class': 'form-control'}))
    damsource = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'damsource', 'class': 'form-control'}))
    stackedwater = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': 'Stackedwater', 'class': 'form-control'}))
    cropsdetails = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'cropsdetails', 'class': 'form-control'}))
