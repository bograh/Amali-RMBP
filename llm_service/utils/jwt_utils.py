from functools import wraps
from flask import request
import jwt
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv('JWT_SECRET')

def verify_jwt(token):
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return {'msg': 'Missing Authorization Header'}, 401
        
        token = auth_header[7:]
        decoded = verify_jwt(token)
        if decoded is None:
            return {'msg': 'Invalid or expired token'}, 401
        
        return f(*args, **kwargs)

    return decorated_function
