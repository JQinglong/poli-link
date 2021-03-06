from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer
from .models import Memo
from .models import Ministry
from .models import Council
from .models import Person
from .models import CouncilMember
from .models import CouncilMeeting
from .models import MeetingSpeech
from .models import CouncilTree
from .models import CouncilNews

class MemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memo
        fields = '__all__'

class MinistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ministry
        fields = '__all__'

class CouncilNewsSerializer(WritableNestedModelSerializer):
    # council = CouncilSerializer()
    class Meta:
        model = CouncilNews
        fields = '__all__'

class CouncilSerializer(WritableNestedModelSerializer):
    ministry = MinistrySerializer()
    news = CouncilNewsSerializer(many=True, read_only=True)
    class Meta:
        model = Council
        fields = '__all__'

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class CouncilMemberSerializer(WritableNestedModelSerializer):
    council = CouncilSerializer()
    class Meta:
        model = CouncilMember
        fields = '__all__'

class CouncilMeetingSerializer(WritableNestedModelSerializer):
    council = CouncilSerializer()
    class Meta:
        model = CouncilMeeting
        fields = '__all__'

class MeetingSpeechSerializer(WritableNestedModelSerializer):
    council = CouncilSerializer()
    council_meeting = CouncilMeetingSerializer()
    class Meta:
        model = MeetingSpeech
        fields = '__all__'

class CouncilTreeSerializer(WritableNestedModelSerializer):
    council = CouncilSerializer()
    parent = CouncilSerializer()
    class Meta:
        model = CouncilTree
        fields = '__all__'
