import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonAdminService } from 'src/app/services/common-admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  cities: any[] = [];
  jobTypes: any[] = [];
  companies: any[] = [];
  categoryOffers: any[] = [];
  jobForm: FormGroup;
  adminId: number | null = null;

  constructor(private fb: FormBuilder, private commonService: CommonService,private commonAdminService: CommonAdminService, private authService: AuthService, private router: Router) {
    // Initialize the form group
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobType: ['', Validators.required],
      offeredSalary: ['', Validators.required],
      experience: ['', Validators.required],
      city: ['', Validators.required],
      company: ['', Validators.required],
      category: ['', Validators.required],

    });

  }
  get jobDescriptionControl() {
    return this.jobForm.get('jobTitle');
  }

  get jobTitleControl() {
    return this.jobForm.get('jobTitle');
  }


  ngOnInit(): void { 
    this.loadCities();
    //this.loadJobTypes();
    this.loadCategoryOffers();
    this.loadAdminId(); // Load adminId from local storage
    if (this.adminId) {
      this.loadCompanies(this.adminId);
    }
  } 

  loadAdminId(): void {
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.adminId = user.id; // Extract adminId
      console.log('Admin ID:', this.adminId);
    } else {
      console.error('User  not found in local storage');
    }
  }
  loadCategoryOffers(): void {
    this.commonService.getAllCategoryOffers().subscribe(
      response => {
        this.categoryOffers = response.categoryOffers;
        console.log('Category Offers:', this.categoryOffers);
      },
      error => {
        console.error('Error fetching category offers:', error);
      }
    );
  }
  onSubmit(): void {
      //add categoriesoffer
    if (this.jobForm.valid) {
      const jobData = {
        title: this.jobForm.value.jobTitle,
        description: this.jobForm.value.jobDescription,
        critere: "Expérience avec Spring Boot", // Assuming you want to keep this static value
        experience: this.jobForm.value.experience,
        jobType: this.jobForm.value.jobType,
        salary: parseFloat(this.jobForm.value.offeredSalary.replace('$', '')) // Remove the dollar sign and convert to Float
      };
  
      // Retrieve adminId from local storage
      const userConnect = localStorage.getItem('userconnect');
      const adminId = userConnect ? JSON.parse(userConnect).id : null; // Extract adminId
  console.log('adminId:', adminId);

      const categoryOfferId =  this.jobForm.value.category;
      const companyId = this.jobForm.value.company; // Get company ID from the form
      const cityId = this.jobForm.value.city; // Get city ID from the form
  
      if (adminId) {
        this.commonAdminService.createJobOffer(jobData, adminId, companyId, categoryOfferId, cityId).subscribe(
          response => {
            console.log('Job created successfully:', response);
            this.router.navigate(['/home/joblist']); // Redirect after successful submission
          },
          error => {
            console.error('Error creating job:', error);
          }
        );
      } else {
        console.error('Admin ID not found in local storage');
      }
    } else {
      console.log('Form is invalid');
    }
  }
  loadCities(): void {
    this.commonService.getAllCities().subscribe(
      (response) => {
        this.cities = response.cities;
        console.log('Cities:', this.cities);
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  loadJobTypes(): void {

    this.commonService.getAllLevels().subscribe( // Assuming getAllLevels returns job types

      (data) => {

        this.jobTypes = data; // Assuming data is an array of job types
        console.log('Job types:', this.jobTypes);
        

      },

      (error) => {

        console.error('Error fetching job types:', error);

      }

    );

  }
  loadCompanies(adminId: number): void {
    this.commonAdminService.getAllCompaniesByAdminId(adminId).subscribe(
      response => {
        this.companies = response.companies;
        console.log('Companies:', this.companies);
      },
      error => {
        console.error('Error fetching companies:', error);
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
