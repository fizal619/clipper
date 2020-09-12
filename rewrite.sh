#!/bin/bash

TIME=$(date +%s)

for f in lib.js main.css main.js
do
  echo "Processing $f"
  cp "public/$f" "public/$f-$TIME"
  sed -i.bak "s/$f/$f-$TIME/" public/index.html

done