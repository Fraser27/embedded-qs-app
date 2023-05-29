# QS Embedded Front End
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Quicksight on local machine
* https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/embed-an-amazon-quicksight-dashboard-in-a-local-angular-application.html
* **Dont forget to whitelist this domain on Quicksight**
ng serve --host my-qs-app.net --port 4200 --ssl --ssl-key "./src/my-qs-app.net-key+1.pem" --ssl-cert "./src/my-qs-app.net+1.pem" -o

## Build Code

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

ng build --configuration production --base-href /sa-launch-ui/

## Features
1. Embedded QS Dashboard
2. Tag based RLS support
3. Parameters passing from Frontend to QS
