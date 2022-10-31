import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  imageList:any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.imageList = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  onFavoritesImageClick(selectedImage:{image:string, id: string}){
    this.router.navigate([`home/photos/${selectedImage?.id}`]);
  }
}
