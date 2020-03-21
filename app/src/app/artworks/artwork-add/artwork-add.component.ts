import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ArtworkService } from '../../services/artwork.service'
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-artwork-add',
  templateUrl: './artwork-add.component.html',
  styleUrls: ['./artwork-add.component.scss']
})
export class ArtworkAddComponent implements OnInit {
  artworkForm: FormGroup;
  loading = false;
  submitted = false;
  faLongArrowAltRight = faLongArrowAltRight;
  currentUser
  constructor(
    private formBuilder: FormBuilder, private alertService: AlertService, private artworkService: ArtworkService,
     private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; console.log(this.currentUser) });

  }

  ngOnInit(): void {
    this.artworkForm = this.formBuilder.group({
      userId: this.currentUser._id,
      photos: [[{}], Validators.required],
      type: ['malarstwo', Validators.required],
      title: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required],
      material: ['', Validators.required],
      surface: ['', Validators.required],
      opis: ['', Validators.required],
      style: [''],
      varnish: [false, Validators.required],
      year: ['', Validators.required],
      forSale: [true, Validators.required],
      price: [''],
      facebook: [true],
      Instagram: [true],
      Pinterest: [true],
      Etsy: [true],
      Amazon: [true],
      artpal: [true],
      Ebay: [true],
      Allegro: [true]
    });
  }

  get f() { return this.artworkForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.artworkForm.invalid) {
      return;
    }
    this.loading = true;
    this.artworkService.add(this.artworkForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Udało się dodać pracę', true);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
