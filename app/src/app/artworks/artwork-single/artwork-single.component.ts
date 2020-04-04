import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { faStar, faExternalLinkAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ArtworkService } from '../../services/artwork.service'
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Artwork } from 'src/app/models/artwork';

@Component({
  selector: 'app-artwork-single',
  templateUrl: './artwork-single.component.html',
  styleUrls: ['./artwork-single.component.scss']
})
export class ArtworkSingleComponent implements OnInit, AfterViewChecked {
  @ViewChild('leaveReview') leaveReview;
  @ViewChild('artworkContainer') artworkContainer;
  @ViewChild('banner') banner;

  artwork;
  paddingSet = false;
  id;
  faStar = faStar
  faExternalLinkAlt = faExternalLinkAlt;
  shortDetails;
  faCheck = faCheck;
  author: any = {};
  comments = []
  currentUser;

  constructor(
    private formBuilder: FormBuilder, private alertService: AlertService, private artworkService: ArtworkService,
    private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
    this.id = this.activatedRoute.snapshot.paramMap.get('id')

  }
  ngOnInit(): void {
    this.getArtwork(this.id)
  }
  ngAfterViewChecked(): void {
    if (!this.paddingSet && this.banner && this.banner.nativeElement.clientHeight && this.artworkContainer !== undefined) {
      this.setPadding()
      this.paddingSet = true
    }
  }
  setPadding() {
    if (this.banner && this.banner.nativeElement.clientHeight && this.artworkContainer !== undefined) {
      this.artworkContainer.nativeElement.style.paddingTop = (this.banner.nativeElement.clientHeight - 305) + 20 + 'px'
    }

  }
  getArtwork(id) {
    this.artworkService.getOne(this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          let formatter = new Intl.DateTimeFormat('pl', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          this.artwork = data.artwork;
          this.artwork.meanReview = this.artwork.reviews.reduce((total, next) => total + next.review, 0) / this.artwork.reviews.length;
          this.artwork.meanReview = parseInt(this.artwork.meanReview.toFixed(0))
          this.artwork.comments.map(comment => comment.date = formatter.format(new Date(comment.date)))
          this.getAuthor(this.artwork.userId[0])
        },
        error => {
          this.alertService.error(error);
        });
  }
  getAuthor(userId) {
    this.artworkService.getAuthor(userId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.author = data.author
        },
        error => {
          this.alertService.error(error);
        });
  }
  arrayFrom(number) {
    let array = [];
    for (let i = 0; i < number; i++) {
      array.push(i)
    }
    return array
  }
  reviewHover(star) {
    Array.from(this.leaveReview.nativeElement.children).forEach((child: any) => {
      child.classList.remove('active')
    })
    for (let i = 0; i <= star; i++) {
      this.leaveReview.nativeElement.children[i].classList.add('active')
    }
  }
  reviewHoverOut() {
    Array.from(this.leaveReview.nativeElement.children).forEach((child: any) => {
      child.classList.remove('active')
    })
  }
  addReview(star) {
    let author = `${this.currentUser.firstName} ${this.currentUser.lastName}`
    this.artworkService.addReview({ review: star + 1, author: author }, this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success('Zapisano Twoją opinię');
          this.getArtwork(this.id)
        },
        error => {
          (error === 'Conflict') && (error = 'Nie możesz dodać opinii więcej niż raz');
          this.alertService.error(error);
        });
  }
  leaveComment(comment) {
    if (!comment.value) {
      this.alertService.error('Komentarz nie może być pusty');
      return;
    }
    let author = `${this.currentUser.firstName} ${this.currentUser.lastName}`
    this.artworkService.addComment({ content: comment.value, author: author }, this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success('Zapisano Twoj Komentarz');
          this.getArtwork(this.id)
        },
        error => {
          this.alertService.error(error);
        });
  }
}
