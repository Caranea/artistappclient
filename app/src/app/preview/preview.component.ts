import { Component, OnInit, ViewChild } from "@angular/core";
import { WebsiteService } from "../services/website.service";
import { AuthenticationService } from "../services/auth.service";
import { AlertService } from "../services/alert.service";
import { first } from "rxjs/operators";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { faAngleDoubleDown, faQuestionCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ArtworkService } from '../services/artwork.service'
import { UserService } from '../services/user.service'
@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})
export class PreviewComponent implements OnInit {
  currentUser;
  previewUrl;
  texts;
  faAngleDoubleDown = faAngleDoubleDown;
  faQuestionCircle = faQuestionCircle;
  faPlus = faPlus;
  artworks
  categories
  profile
  testimonials = []
  pricing = []
  @ViewChild("homepage") homepage;
  @ViewChild("about") about;
  @ViewChild("portfolio") portfolio;
  @ViewChild("contact") contact;
  @ViewChild("logo") logo;
  @ViewChild("icon") icon;


  constructor(
    private websiteService: WebsiteService,
    private authService: AuthenticationService,
    private alertService: AlertService,
    public sanitizer: DomSanitizer,
    private artworkService: ArtworkService,
    private userService: UserService
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(this.currentUser._id)
        .pipe(first())
        .subscribe((data: any) => {
          this.profile = data.userProfile
        }, error => {
          this.alertService.error(error);
        })
    });
  }

  ngOnInit(): void {
    this.artworkService.getAll(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.artworks = []
          for (let artwork of data.artworks) {
            let artworkShort = {
              imageId: artwork._id,
              photoUrl: artwork.photosUrls[0],
              title: artwork.title,
              category: '',
              alt: '',
              include: true
            }
            this.artworks.push(artworkShort)
          }
          this.artworks = [...this.artworks]
        },
        error => {
          this.alertService.error(error);
        });
    this.websiteService
      .getPreview(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.previewUrl = data.websiteAddress;
          this.websiteService
            .getTexts(this.currentUser._id)
            .pipe(first())
            .subscribe(
              (data: any) => {
                this.texts = data.texts;
              },
              error => {
                this.alertService.error(error);
              }
            );
        },
        error => {
          this.alertService.error(error);
        }
      );
    this.websiteService.getWebsite(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {

          this.categories = data.website.categories;
          this.testimonials = data.website.testimonials || [
            {
              content: 'Tutaj możesz dodać opinię o Tobie osób, z którymi współpracowałeś lub Twoich klientów',
              author: 'Przykladowy autor'
            }
          ]
          this.pricing = data.website.pricing || [
            { name: '', price: '', description: [''] }, { name: '', price: '', description: [''] }, { name: '', price: '', description: [''] }
          ]
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  saveTestimonials() {
    this.testimonials = this.testimonials.filter(el => el.author.trim() !== '' && el.content.trim() !== '')
    this.websiteService.addTestimonials(this.currentUser._id, { testimonials: this.testimonials })
      .subscribe(
        (data: any) => {
          //this.testimonials = data.website.testimonials;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  savePricing() {
    this.pricing.forEach(el => {
      if (el.name.trim() === "" || el.price.trim() === "" || el.description[0].trim() === "") {
        this.alertService.error("Wypełnij prawidłowo wszystkie trzy elementy cennika");
        return;
      }
      el.description = el.description.filter(el => el.trim() !== '')
    })
    this.websiteService.addPricing(this.currentUser._id, { pricing: this.pricing })
      .subscribe(
        (data: any) => {
          //this.testimonials = data.website.testimonials;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  getValue(value) {
    if (this.texts) {
      return value[Object.keys(value)[0]];
    }
  }

  updateValue(e, i) {
    let dataField = e.target.attributes.getNamedItem('data-field').value
    if (dataField !== 'include') {
      this.artworks[i][dataField] = e.target.value
    } else {
      this.artworks[i][dataField] = e.target.checked
    }
  }

  saveArtworks() {
    let included = this.artworks.filter(el => el.include)
    if (included.length === 0) {
      this.alertService.error('Musisz zaznaczyć choć 1 pracę')
      return;
    }
    let error
    included.forEach(element => {
      if (!element.category) {
        this.alertService.error('Zapomniałeś o kategorii');
        error = true
      }
    });
    if (error) return;
    this.websiteService.updateWebsite(this.currentUser._id, { artworks: this.artworks })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.websiteService.replaceArtworks(this.currentUser._id, { artworks: this.artworks })
            .pipe(first())
            .subscribe(data => {
              this.alertService.success('Udało się zaktualizować prace')
            },
              error => {
                this.alertService.error(error);
              })
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  replaceText(element) {
    const val1 = element.children[0].value.trim();
    const val2 = element.children[2].value.trim();
    if (val1 === "" || val2 === "") {
      this.alertService.error("Wypełnij prawidłowo wartości");
      return;
    }

    this.websiteService
      .replaceText(this.currentUser._id, element.children[0].id, {
        oldText: val1,
        newText: val2
      })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success("Udało się zapisać dane");
          this.previewUrl = this.previewUrl;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  saveLogo() {
    this.websiteService
      .replaceLogo(this.currentUser._id, { logo: this.logo.files[0] })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success("Udało się zapisać dane");
          this.previewUrl = this.previewUrl;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }
  saveIcon() {

    this.websiteService
      .replaceIcon(this.currentUser._id, { icon: this.icon.files[0] })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success("Udało się zapisać dane");
          this.previewUrl = this.previewUrl;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }
}
