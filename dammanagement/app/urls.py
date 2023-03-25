from django.urls import path
from app import views

urlpatterns = [
    path('main', views.app, name='app'),
    path('logout', views.logout, name="logout"),
    path("dashboard", views.dashboard, name="dashboard"),
    path("",views.home,name="home"),
    path('equipementdata',views.equipementdata, name="equipementdata"),
    path('admindashboard',views.admindashboard, name="admindashboard")
]