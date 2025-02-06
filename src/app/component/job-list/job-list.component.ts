import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  listOffers: any[] = [];
  locations: string[] = []; // Add locations array
  categories: string[] = []; // Add categories array
  selectedLocation: string = '';
  selectedCategory: string = '';
  selectedJobType: string[] = [];
  selectedDatePosted: string = '';
  selectedExperienceLevel: string = '';

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getOffers();
    this.getCategories(); // Fetch categories
    this.getLocations(); // Fetch locations
  }

  getOffers(): void {
    this.commonService.getAllJobOffers().subscribe(
      (response) => {
        this.listOffers = response.jobOffers;
        console.log('Job offers:', this.listOffers);
      },
      (error) => {
        console.error('Error fetching job offers:', error);
      }
    );
  }

  getCategories(): void {
    this.commonService.getAllCategoryOffers().subscribe(
      (response) => {
        this.categories = response.categories; // Assuming the response has a categories array
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getLocations(): void {
    // Implement a method to fetch locations if needed
  }

  applyFilters(): void {
    // Implement filtering logic based on selected filters
    let filters = {
      location: this.selectedLocation,
      category: this.selectedCategory,
      jobType: this.selectedJobType.join(','), // Convert array to string
      datePosted: this.selectedDatePosted,
      experienceLevel: this.selectedExperienceLevel
    };

    this.commonService.filterByLocation(filters.location).subscribe(
      (response) => {
        this.listOffers = response.jobOffers; // Update the job offers based on location filter
      },
      (error) => {
        console.error('Error filtering by location:', error);
      }
    );

    // Repeat for other filters as needed
  }
}