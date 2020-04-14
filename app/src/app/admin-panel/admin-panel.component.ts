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
  artworks = []
  users = []
  selectedArtworks = []
  resultString;
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
          this.users = data.users
          console.log(this.artworks)
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
        let product: any = {};
        product.Handle = el.title.replace(' ', '-').toLowerCase()
        product.Title = el.title
        product.Body = "<p>${el.opis}</p><p>Wymiary (cm): ${el.height}x${el.width}</p><p>Materiały: ${el.material}</p><p>Podłoże: ${el.surface}</p><p>Werniks: ${el.varnish}</p><p>Rok: ${el.year}</p>";
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
}
