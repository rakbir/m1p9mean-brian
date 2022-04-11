import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-liens',
  templateUrl: './liens.component.html',
  styleUrls: ['./liens.component.css']
})
export class LiensComponent implements OnInit {
  @Input() connected=false;
  @Input() liens:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
