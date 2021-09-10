#!/bin/bash

echo "Start watching \"src\" directory"

while inotifywait -r -e close_write "src"
do
  echo "build_es5"
  make build_es5
done
