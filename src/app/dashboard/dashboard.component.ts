import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions} from "ng2-charts";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export interface TicketData {
  ticket: string;
  name: string;
  npi: string;
  type: string;
  sla: string;
  dlp: string;
  status: string;
}

const ticketData: TicketData [] = [
  {
    ticket: '641889',
    name: 'Edith James',
    npi: '0144455',
    type: 'Demographic',
    sla: 'Compliant',
    dlp: '09/25/2019',
    status: 'In Progress'
  },
  {
    ticket: '884552',
    name: 'ABC James',
    npi: '755542',
    type: 'Demographic',
    sla: 'Compliant',
    dlp: '09/25/2019',
    status: 'Progress'
  }
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['ticket', 'name', 'npi', 'type', 'sla', 'dlp', 'status'];
  dataSource: MatTableDataSource<TicketData>;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  public barChartLabels: Label[] = ['Demographic Update', 'Network Mismatch', 'Source Alerts', 'Directory Issues'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartData: ChartDataSets[] = [];

  public doughnutChartLabels: Label[] = ['Complete', 'In Progress', 'Unassigned'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [
    {
      beforeDraw(chart) {
        const ctx = chart.ctx;
        const txt = 'Center Text';
        //Get options from the center object in options
        // @ts-ignore
        var sum = chart.tooltip._data.datasets[0].data[0]+ chart.tooltip._data.datasets[0].data[1] + chart.tooltip._data.datasets[0].data[2];
        const sidePadding = 60;
        const sidePaddingCalculated =
          // @ts-ignore
          (sidePadding / 100) * (chart.innerRadius * 2);
        // @ts-ignore
        ctx.textAlign = 'center';
        // @ts-ignore
        ctx.textBaseline = 'middle';
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        // @ts-ignore
        const stringWidth = ctx.measureText(txt).width;
        // @ts-ignore
        const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        // @ts-ignore
        const elementHeight = chart.innerRadius * 2;

        // Pick a new font size so it will not be larger than the height of label.
        const fontSizeToUse = Math.min(newFontSize, elementHeight);
        // @ts-ignore
        ctx.font = fontSizeToUse + 'px Arial';
        // @ts-ignore
        ctx.fillStyle = 'black';
        // Draw text in center
        // @ts-ignore
        ctx.fillText(`Total : ${sum}`, centerX, centerY);
      }
    }
  ];

  constructor() {

    this.dataSource = new MatTableDataSource(ticketData);
  }

  ngOnInit(): void {
    this.randomData();
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // @ts-ignore
    if (this.dataSource.paginator) {
      // @ts-ignore
      this.dataSource.paginator.firstPage();
    }
  }

  randomData() {
    this.barChartData = [];
    this.doughnutChartData = [];
    let barChartData = [
      {data: [5, 3, 4, 2, 1], label: 'Series A'},
      {data: [10, 6, 5, 8, 7], label: 'Series A'},
      {data: [3, 2, 4, 1, 9], label: 'Series A'},
      {data: [40, 80, 2, 5, 8], label: 'Series A'}
    ]
    let douChartData = [
      [20, 400, 80],
      [90, 450, 58],
      [22, 54, 88],
      [89, 54, 54],
      [97, 45, 55]
    ]
    let randomBarData = barChartData[Math.floor(Math.random() * barChartData.length)];
    let doughnutData = douChartData[Math.floor(Math.random() * douChartData.length)];
    this.barChartData.push(randomBarData)
    this.doughnutChartData.push(doughnutData)
    console.log(randomBarData);
  }


}
