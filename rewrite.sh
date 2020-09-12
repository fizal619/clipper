#!/bin/bash

TIME=$(date +%s)

for f in lib.js main.css main.js
do
  echo "Processing $f"
  mv "public/$f" "public/$f\_$TIME"
  sed -i "s,public/$f,public/$f\_$TIME," public/index.html

done