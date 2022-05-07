#!/bin/bash
eval `ssh-agent`
cd /home/poli-link/poli-link-api
sudo git pull origin main
sudo docker compose up -d
echo "success"