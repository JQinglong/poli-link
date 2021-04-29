from rest_framework import serializers
from .models import Memo
from .models import Ministry

class MemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memo
        fields = '__all__'

class MinistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ministry
        fields = '__all__'
