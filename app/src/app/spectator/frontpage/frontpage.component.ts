import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { StateService } from '../../services/state.service';
import { AccessCodeService } from '../../services/access-code.service';
import { SpectatorService } from '../../services/spectator.service';
import { Spectator } from '../../model/spectator';
import { AccessCode } from '../../model/access-code';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SocketioService } from '../../services/socketio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Quiz } from '../../model/quiz';
import { RouterLink } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from '../../model/competition';
import { AvatarsService } from '../../services/avatars.service';
import { BreaksService } from '../../services/breaks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hf-frontpage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, QRCodeModule],
  templateUrl: './frontpage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontpageComponent implements OnInit {
  private oidc: OidcSecurityService = inject(OidcSecurityService);
  private spectatorService: SpectatorService = inject(SpectatorService);
  private state: StateService = inject(StateService);
  private accessCodeService: AccessCodeService = inject(AccessCodeService);
  private socketioService: SocketioService = inject(SocketioService);
  private competitionService: CompetitionService = inject(CompetitionService);
  private breakService: BreaksService = inject(BreaksService);
  private avatarsService: AvatarsService = inject(AvatarsService);
  private toastr = inject(ToastrService);

  // toggles plus button - spectator has not activated access code
  isAccessInputFieldOpen: boolean = false;
  // checks if access code has been used - when you type access code
  accessCodeActivated: boolean = false;
  // toggles show ticket button - opens modal
  isClicked: boolean = false;
  inputAccessCode = new FormControl('');

  // checks if you have a access code
  accessCodeExists = signal(false);
  // access code
  myAccessCode = signal('');
  myCompetitionId = signal(0);
  myCompetition = toSignal(this.state.observeClone('currentCompetition'), {
    initialValue: {} as Competition,
  });
  activatedQuiz = toSignal(this.state.observeClone('activatedQuiz'), {
    initialValue: {} as Quiz,
  });

  ngOnInit() {
    //see if spectator has access code
    this.spectatorService.getSpectatorID().subscribe((specID: number): void => {
      this.state.set('spectatorId', specID);

      this.accessCodeService
        .findAccessCodeBySpectator(specID)
        .subscribe((response) => {
          if (response) {
            this.accessCodeExists.set(true);
            this.myAccessCode.set(response.code!);
            this.myCompetitionId.set(response.competition?.id!);
            this.getCompetitionInfo(response.competition?.id!);
          } else {
            this.accessCodeExists.set(false);
          }
        });

      this.breakService
        .getBreaksBySpectatorId(specID)
        .subscribe((breaks) => this.state.set('breaks', breaks));
    });
    // console.log breaks
    this.state
      .observe('breaks')
      .subscribe((breaks) => console.log('breaks by specID: ', breaks));

    // checks input - marks red
    this.inputAccessCode.valueChanges.subscribe((value) => {
      this.checkAccessCodeActivated(value!);
    });

    this.socketioService.setupSocketConnection();

    this.socketioService.socket.on('updateTime', (data: any) => {
      if (data.competition.id === this.myCompetitionId()) {
        this.state.set('activatedQuiz', data);
        if (data.time === '00:00') {
          this.state.set('activatedQuiz', null);
          // when time runs out spectator cant press lucky shot button and to reset option to guess again
          this.state.set('hasGuessed', false);
        }
      }
    });

    // Handle announce winner
    this.socketioService.socket.on('make winner public', (quiz: any) => {
      if (this.myCompetitionId() === quiz.competition.id) {
        this.toastr.success(
          'The winner for ' +
            quiz.question +
            ' is ' +
            quiz.spectator.username +
            '🏆'
        );
      }
    });
  }

  constructor() {
    this.createSpectator();

    this.accessCodeService.getAllAccessCodes().subscribe((codes) => {
      this.state.set('accessCodes', codes);
    });
  }

  toggleAccessCodeInputField() {
    this.isAccessInputFieldOpen = !this.isAccessInputFieldOpen;
  }

  // Check if the entered code has been activated
  checkAccessCodeActivated(accessCode: string) {
    this.accessCodeActivated = this.state
      .getValue()
      .accessCodes.some(
        (code) => code.code === accessCode && code.activated === true
      );
  }

  updateAccessCodeToActive() {
    //Find the access code
    const existingCode = this.state
      .getValue()
      .accessCodes.find((code) => code.code === this.inputAccessCode.value);

    if (existingCode) {
      this.myAccessCode.set(existingCode?.code!);
      this.myCompetitionId.set(existingCode?.competition?.id!);
      const existingCodeId = existingCode?.id;

      const accessCode: AccessCode = {
        id: existingCodeId!,
        code: this.inputAccessCode.value!,
        competition: { id: 0 },
        spectator: { id: 0 },
        activated: true,
      };

      this.accessCodeService.updateAccessCode(accessCode).subscribe(
        (updatedAccessCode) => {
          this.accessCodeExists.set(true);
        },
        (error) => {
          console.error('Error updating access code ', error);
        }
      );
      this.getCompetitionInfo(accessCode.competition?.id!);
      this.toggleAccessCodeInputField();
    } else {
      // Insert toastr here
      console.log("Code doesn't exist");
    }
  }

  handleShowTicket() {
    this.isClicked = !this.isClicked;
  }

  createSpectator() {
    let username: string;
    let userId: string;
    let mail: string;
    this.oidc.userData$.subscribe((userdata: UserDataResult) => {
      username = userdata.userData.preferred_username;
      userId = userdata.userData.sub;
      mail = userdata.userData.email || '';
    });
    const spectator: Spectator = {
      username: username!,
      tokenId: userId!,
      mail: mail!,
    };
    this.spectatorService.createQuiz(spectator).subscribe();
  }

  getCompetitionInfo(competitionId: number) {
    this.competitionService
      .getCompetitionById(competitionId)
      .subscribe((competition) => {
        this.state.set('currentCompetition', competition);
      });
  }

  protected readonly DatePipe = DatePipe;
}
