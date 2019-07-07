import { GjModalService } from './../../common-module/gj-modal/gj-modal.service';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLbels from 'chartjs-plugin-datalabels' 
import {Label} from 'ng2-charts'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-route1',
  templateUrl: './route1.component.html',
  styleUrls: ['./route1.component.css']
})
export class Route1Component implements OnInit {

  state:number = 0
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  }
  barChartLabels:Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType:ChartType = 'bar'
  barChartLegend:boolean = true
  barChartPlugins = [pluginDataLbels]

  barChartData:ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ]

  constructor(
    private uploadModal:GjModalService,
    private http:HttpClient
  ) { }

  ngOnInit() {
    class T{
      kk(){
        console.log('T')
      }
    }
    this.getData()
   
  }
  changeState(){
    this.state +=1
  }

  getState(){
    return of(this.state).pipe(
      delay(2000),
    )
  }
  getData(){
    this.http.get("http://localhost:5000/getflag?flag=1")
  }
  openwin(){
    this.uploadModal.create({
      uploaderInfo:{
        target:'mail'
      }
    })

  }


}
