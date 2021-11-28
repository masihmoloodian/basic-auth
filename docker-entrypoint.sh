#!/bin/bash

source .env

POSTGRES="${POSTGRES_HOST}:${POSTGRES_PORT}"
echo "Wait for POSTGRES=${POSTGRES}"

wait-for-it ${POSTGRES}

npm run start:dev