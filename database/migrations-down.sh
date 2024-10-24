#!/bin/bash

stop=$1

for i in $(seq 1 "$stop")
do
  npm run migration:down
done