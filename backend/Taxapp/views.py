from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from .AiAgent import generate_tips
import openai
import os

openai.api_key = os.getenv('OPENAI_API_KEY')        # Load OpenAI API key from environment variables

class CreateUserView(generics.CreateAPIView):       
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CalculateTaxesView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        try:
            income = request.data.get('income')     # Get data from the request
            expenses = request.data.get('expenses')

            if income is None or expenses is None:      # Validate inputs
                return Response({"error": "Income and expenses are required."}, status=status.HTTP_400_BAD_REQUEST)

            income = float(income)                                      #in order to avoid errors in calculations, even if we check it in the frontend
            expenses = float(expenses)
            calculated_tax = calculate_greek_tax(income, expenses)      # Calculate tax
            tips = generate_tips(calculated_tax, income, expenses)      # Generate tips from tax

            return Response({
                "calculated_tax": calculated_tax,
                "tips": tips
            })

        except ValueError:
            return Response({"error": "Invalid input. Please ensure income and expenses are numbers."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def calculate_greek_tax(income, expenses):
    taxable_income = max(0, income - expenses)

    tax_brackets = [
        (10000, 0.09),  # 9% for the first €10,000
        (20000, 0.22),  # 22% for the next €10,000 (€10,001–€20,000)
        (30000, 0.28),  # 28% for the next €10,000 (€20,001–€30,000)
        (40000, 0.36),  # 36% for the next €10,000 (€30,001–€40,000)
        (float('inf'), 0.44),  # 44% for anything above €40,000
    ]

    total_tax = 0
    lower_limit = 0

    for upper_limit, rate in tax_brackets:
        if taxable_income <= 0:
            break
        taxable_at_this_rate = min(taxable_income, upper_limit - lower_limit)
        total_tax += taxable_at_this_rate * rate
        taxable_income -= taxable_at_this_rate
        lower_limit = upper_limit

    return round(total_tax, 2)

def generate_tips_from_tax(tax, income, expenses):
    tips = generate_tips(tax, income, expenses) 
    return JsonResponse({'tips': tips})         # Return the tips as a JSON response
