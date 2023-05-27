import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  stream: any = null;
  status: any = 'N/A';
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';
  btnLabel2: string = 'Toggle cam';
  @Output() newItemEvent = new EventEmitter<any>();
  @ViewChild(WebcamComponent) webcam!: WebcamComponent;
  public showCam = true;
  base64_img: any = ''
  face_name = 'New Customer'
  lamur = 'https://xk33vnd9z3.execute-api.us-east-1.amazonaws.com/dev/rekog'

  index_face = false;

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  ngOnInit(): void {
      
  }

  constructor(private http: HttpClient) {

  }

  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    this.base64_img = this.previewImage.split(',')[1]
    this.invokeRekog(this.base64_img)
    // call reKognition
    this.btnLabel = 'Re capture image'
  }

  invokeRekog(img_enc: {}) {
    let payload = {};
    if (this.index_face) {
        payload = {'store_face_img' : img_enc, 'face_name': this.face_name}
        this.index_face = false;
    } else {
      payload = {'img_encoded' : img_enc}
    }
    return this.http.post<any>(this.lamur, payload).subscribe(
      {
        next: data => {
          console.log(data)
          if (data['body']) {
            const body = JSON.parse(data['body'])
            if (body['face_name'] != '') {
              const dat = {"age_range": body['age_range'],
               "gender": body['gender'],
               "sunglasses": body['sunglasses'],
               "face_name": body['face_name'],
               "audio": body['url'],
               "labels": body['labels']
              }
              this.newItemEvent.emit(dat);
            }
          }
        },
        error: error => {
          console.log(error)
        }
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  captureImage() {
    this.index_face = false
    this.newItemEvent.emit('');
    this.trigger.next();
  }

  storeFace() {
    this.index_face = true
    this.newItemEvent.emit('');
    this.trigger.next();
  }

  toggleCam() {
    // Known Bug : Cannot get a hook on shutdown camera...wont fix for mvp
    this.showCam = !this.showCam
  }

  proceed() {
    console.log(this.previewImage);
  }

}
