import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { QsDashboardComponent } from './qs-dashboard/qs-dashboard.component';

const routes: Routes = [
  { path: 'quicksight', component: QsDashboardComponent },
  { path: 'cognito', component: CameraComponent },
  { path: 'rekognition', component: CameraComponent }
  
];
// { path: '', redirectTo: 'https://8lxhh32jv7.execute-api.us-east-1.amazonaws.com/test/embed-sample#', pathMatch: 'full'}
// { path: '',   redirectTo: '/qs-demos', pathMatch: 'full' }
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  

}
