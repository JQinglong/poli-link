from django.db import models
import uuid

class Memo(models.Model):
    title = models.CharField(max_length=64)
    memo = models.TextField(max_length=1024)

class Ministry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    name_e = models.CharField(max_length=128)
    abbreviation = models.CharField(max_length=64)
    url = models.CharField(max_length=256)
    def __str__(self):
        return self.name
class Council(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    url = models.CharField(max_length=256)
    description = models.TextField()
    ministry = models.ForeignKey(Ministry, on_delete=models.PROTECT)
    def __str__(self):
        return self.name