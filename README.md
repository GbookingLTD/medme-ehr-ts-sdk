# Javascript/typescript SDK client for MedMe EHR

## Build for development

````
    npm install -g typescript
    npm i
    make build
````

## Описание тестов



## Running tests

1. Previously install user with publicId=`user999` and internalId=1 into table UserIDMap of embedded.db database. 
Copy your UserSign to `tests/user999_ehr_user_sign.txt` without whitespaces and other symbols. You should to provide 
only one record with internalID=1 in this table.

You may also do initialize embedded.db using next command (path to embedded.db can be changed):

````bash
tests/init_embedded.sh ../cs/MedMe/EHR/RPCServer/embedded.db
````

2. Start MedMe.EHRServer using `make run` from folder of the package sources or other way.

3. Start mock Auth Server using `make auth_server_run` from root directory of Typescript SDK sources. 

4. Run tests `make test`.

## Running demo application

Copy `web_sample/lib/env-prod-template.js` to `web_sample/lib/env-prod.js` and setup your 
production ehr servers for using it in demo application.

Run demo application

````bash
    make web_sample_run
````

