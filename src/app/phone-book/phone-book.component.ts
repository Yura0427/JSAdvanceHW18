import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { OrderPipe } from 'ngx-order-pipe';
import { IPerson } from './person.interface';
import { Person } from './person.model';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css']
})

export class PhoneBookComponent implements OnInit {

  order: string = 'id';
  reverse: boolean = false;
  collection: Array<IPerson> = [
    new Person(1, 'Petro', 'Yurchenko', '0636459871'),
    new Person(2, 'Pavlo', 'Ivanov', '0637654321'),
    new Person(3, 'Ivan', 'Pavliv', '0934987321'),
    new Person(4, 'Vasa', 'Petriv', '0966987123'),
    new Person(5, 'Yurko', 'Vaskiv', '0866987123'),
  ];
  sortedCollection: any[];
  modalRef: BsModalRef;
  searchVal: any;

  newFirstName: string;
  newLastName: string;
  newNumber: string;

  newColl: Array<IPerson> = this.collection;

  editStatus: boolean;
  editID: number

  constructor(private orderPipe: OrderPipe, private modalService: BsModalService) {
    this.sortedCollection = orderPipe.transform(this.collection, 'firstName');
    console.log(this.sortedCollection);
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addPerson() {
    this.editStatus = false;
    const newP = new Person(this.collection.length + 1, this.newFirstName, this.newLastName, this.newNumber)
    this.collection.push(newP);
    this.newColl = this.collection;
    this.resetForm();
  }

  search() {
    this.newColl = this.collection.filter(el =>
      (el.firstName.toLowerCase().indexOf(this.searchVal.toLowerCase()) !== -1) ||
      (el.lastName.toLowerCase().indexOf(this.searchVal.toLowerCase()) !== -1) ||
      (el.number.indexOf(this.searchVal.toLowerCase()) !== -1));
  }

  editPerson(template: TemplateRef<any>, i) {
    this.editStatus = true;
    this.modalRef = this.modalService.show(template);
    this.newFirstName = this.collection[i - 1].firstName;
    this.newLastName = this.collection[i - 1].lastName;
    this.newNumber = this.collection[i - 1].number;
    this.editID = i - 1
  }

  resetForm() {
    this.newFirstName = '';
    this.newLastName = '';
    this.newNumber = '';
  }

  savePerson() {
    const editP = new Person(this.editID + 1, this.newFirstName, this.newLastName, this.newNumber)
    this.collection.splice(this.editID, 1, editP);
    this.modalRef.hide()
    this.resetForm();
  }

  delPerson(id) {
    this.collection.splice(id - 1, 1);
    this.renderID();
  }

  renderID() {
    for (let i = 0; i < this.collection.length; i++) {
      this.collection[i].id = i + 1;
    }
  }

}

