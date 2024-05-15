#!/bin/bash
echo "Installing node dependencies"

npm install

exec "$@"
