from rest_framework import serializers
from .models import Memo
from .models import Ministry
from .models import Council
from .models import Person
from .models import CouncilMember

class MemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memo
        fields = '__all__'

class MinistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ministry
        fields = '__all__'

class CouncilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Council
        fields = '__all__'

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class CouncilMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CouncilMember
        fields = '__all__'
