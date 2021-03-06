# Generated by Django 3.2.6 on 2022-01-23 13:24

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('polilink_api', '0013_auto_20210530_0947'),
    ]

    operations = [
        migrations.CreateModel(
            name='CouncilNews',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.CharField(blank=True, max_length=256, null=True)),
                ('council', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='polilink_api.council')),
            ],
        ),
    ]
