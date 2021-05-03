# Generated by Django 2.2.12 on 2021-05-03 02:06

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('polilink_api', '0008_auto_20210502_1813'),
    ]

    operations = [
        migrations.CreateModel(
            name='MeetingSpeech',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('order', models.IntegerField()),
                ('speaker', models.CharField(max_length=64)),
                ('speech', models.TextField()),
                ('description', models.TextField()),
                ('council', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='polilink_api.Council')),
                ('council_meeting', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='polilink_api.CouncilMeeting')),
                ('person', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='polilink_api.Person')),
            ],
        ),
    ]