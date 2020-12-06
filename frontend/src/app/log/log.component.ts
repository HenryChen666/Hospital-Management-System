import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {Observable} from 'rxjs';

import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import { Model } from '../log/model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})


export class LogComponent implements OnInit {
  displayedColumns: string[] = ['userName','access', 'time'];
  log: Model[] = [];

  constructor(private firestore: AngularFirestore) { }

  getLog(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('logUser').snapshotChanges()
  }

  ngOnInit(): void {
    this.getLog().subscribe(data => {
       this.log = data.map(e => {
        console.log(e.payload.doc.data().time.toDate())
        return {
          
          ...(e.payload.doc.data() as object),
          time: e.payload.doc.data().time.toDate(),
        } as Model;
      });
      console.log(this.log) });  

  }

}
