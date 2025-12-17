import { Component } from '@angular/core';

@Component({
  selector: 'app-director-view',
  standalone: false,
  templateUrl: './director-view.component.html',
  styleUrl: './director-view.component.scss',
})
export class DirectorViewComponent {
 getDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }
}
