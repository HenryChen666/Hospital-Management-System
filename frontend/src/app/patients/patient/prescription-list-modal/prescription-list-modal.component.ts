import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-prescription-list-modal',
  templateUrl: './prescription-list-modal.component.html',
  styleUrls: ['./prescription-list-modal.component.css']
})
export class PrescriptionListModalComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA)
  public data: {
    id: string;
    drugNumber: string;
    drugName: string;
    unitsByDay: string;
    administrationByDay: string;
    administrationListings: string;
    administrationMethod: string;
    startDate: string;
    endDate: string;
  },private firestore: AngularFirestore) {
   }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(`OnSubmit Test: ${this.data.drugName}`)
  }

}                         
