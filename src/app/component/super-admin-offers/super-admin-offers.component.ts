import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonAdminService } from 'src/app/services/common-admin.service';
import { CommonService } from 'src/app/services/common.service';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super-admin-offers',
  templateUrl: './super-admin-offers.component.html',
  styleUrls: ['./super-admin-offers.component.css']
})
export class SuperAdminOffersComponent implements OnInit {
  pendingJobOffers: any[] = []; // Array to hold the pending job offers
  loading: boolean = true; // Loading state

  constructor(private jobService: SuperAdminService,private serv: CommonAdminService, private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.getPendingJobOffers(); // Fetch pending job offers when the component initializes
  }
  approveOffer(id: number): void {
    this.jobService.markJobAsOpen(id).subscribe(
      response => {
        console.log('Job marked as open successfully:', response);
        // Optionally refresh the list of job offers
        this.getPendingJobOffers();
        Swal.fire('Approved!', 'The job has been marked as open.', 'success');
      },
      error => {
        console.error('Error marking job as open:', error);
        // Log the error response for debugging
        if (error.error && error.error.message) {
          Swal.fire({
            title: 'Error!',
            text: error.error.message, // Display specific error message from the server
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'There was an error marking the job as open. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }
  rejectOffer(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serv.deleteJobOffer(id).subscribe(
          response => {
            console.log('Job offer rejected successfully:', response);
            // Refresh the list of job offers
            this.getPendingJobOffers();
            Swal.fire('Rejected!', 'The job offer has been rejected.', 'success');
          },
          error => {
            console.error('Error rejecting job offer:', error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error rejecting the job offer. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
  getPendingJobOffers(): void {
    this.jobService.getPendingJobOffers().subscribe(
      (response: any) => {
        // Check if the response has the 'jobOffers' property and it is an array
        if (response && Array.isArray(response.jobOffers)) {
          this.pendingJobOffers = response.jobOffers; // Store the retrieved job offers
          console.log("Pending job offers", this.pendingJobOffers);
          
        } else {
          console.error('Expected an array of job offers, but received:', response);
          this.pendingJobOffers = []; // Fallback to an empty array
        }
        this.loading = false; // Set loading to false
      },
      error => {
        console.error('Error fetching pending job offers:', error);
        Swal.fire({
          title: 'warning!',
          text: 'There was an error fetching the pending job offers. Please try again later.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        this.loading = false; // Set loading to false even on error
      }
    );
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
}