import { Component, ViewChild } from '@angular/core';
import { CameraComponent } from './camera/camera.component';
import { Auth, Amplify } from 'aws-amplify';
import awsconfig from './../aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AWS Demos ';
  user = ''
  labels: any = [];
  total_spend = 0;
  is_new_user = false;
  showAds = false;
  showAds2 = false;
  is_male = false;

  @ViewChild(CameraComponent) cam!: CameraComponent;
  @ViewChild('myAudio') audio!: HTMLAudioElement;
  customlabels:any= [];

  constructor() {

  }

  ngOnInit(): void {
    Amplify.configure(awsconfig);
    Auth.configure(awsconfig);
  }

  signOut(): void {
    Auth.signOut();
  }

  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  got_a_face($event: any) {
    this.user = $event['face_name'];
    this.showAds = false;
    this.showAds2 = false;
    this.labels = []
    this.customlabels = []
    if ($event['age_range']) {
      const age_range = $event['age_range']
      this.labels.push('Age Range ('+ age_range + ')');
      this.labels.push('Gender -' + $event['gender']['Value']);
      if ($event['gender']['Value'] == 'Male') {
        this.is_male = true;
      } else {
        this.is_male = false;
      }
      this.total_spend = this.randomIntFromInterval(5000, 20000);
      let labels = $event['labels']
      labels.forEach((la: any) => {
        this.customlabels.push(la);
      });
    } 
    if (this.user && this.user != '') {
      this.is_new_user = false;
      let audio = new Audio();
      audio.src = $event['audio']
      //audio.src = "../../../assets/HelloFraser.mp3";
      audio.load();
      audio.play();
      setTimeout(() => {
        this.showAds = !this.is_new_user && this.labels.length > 0
        if (this.showAds && this.is_male) {
          this.showAds2 = false; 
        } else if (this.showAds && !this.is_male) {
          this.showAds2 = true;
          this.showAds = false
        }
      }, 15000);
      
    } else {
      this.is_new_user = true;
    }
  }
    

}
