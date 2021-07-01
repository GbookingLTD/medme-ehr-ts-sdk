#!/bin/bash

CURDIR=$(readlink -f `dirname "$0"`)
now=$(date --iso-8601=seconds)
sign=$(cat "$CURDIR/user999_ehr_user_sign.txt")

# echo 'CREATE UNIQUE INDEX IF NOT EXISTS "UserIDMap_PublicId_uniq" ON "UserIDMap" ("PublicId")' | sqlite3 $1

# UPSERT trick for sqlite3 version less than 3.24
# https://stackoverflow.com/questions/15277373/sqlite-upsert-update-or-insert
echo "update UserIDMap SET Created=\"$now\", InternalId=\"709\", UserSign=\"$sign\" where PublicId=\"user999\"" | sqlite3 $1
echo "insert or ignore into UserIDMap (Created, PublicId, InternalId, UserSign) VALUES (\"$now\", \"user999\", \"709\", \"$sign\")" | sqlite3 $1
