import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service'
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileForm;
  submitted;
  faLongArrowAltRight = faLongArrowAltRight;
  loading;
  currentUser;
  constructor(
    private formBuilder: FormBuilder, private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(this.currentUser._id)
        .pipe(first())
        .subscribe(
          (data: any) => {
            const keys = Object.keys(data.userProfile);
            keys.forEach(key => {
              if (this.profileForm.get(key)) {
                if ((key !== 'coverPhoto') && (key !== 'profilePhoto') ) {
                  console.log(key)
                  this.profileForm.get(key).setValue(data.userProfile[key])
                }
              }
            })
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    });

  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      profilePhoto: [''],
      coverPhoto: [''],
      firstName: [''],
      lastName: [''],
      gender: [''],
      city: [''],
      facebook: [''],
      instagram: [''],
      youtube: [''],
      twitter: [''],
      behance: [''],
      bio: [''],
      favouriteArtists: [''],
      inspirations: [''],
      techniques: ['']
    });
  }
  get f() { return this.profileForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.update(this.profileForm.value, this.currentUser._id)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Udało się wprowdzić zmiany', true);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
