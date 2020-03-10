import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'pay';
  posting = false;
  @ViewChild('myFormPost', { static: false }) myFormPost: ElementRef;
  token: any;
  constructor(private http: HttpClient,private window: Window) {
    //this.signalRService.startConnection();
  }
  onPost(event): void {
    let token = {
      "getHostedPaymentPageRequest": {
        "merchantAuthentication": {
          "name": "",
          "transactionKey": ""
        },
        "transactionRequest": {
          "transactionType": "authCaptureTransaction",
          "amount": "20.00",
          "profile": {
            "customerProfileId": "123456789"
          },
          "customer": {
            "email": "ellen@mail.com"
          },
          "billTo": {
            "firstName": "Ellen",
            "lastName": "Johnson",
            "company": "Souveniropolis",
            "address": "14 Main Street",
            "city": "Pecan Springs",
            "state": "TX",
            "zip": "44628",
            "country": "USA"
          }
        },
        "hostedPaymentSettings": {
          "setting": [{
            "settingName": "hostedPaymentReturnOptions",
            "settingValue": "{\"showReceipt\": false, \"url\": \"https://payment1990.firebaseapp.com/receipt\", \"urlText\": \"Continue\", \"cancelUrl\": \"https://payment1990.firebaseapp.com/receipt?response=cancel\", \"cancelUrlText\": \"Cancel\"}"
          }, {
            "settingName": "hostedPaymentButtonOptions",
            "settingValue": "{\"text\": \"Pay\"}"
          }, {
            "settingName": "hostedPaymentStyleOptions",
            "settingValue": "{\"bgColor\": \"blue\"}"
          }, {
            "settingName": "hostedPaymentPaymentOptions",
            "settingValue": "{\"cardCodeRequired\": false, \"showCreditCard\": true, \"showBankAccount\": true}"
          }, {
            "settingName": "hostedPaymentSecurityOptions",
            "settingValue": "{\"captcha\": false}"
          }, {
            "settingName": "hostedPaymentShippingAddressOptions",
            "settingValue": "{\"show\": false, \"required\": false}"
          }, {
            "settingName": "hostedPaymentBillingAddressOptions",
            "settingValue": "{\"show\": true, \"required\": false}"
          }, {
            "settingName": "hostedPaymentCustomerOptions",
            "settingValue": "{\"showEmail\": false, \"requiredEmail\": false, \"addPaymentProfile\": true}"
          }, {
            "settingName": "hostedPaymentOrderOptions",
            "settingValue": "{\"show\": true, \"merchantName\": \"G and S Questions Inc.\"}"
          }, {
            "settingName": "hostedPaymentIFrameCommunicatorUrl",
            "settingValue": "{\"url\": \"https://payment1990.firebaseapp.com/IFrameCommunicator.html\"}"
          }]
        }
      }
    }
    this.http.post('https://apitest.authorize.net/xml/v1/request.api', token).subscribe((data) => {
      console.log(data)
      this.token = data["token"];
      this.posting = true;
    })

  }

  onReset(event): void {
    this.posting = false;
  }

  ngAfterViewChecked() {
    if (this.posting && this.myFormPost) {
      this.myFormPost.nativeElement.submit();
    }
  }
  ngAfterViewInit() {
    window.CommunicationHandler = {};
    window.CommunicationHandler.onReceiveCommunication = (argument) => {
      console.log("iFrame argument: " + JSON.stringify(argument));
      //Get the parameters from the argument.
      let params = this.parseQueryString(argument.qstr)
      console.log(params)
      switch (params['action']) {
        case "resizeWindow":
          console.log("handle")
          break;
        case "successfulSave":
          console.log("handle")
          break;
        case "cancel":
          console.log("handle")
          break;
        case "transactResponse":
          console.log('transaction complete');
          const transResponse = JSON.parse(params['response']);
          console.log(transResponse)
          this.posting = false;
          break;
        default:
          console.log('Unknown action: ' + params['action'])
          break;
      }
    }
  }

  parseQueryString(str) {
    var vars = [];
    var arr = str.split('&');
    var pair;
    for (var i = 0; i < arr.length; i++) {
      pair = arr[i].split('=');
      //vars[pair[0]] = unescape(pair[1]);
      vars[pair[0]] = pair[1];
    }
    return vars;
  }
}
