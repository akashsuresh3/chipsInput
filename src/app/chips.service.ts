import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Chips } from "./chips.model";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChipsService {

  private chips: Chips[] = [];
  private chipsUpdated = new Subject<{ chips: Chips[]; chipCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  addChips(name: string, email: string, image: File) {
    const chipData = new FormData();
    chipData.append("name", name);
    chipData.append("email", email);
    chipData.append("image", image, name);
    this.http
      .post<{ message: string; chips: Chips }>(
        "http://localhost:3000/api/addchips",
        chipData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  getChips() {
    this.http.get<{message: string; chips: any; maxChips: any}>(
      "http://localhost:3000/api/getchips"
      )
      .pipe(
        map(chipData => {
          return {
            chips: chipData.chips.map(chip => {
              return {
                name: chip.name,
                email: chip.email,
                id: chip._id,
                imagePath: chip.imagePath
              };
            }),
            maxChips: chipData.maxChips
          };
        })
      )
      .subscribe(transformedChipData => {
        this.chips = transformedChipData.chips;
        this.chipsUpdated.next({
          chips: [...this.chips],
          chipCount: transformedChipData.maxChips
        });
      });
  }

  getChipUpdateListener() {
    return this.chipsUpdated.asObservable();
  }

}
