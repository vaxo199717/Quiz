import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  { path: 'main', component: MainComponent },
  { path: 'quizPage', component: QuizPageComponent },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
