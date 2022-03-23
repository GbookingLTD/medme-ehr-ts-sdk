#!/bin/bash

echo "Start watching \"src\" directory"

make build_es5

while inotifywait -r -e close_write "src"
do
  echo "build_es5"
  make build_es5
done
