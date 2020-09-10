import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from '../services/admin.service'
import { AlertService } from '../services/alert.service'

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  activeSection = 'shops'
  socialMode = "artists"
  artworks = []
  users = []
  selectedArtworks = []
  resultString;
  resultString2;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private adminService: AdminService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getArtworks('6')
  }
  getArtworks(time) {
    this.adminService.getAll(time)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.artworks = data.artworks
          console.log(this.artworks)

          this.users = data.users
          console.log(this.users)
          this.artworks = this.artworks.filter((el) => {
            let userId = el.userId[0];
            console.log(userId)
            let userHasPaid = this.users.find(el => el._id === userId).hasPaid
            return userHasPaid === true
          })
        },
        error => {
          this.alertService.error(error);
        });
  }
  change(e, item) {
    if (e.target.checked) {
      this.selectedArtworks.push(item)
    } else {
      this.selectedArtworks = this.selectedArtworks.filter(el => {
        return el._id !== item._id
      })
    }
    console.log(e.target.checked, item)
  }
  getShopifyJson(withImages = true, template: TemplateRef<any>) {
    let result = []
    this.selectedArtworks.forEach(el => {
      let author: any = this.users.filter(el2 => {
        return el2._id === el.userId[0]
      })[0]
      if (el.price) {
        el.varnish = el.varnish ? 'Tak' : 'Nie'
        let product: any = {};
        product.Handle = el.title.replace(' ', '-').toLowerCase()
        product.Title = el.title
        product.Body = `<p>${el.opis}</p><p>Wymiary (cm): ${el.height}x${el.width}</p><p>Materiały: ${el.material}</p><p>Podłoże: ${el.surface}</p><p>Werniks: ${el.varnish}</p><p>Rok: ${el.year}</p>`;
        product.Publish = false;
        product["Variant Inventory Qty"] = 1
        product.Price = el.price;
        product.Vendor = author.firstName + ' ' + author.lastName
        if (withImages) {
          product["Image Src"] = 'https://artysta.knickknacks.pl' + el.photosUrls[0].split('public')[1]
        }
        result.push(product)
        this.resultString = JSON.stringify(result)
      }
    })
    this.modalRef = this.modalService.show(template);
  }
  getEmailList(template2: TemplateRef<any>) {
    let accepted = []
    let notAccepted = []
    this.selectedArtworks.forEach(el => {
      let author: any = this.users.filter(el2 => {
        return el2._id === el.userId[0]
      })[0]
      if (el.price) {
        el.email = author.email;
      }
      if (accepted.filter(el2 => el2.email == el.email).length == 0)
        accepted.push({ email: el.email })
      console.log(accepted)
      this.resultString2 = JSON.stringify(accepted)
    })
    this.modalRef = this.modalService.show(template2);
  }
}
