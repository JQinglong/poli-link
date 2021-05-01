from django.contrib import admin
from .models import Memo
from .models import Ministry
from .models import Council
from .models import Person

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
