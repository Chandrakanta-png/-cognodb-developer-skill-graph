"""
Custom middleware for handling AWS Elastic Beanstalk load balancer requests.
"""
import re
from django.conf import settings


class AllowInternalIPsMiddleware:
    """
    Allows requests from internal AWS IPs when running on Elastic Beanstalk.
    This middleware patches the request.META to use the X-Forwarded-Host header
    if present, which is set by the ELB.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
        self.internal_ip_pattern = re.compile(r'^(172\.31\.|10\.|192\.168\.)')
    
    def __call__(self, request):
        # If X-Forwarded-Host header is present (from load balancer), use it
        if 'HTTP_X_FORWARDED_HOST' in request.META:
            request.META['HTTP_HOST'] = request.META['HTTP_X_FORWARDED_HOST']
        
        # Also check for X-Forwarded-Proto (to determine if HTTPS)
        if 'HTTP_X_FORWARDED_PROTO' in request.META:
            if request.META['HTTP_X_FORWARDED_PROTO'] == 'https':
                request.environ['wsgi.url_scheme'] = 'https'
        
        response = self.get_response(request)
        return response
