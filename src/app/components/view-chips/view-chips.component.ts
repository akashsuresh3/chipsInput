import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ChipsService } from 'src/app/chips.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { Chips } from './../../chips.model';

@Component({
  selector: 'app-view-chips',
  templateUrl: './view-chips.component.html',
  styleUrls: ['./view-chips.component.css']
})
export class ViewChipsComponent implements OnInit {

  chips: Chips[] = [];
  totalChips = 0;
  private chipsSub: Subscription;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl('');
  filteredChips: Observable<Chips[]>;
  chipsAdded: Chips[] = [];
  allChips: Chips[] = [];
  universalChips: Chips[] = [];


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.chipsService.getChips();
    this.chipsSub = this.chipsService
      .getChipUpdateListener()
      .subscribe((chipData: {chips: Chips[], chipCount: number}) => {
        this.totalChips = chipData.chipCount;
        this.chips = chipData.chips;
        this.allChips = this.chips.slice();
        this.universalChips = this.chips.slice();
        this.chipCtrl.setValue(null);
        // this.filteredChips = of(this.chips);
      });

  }


  constructor(
    public chipsService: ChipsService,
    public route: ActivatedRoute
    ) {
      this.filteredChips = this.chipCtrl.valueChanges.pipe(
          startWith(null),
          map((chipname: string | null) => (chipname ? this._filter(chipname) : this.allChips.slice())),
        );
  }

  add(event: MatChipInputEvent): void {
    // const value = (event.value || '').trim();
    const value = event.chipInput.id;
    let chipToAdd: Chips = this.allChips.find(x => x.id === value);
    // Add our fruit
    if (value) {
      this.chipsAdded.push(chipToAdd);
    }
    console.log(this.chipsAdded);

    // Clear the input value
    event.chipInput!.clear();

    this.chipCtrl.setValue(null);
  }

  remove(chipId): void {
    // let removedChip: Chips = this.allChips.find(x => x.id === chipId);

    // if (index >= 0) {
    //   this.chipsAdded.splice(index, 1);
    // }
    let removedChip: Chips = this.universalChips.find(x => x.id === chipId);

    this.allChips.push(removedChip);
    this.chipsAdded.splice(this.chipsAdded.findIndex(a => a.id === chipId), 1);
    this.chipCtrl.setValue(null);

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let addedChip: Chips = this.allChips.find(x => x.id === event.option.value);

    this.chipsAdded.push(addedChip);
    // console.log(event);
    this.fruitInput.nativeElement.value = '';
    this.allChips.splice(this.allChips.findIndex(a => a.id === event.option.value), 1);
    this.chipCtrl.setValue(null);

  }

  private _filter(value: string): Chips[] {
    const filterValue = value.toLowerCase();

    return this.allChips.filter(fruit => fruit.name.toLowerCase().includes(filterValue));
  }

}
