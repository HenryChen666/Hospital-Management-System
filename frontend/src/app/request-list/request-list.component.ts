import { Component, OnInit } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Patient} from '../patients/model/patient';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {RegisterDbService} from '../patients/firestore/register-db.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  patients: Patient[] = [];
  constructor(private router: Router,private route: ActivatedRoute, private store:RegisterDbService, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.store.getRequestedPatients().subscribe(data => {
      this.patients = data.map(e => {
        return {
          id: e.payload.doc.data(),
          ...(e.payload.doc.data() as object)
        } as Patient;
      });
    });
  }

}
