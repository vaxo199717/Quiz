import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, difficulity, ISelectedOptions } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  texts:any = {
    category_text: "Select Quiz Category",
    difficulty_text: "Select Quiz Difficulty"
  }
  visibleCategories: boolean = false;
  visibleDifficulties: boolean = false;
  categories: any[] = [];
  difficulties: difficulity[] = ['easy', 'medium', 'hard'];
  selectedOptions: ISelectedOptions = { id: 0, difficulty: 'easy' }

  constructor(
    private _dataService: DataService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._dataService.getCategory()
      .subscribe(data => this.categories = data.trivia_categories);
  }
  openCategories() {
    if (!this.visibleCategories) {
      this.visibleCategories = true;
    } else {
      this.visibleCategories = false;
    }
  }
  openDifficulties() {
    if (!this.visibleDifficulties) {
      this.visibleDifficulties = true;
    } else {
      this.visibleDifficulties = false;
    }
  }
  closeCategories() {
    if (this.visibleCategories) {
      this.visibleCategories = false;
    }
    console.log(this.categories[(this.selectedOptions.id - 9)].name)
    this.texts.category_text = this.categories[(this.selectedOptions.id - 9)].name
  }
  closeDifficulties(){
    if(this.visibleDifficulties){
      this.visibleDifficulties = false;
    }
    this.texts.difficulty_text = this.selectedOptions.difficulty;

  }
  start() {
    if (!this.selectedOptions.id || !this.selectedOptions.difficulty) return;
    this._router.navigate(['/quiz'], { queryParams: this.selectedOptions })
  }

}
