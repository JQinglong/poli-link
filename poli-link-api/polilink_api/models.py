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

class Person(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    name_kana = models.CharField(max_length=64)
    name_e = models.CharField(max_length=64, blank=True, null=True)
    url_official = models.CharField(max_length=256, blank=True, null=True)
    url_wikipedia = models.CharField(max_length=256, blank=True, null=True)
    url_twitter = models.CharField(max_length=256, blank=True, null=True)
    url_facebook = models.CharField(max_length=256, blank=True, null=True)
    url_youtube = models.CharField(max_length=256, blank=True, null=True)
    career_summary = models.TextField()
    def __str__(self):
        return self.name

class CouncilMember(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    council = models.ForeignKey(Council, on_delete=models.PROTECT)
    name = models.CharField(max_length=64)
    occupation = models.CharField(max_length=256, blank=True, null=True)
    position = models.CharField(max_length=256, blank=True, null=True)
    person = models.ForeignKey(Person, on_delete=models.SET_NULL, blank=True, null=True)
    def __str__(self):
        return self.name

class CouncilMeeting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    council = models.ForeignKey(Council, on_delete=models.PROTECT)
    name = models.CharField(max_length=64)
    place = models.CharField(max_length=256, blank=True, null=True)
    order = models.IntegerField()
    meeting_date = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.name

class MeetingSpeech(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    council = models.ForeignKey(Council, on_delete=models.PROTECT)
    council_meeting = models.ForeignKey(CouncilMeeting, on_delete=models.PROTECT)
    order = models.IntegerField()
    speaker = models.CharField(max_length=64)
    person = models.ForeignKey(Person, on_delete=models.SET_NULL, blank=True, null=True)
    speech = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    def __str__(self):
        return f'{self.council} {self.council_meeting} {self.order} {self.speaker}'
