from django.contrib import admin
from .models import Memo
from .models import Ministry
from .models import Council
from .models import Person
from .models import CouncilMember
from .models import CouncilMeeting
from .models import MeetingSpeech
from .models import CouncilTree
from .models import CouncilNews

@admin.register(Memo)
class MemoAdmin(admin.ModelAdmin):
    pass

@admin.register(Ministry)
class MinistryAdmin(admin.ModelAdmin):
    pass

@admin.register(Council)
class CouncilAdmin(admin.ModelAdmin):
    pass

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    pass

@admin.register(CouncilMember)
class CouncilMemberAdmin(admin.ModelAdmin):
    pass

@admin.register(CouncilMeeting)
class CouncilMeetingAdmin(admin.ModelAdmin):
    pass

@admin.register(MeetingSpeech)
class MeetingSpeechAdmin(admin.ModelAdmin):
    pass

@admin.register(CouncilTree)
class CouncilTreeAdmin(admin.ModelAdmin):
    pass

@admin.register(CouncilNews)
class CouncilNewsAdmin(admin.ModelAdmin):
    pass
