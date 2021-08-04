#!/bin/bash

# Run siege on the local instance with 32 simultaneous requests
siege  --no-parser -c 32 -T 'application/json' 'http://127.0.0.1:8080/batch POST < siege-body.json'
