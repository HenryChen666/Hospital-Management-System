import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Division } from '../model/division';
import { Unit } from '../model/unit';
import { DivisionService } from '../service/division.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  private subscription: Subscription;
  unit: Unit;

  constructor(private divisionsService: DivisionService) { }

  ngOnInit(): void {
    this.unit = this.divisionsService.getSelectedDivisionUnit();
  }

}
