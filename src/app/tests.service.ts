import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IMethod {
  value: string;
  viewValue: string;
}

export interface ITest {
  name: string;
  description: string;
  method: string;
  url: string;
  body: string;
}


@Injectable({
  providedIn: 'root'
})
export class TestsService {

  test!:ITest;

  constructor(private http: HttpClient) { 
    this.test = <ITest> {
      name : 'http post test',
      description : 'Test sample endpoint',
      method : 'post',
      parameters: '',
      url : 'https://reqres.in/api/posts',
      body : '{ "title": "Angular POST Request Example" }'
    }
   }

  getMethods() {
    var methods: IMethod[] = [
      {value: 'post', viewValue: 'POST'},
      {value: 'get', viewValue: 'GET'},
    ];
    return methods;
  }

  getTest() {
    return this.test;
  }
  setTest(test:ITest) {
    this.test = test;
    console.log(this.test);
  }
  executeTest(callback:(data:any)=>void) {
    switch(this.test.method) {
      case 'post':
        this.http.post<any>(this.test.url, JSON.parse(this.test.body)).subscribe(data => {
          callback(data);
        })
        break;
      case 'get':
        this.http.get(this.test.url).subscribe(data => {
          callback(data);
        })
        break;
      default:
    }
  }
}
