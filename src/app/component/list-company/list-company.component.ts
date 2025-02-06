import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonAdminService } from 'src/app/services/common-admin.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {
  companies: any[] = []; // Array to hold the list of companies

  loading: boolean = true; // Loading state


  constructor(private companyService: CommonService,private serv: CommonAdminService, private router: Router,private authService: AuthService) { }


  ngOnInit(): void {

    this.getAllCompanies();

  }

  signOut(): void {
    const refreshToken = localStorage.getItem('refreshtoken'); // Get refresh token from local storage
  
    if (refreshToken) {
      this.authService.signout(refreshToken).subscribe(
        (response) => {
          console.log('Sign out successful:', response);
  
          // Remove all relevant items from local storage
          localStorage.removeItem('userconnect'); // Remove user data
          localStorage.removeItem('token'); // Remove access token
          localStorage.removeItem('refreshtoken'); // Remove refresh token
          localStorage.removeItem('state'); // Remove any other state if necessary
  
          this.router.navigate(['/login']); // Redirect to login page
        },
        (error) => {
          console.error('Error during sign out:', error);
        }
      );
    } else {
      console.log('No refresh token found');
      // Optionally, you can still clear local storage and redirect
      localStorage.removeItem('userconnect');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshtoken');
      localStorage.removeItem('state');
      this.router.navigate(['/login']);
    }
  }
  getAllCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      (response: any) => {
        // Log the response to check its structure
        console.log('API Response:', response);
  
        // Check if response is an array
        if (Array.isArray(response)) {
          this.companies = response; // Store the retrieved companies
        } else if (response && Array.isArray(response.companies)) {
          this.companies = response.companies; // Adjust based on your actual response structure
        } else {
          console.warn('No companies found in response.');
          this.companies = []; // Set companies to an empty array
        }
  
        this.loading = false; // Set loading to false
      },
      error => {
        console.error('Error fetching companies:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error fetching the companies. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        this.loading = false; // Set loading to false even on error
      }
    );
  }
  viewApplication(companyId: number): void {
    // Navigate to the company detail page with the company ID
    this.router.navigate(['/home/companyDetails', companyId]);
  }
  deleteCompany(companyId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serv.deleteCompany(companyId).subscribe(
          response => {
            console.log('Company deleted successfully:', response);
            // Remove the deleted company from the local array
            this.getAllCompanies();
            Swal.fire('Deleted!', 'Your company has been deleted.', 'success');
          },
          error => {
            console.error('Error deleting company:', error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the company. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }

}