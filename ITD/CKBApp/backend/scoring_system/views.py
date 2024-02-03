from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class EvaluateCodeView(APIView):
    def post(self, request):
        # Get the repository and user from the payload
        repository = request.data.get('repository')
        user = request.data.get('user')

        # Check if the repository and user are valid
        if repository != 'your-repository' or user != 'your-user':
            return Response({"error": "Invalid repository or user."}, status=status.HTTP_403_FORBIDDEN)

        # If the repository and user are valid, continue with the code evaluation
        # ...

        return Response({"message": "Code evaluation triggered successfully."}, status=status.HTTP_200_OK)
