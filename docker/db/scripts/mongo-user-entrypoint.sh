#!/usr/bin/env bash

echo '==================**********Creating application user and db '
echo $MONGO_DB
# mongo ${MONGO_DB} \ --host localhost \ --port 27017 \ -u ${MONGO_INITDB_ROOT_USERNAME} \ -p ${MONGO_INITDB_ROOT_PASSWORD} \ --authenticationDatabase admin \ --eval "db.createUser({user: '${MONGO_USER}', pwd: '${MONGO_PASS}', roles:[{role:'readWrite', db: '${MONGO_DB}'}, {role:'dbAdmin', db: '${MONGO_DB}'}]});"
mongo $MONGO_DB \
        --host localhost \
        --port 27017 \
        -u $MONGO_INITDB_ROOT_USERNAME \
        -p $MONGO_INITDB_ROOT_PASSWORD \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '$MONGO_USER', pwd: '$MONGO_PASSWORD', roles:[{role:'dbOwner', db: '$MONGO_DB'}]});"