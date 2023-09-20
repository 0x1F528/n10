import { Component, OnInit } from '@angular/core';
import { TestsService, IMethod, ITest } from '../tests.service';

interface Method {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  testService!: TestsService;
  name!: string;
  description!: string;
  method!: string;
  url!: string;
  parameters!: string;
  body!: string;
  methods: IMethod[];
  saved: boolean = true;
  response: string = "";

  constructor(ts:TestsService) {
    this.testService = ts;
    this.methods = ts.getMethods();
    this.revert();
    this.response = "";
  }

  changed(event:any) {
    this.saved = false;
  }

  revert() {
    var test = this.testService.getTest();
    Object.assign(this, {...test});
    this.saved = true;
  }

  save() {
    var test = <ITest>{} ;
    this.testService.setTest(
      <ITest> {
        name: this.name,
        description: this.description,
        method: this.method,
        parameters: this.parameters,
        url: this.url,
        body: this.body
      } 
    )
    this.saved = true;
  }

  run() {
    this.testService.executeTest(data => {
      this.response = JSON.stringify(data,  null, 2);
    });
  }



}
