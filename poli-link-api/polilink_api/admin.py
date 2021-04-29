from django.contrib import admin
from .models import Memo
from .models import Ministry

@admin.register(Memo)
class MemoAdmin(admin.ModelAdmin):
    pass

@admin.register(Ministry)
class MinistryAdmin(admin.ModelAdmin):
    pass
