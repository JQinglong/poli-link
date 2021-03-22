from django.contrib import admin
from .models import Memo

@admin.register(Memo)
class MemoAdmin(admin.ModelAdmin):
    pass
