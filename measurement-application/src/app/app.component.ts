import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  data: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
}
