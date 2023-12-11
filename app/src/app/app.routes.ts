import { Routes } from '@angular/router';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { UserGuard } from './guard/role-guard';

export const routes: Routes = [
  //LANDING PAGE
  {
    path: '',
    loadComponent: () =>
      import('./landingpage/landingpage.component').then(
        (hf) => hf.LandingpageComponent
      ),
  },
  //SPECTATOR
  {
    path: 'spectator-frontpage',
    loadComponent: () =>
      import('./spectator/frontpage/frontpage.component').then(
        (hf) => hf.FrontpageComponent
      ),
    canActivate: [UserGuard],
    data: { role: 'user' },
  },
  {
    path: 'lucky-shot',
    loadComponent: () =>
      import('./spectator/lucky-shot/lucky-shot.component').then(
        (hf) => hf.LuckyShotComponent
      ),
    canActivate: [UserGuard],
    data: { role: 'user' },
  },
  {
    path: 'rule-breaker',
    loadComponent: () =>
      import('./spectator/rule-breaker/rule-breaker.component').then(
        (hf) => hf.RuleBreakerComponent
      ),
    canActivate: [UserGuard],
    data: { role: 'user' },
  },
  {
    path: 'tops',
    loadComponent: () =>
      import('./spectator/tops/tops.component').then((hf) => hf.TopsComponent),
    canActivate: [UserGuard],
    data: { role: 'user' },
  },
  {
    path: 'avatars',
    loadComponent: () =>
      import('./spectator/rule-breaker/avatars/avatars.component').then(
        (hf) => hf.AvatarsComponent
      ),
    canActivate: [UserGuard],
    data: { role: 'user' },
  },
  {
    path: 'levels/:id',
    loadComponent: () =>
      import('./spectator/rule-breaker/levels/levels.component').then(
        (hf) => hf.LevelsComponent
      ),
    canActivate: [UserGuard],
    data: { role: 'user' },
  },
  //ORGANIZER
  {
    path: 'organizer-choose-competition',
    loadComponent: () =>
      import('./organizer/competition-list/competition-list.component').then(
        (hf) => hf.CompetitionListComponent
      ),
    canActivate: [UserGuard],
    data: { role: 'organizer' },
  },
  {
    path: 'organizer-game-page/:id',
    loadComponent: () =>
      import('./organizer/gamepage/gamepage.component').then(
        (hf) => hf.GamepageComponent
      ),
    canActivate: [UserGuard],
    data: { role: 'organizer' },
  },
  {
    path: 'organizer-create-quiz',
    loadComponent: () =>
      import(
        './organizer/gamepage/prepare-quiz/create-quiz/create-quiz.component'
      ).then((hf) => hf.CreateQuizComponent),
    canActivate: [UserGuard],
    data: { role: 'organizer' },
  },

  {
    path: 'organizer-my-quizzes',
    loadComponent: () =>
      import(
        './organizer/gamepage/prepare-quiz/my-quizzes/my-quizzes.component'
      ).then((hf) => hf.MyQuizzesComponent),
    canActivate: [UserGuard],
    data: { role: 'organizer' },
  },
  {
    path: 'organizer-activate-quiz',
    loadComponent: () =>
      import(
        './organizer/gamepage/start-quizzes/activate-quiz/activate-quiz.component'
      ).then((hf) => hf.ActivateQuizComponent),
    canActivate: [UserGuard],
    data: { role: 'organizer' },
  },
  {
    path: 'organizer-released-quizzes',
    loadComponent: () =>
      import(
        './organizer/gamepage/start-quizzes/released-quizzes/released-quizzes.component'
      ).then((hf) => hf.ReleasedQuizzesComponent),
    canActivate: [UserGuard],
    data: { role: 'organizer' },
  },

  //NORTHTECH POLICIES
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./northtech/privacy-policy/privacy-policy.component').then(
        (hf) => hf.PrivacyPolicyComponent
      ),
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('./northtech/terms-of-service/terms-of-service.component').then(
        (hf) => hf.TermsOfServiceComponent
      ),
  },
  //KEYCLOAK
  {
    path: 'callback',
    loadComponent: () =>
      import('./callback/callback.component').then(
        (hf) => hf.CallbackComponent
      ),
  },
  {
    path: 'login-organizer',
    loadComponent: () =>
      import('./organizer/competition-list/competition-list.component').then(
        (hf) => hf.CompetitionListComponent
      ),
    canActivate: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'login-spectator',
    loadComponent: () =>
      import('./spectator/frontpage/frontpage.component').then(
        (hf) => hf.FrontpageComponent
      ),
    canActivate: [AutoLoginPartialRoutesGuard],
  },
];
