import { Component, OnDestroy } from "@angular/core";
import { forkJoin } from "rxjs";
import { takeWhile } from "rxjs/operators";

import { DatePipe } from "@angular/common";
import { MatRipple } from "@angular/material/core";
import {
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbTabsetModule,
  NbUserModule,
} from "@nebular/theme";
import { Contacts, RecentUsers, UserData } from "@remlore/core/data/users";

@Component({
  selector: "rl-contacts",
  styleUrls: ["./contacts.component.scss"],
  templateUrl: "./contacts.component.html",
  imports: [
    NbCardModule,
    NbTabsetModule,
    NbListModule,
    NbUserModule,
    NbIconModule,
    DatePipe,
    MatRipple,
  ],
})
export class ContactsComponent implements OnDestroy {
  private alive = true;

  contacts: Contacts[] = [];
  recent: RecentUsers[] = [];

  constructor(private userService: UserData) {
    forkJoin([
      this.userService.getContacts(),
      this.userService.getRecentUsers(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([contacts, recent]: [Contacts[], RecentUsers[]]) => {
        this.contacts = contacts;
        this.recent = recent;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
