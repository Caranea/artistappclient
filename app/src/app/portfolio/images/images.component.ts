import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../../services/artwork.service'
import { AuthenticationService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { faHourglassHalf, faLink, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { WebsiteService } from '../../services/website.service'
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  currentUser;
  artworks = [];
  faHourglassHalf = faHourglassHalf
  faQuestionCircle = faQuestionCircle;
  faLink = faLink
  editing = {};
  rows = [];
  website = false;
  websiteArtworks = false;
  formStructure = {}
  imagesForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private websiteService: WebsiteService, private router: Router,

    private artworkService: ArtworkService, private authenticationService: AuthenticationService, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
  }

  ngOnInit(): void {
    console.log(this.currentUser)
    this.websiteService.getWebsite(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.website) {
            this.website = true;
            if (data.website.artworks && data.website.artworks.length > 0) {
              this.rows = data.website.artworks
              this.websiteArtworks = true;
            } else {
              this.getAllArtworks()
            }
          } else {
            this.getAllArtworks()
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  SaveForm() {
    let updatedData = { artworks: this.rows, userId: this.currentUser._id };
    if (!this.website) {
      this.websiteService.addWebsite(updatedData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.website = true;
            this.alertService.success('Udało się zapisać dane')
          },
          error => {
            this.alertService.error(error);
          });
    } else {
      this.websiteService.updateWebsite(this.currentUser._id, updatedData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.website = true;
            this.alertService.success('Udało się zapisać dane')
          },
          error => {
            this.alertService.error(error);
          });
    }
  }

  updateValue(e, i) {
    let dataField = e.target.attributes.getNamedItem('data-field').value
    if (dataField !== 'include') {
      this.rows[i][dataField] = e.target.value
    } else {
      this.rows[i][dataField] = e.target.checked
    }
  }

  getAllArtworks() {
    this.artworkService.getAll(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.rows = []
          for (let artwork of data.artworks) {
            let artworkShort = {
              imageId: artwork._id,
              photoUrl: artwork.photosUrls[0],
              title: artwork.title,
              alt: '',
              include: true
            }
            this.rows.push(artworkShort)
          }
          this.rows = [...this.rows]
          console.log(this.rows)
        },
        error => {
          this.alertService.error(error);
        });
  }
}
