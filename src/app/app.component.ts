import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClienteMBS';

  constructor(private router:Router) {
    
  }
  ngOnInit() {
    this.router.navigateByUrl('/')
    window.open("https://localhost:5001/")
  }
}
