import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ArtworkService } from '../../services/artwork.service'
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artwork-add',
  templateUrl: './artwork-add.component.html',
  styleUrls: ['./artwork-add.component.scss']
})
export class ArtworkAddComponent implements OnInit {
  editMode: boolean;
  id: string;
  artworkForm: FormGroup;
  loading = false;
  submitted = false;
  artworkData;
  faLongArrowAltRight = faLongArrowAltRight;
  currentUser
  constructor(
    private formBuilder: FormBuilder, private alertService: AlertService, private artworkService: ArtworkService,
    private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x;});
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.editMode = !!this.id
    this.editMode && this.getFormData(this.id)
  }

  ngOnInit(): void {
    this.artworkForm = this.formBuilder.group({
      userId: this.currentUser._id,
      photos: ['', Validators.required],
      type: ['malarstwo', Validators.required],
      title: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required],
      material: ['', Validators.required],
      surface: ['', Validators.required],
      opis: ['', Validators.required],
      style: [''],
      varnish: [false, Validators.required],
      year: [2020],
      forSale: [true],
      price: [''],
      facebook: [true],
      instagram: [true],
      pinterest: [true],
      etsy: [true],
      amazon: [true],
      artpal: [true],
      ebay: [true],
      allegro: [true]
    });
  }

  get f() { return this.artworkForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();
    if(!this.artworkForm.value.photos) {
      this.alertService.error('Zapomniałeś/aś o zdjęciach')
    }
    if (this.artworkForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.editMode) {
      this.artworkService.update(this.artworkForm.value, this.id)
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
    } else {
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

  getFormData(id) {
    this.artworkService.getOne(this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.artworkData = data.artwork;
          this.readFormValue()
        },
        error => {
          this.alertService.error(error);
        });
  }
  readFormValue() {
    let fields = Object.keys(this.artworkData)
    for (let field of fields) {
      if (this.artworkForm.value[field] !== undefined) {
        this.artworkForm.get(field).setValue(this.artworkData[field])
      }
    }
  }
}
