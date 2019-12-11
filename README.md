# Javascript/typescript SDK client for MedMe EHR

## Build for development

````
    npm install -g typescript
    npm i
    make build
````

## Running demo application

Copy `web_sample/lib/env-prod-template.js` to `web_sample/lib/env-prod.js` and setup your 
production ehr servers for using it in demo application.

Run demo application

````bash
    make web_sample_run
````

