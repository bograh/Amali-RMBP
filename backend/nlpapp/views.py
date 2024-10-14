from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import validate_email
from rest_framework.response import Response
import requests
import json


@api_view(['POST'])
def sign_up(request):
    try:
        username = request.data.get('username').replace(" ", "").replace("@", "")
        email = request.data.get('email')
        password = request.data.get('password')
        password_confirm = request.data.get('password_confirm')
        if "@" in email:
            validate_email(email)
        else:
            return JsonResponse({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)

        if not username:
            return JsonResponse({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not password:
            return JsonResponse({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(password)<8:
            return JsonResponse({'error': 'Password is weak'}, status=status.HTTP_400_BAD_REQUEST)
        
        if password != password_confirm:
            return JsonResponse({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already taken'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(password)
        except ValidationError as e:
            return JsonResponse({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username, email=email, password=password)
        
        return JsonResponse({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

    except:
        return Response({
            'error': 'An unexpected error occurred. Please check your email format.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)







@api_view(['POST'])
def sign_in(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Sign in successful'
        }, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def sign_out(request):
    logout(request)
    return JsonResponse({'message': 'Sign out successful'}, status=status.HTTP_200_OK)

