from django.contrib.auth.models import User
from rest_framework import serializers   #we need this to convert data fromand to JSON Format

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}} #for safety reasons 

    def create(self, validated_data): #creation of new user
        user = User.objects.create_user(**validated_data)
        return user

