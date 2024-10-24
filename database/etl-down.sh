#!/bin/bash

stop=$1

for i in $(seq 1 "$stop")
do
  npm run etl:down
done