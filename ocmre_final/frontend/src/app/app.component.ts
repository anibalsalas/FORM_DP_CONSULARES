import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
   host: { class: 'app-zoom-90' },
  standalone: true,
  imports: [RouterModule,MatSidenavModule,
    MatIconModule, 
    MatToolbarModule,       
    MatListModule] 
})
export class AppComponent {
  title = 'frontend';
}