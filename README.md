# SaLaunchUi
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Quicksight on local machine
https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/embed-an-amazon-quicksight-dashboard-in-a-local-angular-application.html

ng serve --host my-qs-app.net --port 4200 --ssl --ssl-key "./src/my-qs-app.net-key+1.pem" --ssl-cert "./src/my-qs-app.net+1.pem" -o

## When deploying on ec2 service
zip the files in dist folder
mv it to AWS_CREDS
sh scp_copy_to_ec2.txt
login to ec2 server
switch to root
sudo su -
cd /tmp
unzip sa-launch-ui.zip
chmod 777 sa-launch-ui
rm -rf /usr/local/tomcat9/webapps/sa-launch-ui
cp -r sa-launch-ui /usr/local/tomcat9/webapps/
service tomcat restart


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

ng build --configuration production --base-href /sa-launch-ui/

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

