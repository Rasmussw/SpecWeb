import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {KeycloakAdminService} from "../keycloak/keycloak-api-service";

@Component({
  selector: 'hf-create-user',
  templateUrl: './create-user.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent {
  createUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private keycloakAdminService : KeycloakAdminService) {
    this.createUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Du kan tilføje flere felter efter behov
    });
  }

  async onSubmit() {

    const formData = this.createUserForm.value;

    const token = await this.keycloakAdminService.getAdminToken();

    await this.keycloakAdminService.createNewUser(formData.username, formData.password, token)


  }
}
