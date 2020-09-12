#!/bin/bash

TIME=$(date +%s)

for f in lib.js main.css main.js
do
  echo "Processing $f"
  cp "public/$f" "public/$TIME-$f"
  sed -i.bak "s/$f/$TIME-$f/" public/index.html

done