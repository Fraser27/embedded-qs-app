import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  embedDashboard,
  embedVisual,
  embedSession,
  embedQSearchBar,
} from 'amazon-quicksight-embedding-sdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as QuicksightEmbedding from 'amazon-quicksight-embedding-sdk';
import { environment } from "../../environments/environment";
import { Auth, Amplify } from 'aws-amplify';


@Component({
  selector: 'app-qs-dashboard',
  templateUrl: './qs-dashboard.component.html',
  styleUrls: ['./qs-dashboard.component.css']
})
export class QsDashboardComponent implements OnInit {

  dashboards = [
    {'value': '158dd193-51e1-4eab-9573-ad6f6f02eac3', 'label': 'Smart Bikes'},
    {'value': '7d1a71ed-28d9-4326-a41a-00cbb503b257', 'label': 'Dark Theme(With Ads)'},
    {'value': 'afb3b11b-191e-4ce5-91e1-aefeea5c0f71', 'label': 'Maps Demo'},
    {'value': 'ab13c413-1b06-4be4-a7b4-db127e6a6293', 'label': 'Business Reviews'},
    {'value': '433fe9a8-baf0-4dee-98ee-81217f94a228', 'label': 'Web & Social Analysis'}
    

  ]

  qs_tag_rls = [
      {'value':'Ramona Ellis', 'label': 'Ramona Ellis | EMEA'},
      {'value': 'Janet Russell', 'label': 'Janet Russell | US'},
      {'value': 'Francis Sims', 'label': 'Francis Sims | US'},
      {'value': 'Franco', 'label': 'Franco | None'}
  ]

  products = [
    {'value': 'Airdopes 171 Blue', 'label': 'AirDopes 171 Blue'},
    {'value': 'Airdopes 121V2 Pink', 'label': 'Airdopes 121V2 Pink'},
    {'value': 'Airdopes 121V2 Black', 'label': 'AirDopes 121 V2 Black'}
  ]

  country_codes = [
    {'value': 'IN', 'label': 'INDIA'},
    {'value': 'IT', 'label': 'ITALY'},
    {'value': 'JP', 'label': 'Japan'},
    {'value': 'AU', 'label': 'Australia'},
    {'value': 'AT', 'label': 'Austria'},
    {'value': 'BT', 'label': 'Bhutan'},
    {'value': 'BR', 'label': 'Brazil'},
    {'value': 'US', 'label': 'United States'},
    {'value': 'GB', 'label': 'United Kingdom'},
    
  ]
  testRLS = false;
  selected_dashboard:any = {}
  selected_product: any = {}
  selected_country: any = {}
  selected_user: any = {}

  @Input() isDash = true; 

  constructor(private http: HttpClient) { }

  dashboard: any;
  showDash = false;
  showSession = false;

  ngOnInit() {
    if (this.isDash) {
      this.GetDashboardURL();
    }   
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let result = confirm("In case you want to reload data, use the controls on the dashboard. " + 
    " A hard refresh will exhaust your viewer session");
  }

  public async GetDashboardURL() {
    this.showDash = false
    const response = await this.http.get<any>(environment.apiUrl + environment.method_name +"?dash_id=" + this.selected_dashboard.value).toPromise();
    var url = ''
    if (response) {
      if ('Status' in response && response['Status'] == 200) {
        url = response['EmbedUrl']
        this.dashboards = []
        response['dashboardList'].forEach((la: any) => {
          this.dashboards.push({'value': la['dashboard_id'], 'label': la['dashboard_name']})
        });
        this.selected_dashboard = this.dashboards[0]
        this.showDash = true
        setTimeout(() => {
          this.Dashboard(url);
        }, 10);
      }
    }
  }

  async set_session_tags(event: any) {
    const response = await this.http.get<any>(environment.apiUrl + environment.method_name +"?tagValue="+event['value'] + "&dash_id="+this.selected_dashboard.value).toPromise();
    var url = ''
    if (response) {
      if ('Status' in response && response['Status'] == 200) {
        // url = response['EmbedUrl']
        url = response['EmbedUrl']
        this.Dashboard(url);
      }
    }
  }

  public Dashboard(embeddedURL: any) {
    var containerDiv:any = document.getElementById("dashboardContainer");
    var default_width = "100%"
    // if (this.selected_dashboard.label == 'Business Reviews' || this.selected_dashboard.label == 'Web & Social Analysis') {
    //   default_width = '400%'
    // }
    if (this.showDash) {
      var first = containerDiv.firstElementChild;
      while (first) {
              first.remove();
              first = containerDiv.firstElementChild;
      }
      var options = {
        url: embeddedURL,
        container: containerDiv,
        scrolling: "yes",
        height: "AutoFit",
        locale: "en-US",
        footerPaddingEnabled: true,
        printEnabled: true,
        iframeResizeOnSheetChange: false
      };
      this.dashboard = QuicksightEmbedding.embedDashboard(options);
    }
    
    //containerDiv['outerHTML'] = '<div class="qs-frame" id="dashboardContainer"></div>';
    
  }

  public Session(embeddedURL: any) {
    var containerDiv:any = document.getElementById("qssession");
    var default_width = "650%"
    if (this.selected_dashboard.label == 'Business Reviews' || this.selected_dashboard.label == 'Web & Social Analysis') {
      default_width = '400%'
    }
    if (this.showSession) {
      var first = containerDiv.firstElementChild;
      while (first) {
              first.remove();
              first = containerDiv.firstElementChild;
      }
      var options = {
        url: embeddedURL,
        container: containerDiv,
        scrolling: "yes",
        height: "AutoFit",
        locale: "en-US",
        footerPaddingEnabled: true,
        printEnabled: true,
        iframeResizeOnSheetChange: false
      };
      this.dashboard = QuicksightEmbedding.embedSession(options);
    }
  }

  reload_dashboard(data: any) {
    // Navigate dashboard
    console.log('Data-----')
    console.log(data)
    var options = {
      scrolling: "yes",
      height: "AutoFit",
      locale: "en-US",
      footerPaddingEnabled: true,
      printEnabled: true,
      iframeResizeOnSheetChange: false
    };
    this.dashboard.navigateToDashboard({dashboardId: String(data['value']), parameters: options});
  }


  load_products(data: any) {
    if (this.dashboard)  {
      this.dashboard.setParameters({ProductName: data.value});
    }
  }

  load_countries(data: any) {
    if (this.dashboard)  {
      this.dashboard.setParameters({CountryCode: data.value});
    }
  }

}
