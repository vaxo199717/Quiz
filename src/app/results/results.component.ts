import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results:any = {};
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }
  showResults(){
  }
  ngOnInit(): void {
    this.results = this.activatedRoute.snapshot.queryParams;
  }

}
