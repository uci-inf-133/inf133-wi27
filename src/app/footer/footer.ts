import { Component } from '@angular/core';
import { MomentModule } from 'ngx-moment';

@Component({
  imports: [MomentModule],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  date: Date;

  constructor() {
    this.date = new Date();
  }
}
