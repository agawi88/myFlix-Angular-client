import { Component } from '@angular/core';

@Component({
  selector: 'app-genre-view',
  standalone: false,
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss',
})
export class GenreViewComponent {
  getGenre(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }
}
