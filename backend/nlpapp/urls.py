from django.urls import path
from .views import sign_in, sign_out, sign_up

urlpatterns = [
    path('api/signin/', sign_in, name='sign_in'),
    path('api/signout/', sign_out, name='sign_out'),
    path('api/signup/', sign_up, name='sign_up'),

]