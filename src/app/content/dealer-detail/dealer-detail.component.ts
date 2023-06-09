import { Component, OnInit } from '@angular/core';
import { Dealer } from 'src/app/models/menu-item';
import { ActivatedRoute, Router } from '@angular/router';
import { DealerServiceService } from './dealer-service.service';

@Component({
  selector: 'app-dealer-detail',
  templateUrl: './dealer-detail.component.html',
  styleUrls: ['./dealer-detail.component.scss']
})
export class DealerDetailComponent  implements OnInit{

  constructor( private route: ActivatedRoute,
    private dealerService: DealerServiceService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dealerId = +params['id']; // Lấy dealerId từ URL
      this.getDealerDetail(this.dealerId);
    });
  }
  getDealerDetail(id: number): void {
    this.dealerService.getDealerById(id).subscribe(dealer => {
      this.dealer = dealer;

    });
  }
  close() {
    this.router.navigate(['/']);
  }
  dealerId!: number;
  dealer!: Dealer;
}
