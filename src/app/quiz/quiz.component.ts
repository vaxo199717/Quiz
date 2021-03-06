import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, selectedOption } from '../data.service';
import { finalize } from 'rxjs/operators'



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  answers: any = {
    correctAnswers: 0,
    incorrectAnswers: 0
  }
  isLoading: boolean = true;
  questions: any[] = [];
  selectedOptions: selectedOption;

  constructor(
    private _dataService: DataService,
    private _activatedRoute: ActivatedRoute,
    private _resultsRouter: Router
  ) {
    this.selectedOptions = this._activatedRoute.snapshot.queryParams as selectedOption;
  }
  chooseAnswer(quizQuestion: any, selectedAnswer: any) {
    selectedAnswer === quizQuestion.correct_answer?this.answers.correctAnswers++:this.answers.incorrectAnswers++;
    quizQuestion.isAnswered = true;
    quizQuestion.selectedAnswer = selectedAnswer;
  }
  
  ngOnInit(): void {
    this._dataService.getQuestion(this.selectedOptions.id, this.selectedOptions.difficulty)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => {
        const questions: any[] = data.results.map((item: any) => {
          item.incorrect_answers.push(item.correct_answer)
          this.shuffleArray(item.incorrect_answers)
          item.selectedAnswer = '';
          item.isAnswered = false;
          return item;
        })
        this.questions = questions;
      });
  }
  finish() {
    if (this.answers.correctAnswers + this.answers.incorrectAnswers === 10) {
      this._resultsRouter.navigate(['/results'], { queryParams: this.answers });
    } else {
      if (confirm("you have left " + (10 - (this.answers.correctAnswers + this.answers.incorrectAnswers)) + " unanswered questions.. do you want to finish anyway?")) {
        this._resultsRouter.navigate(['/results'], { queryParams: this.answers });
      }
    }
  }
  shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}
