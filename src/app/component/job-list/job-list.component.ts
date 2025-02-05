import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  listOffers: any[] = [];
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getOffers();
  }


  getOffers(): void {
    this.commonService.getAllJobOffers().subscribe(
      (response) => {
        this.listOffers = response.jobOffers;
        console.log('Job offers:', this.listOffers);
        
        // Check if the list is empty
        if (this.listOffers.length === 0) {
          console.log('No job offers available.');
          // You can set a message to display in the UI
          // For example, you can create a property to hold the message
          // this.noOffersMessage = 'No job offers available at this time.';
        }
      },
      (error) => {
        console.error('Error fetching job offers:', error);
        // Optionally, you can set an error message to display in the UI
        // this.errorMessage = 'An error occurred while fetching job offers.';
      }
    );
  }
}
