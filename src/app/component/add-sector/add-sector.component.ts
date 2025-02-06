import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent implements OnInit {
  form!: FormGroup;
  superadminId: number | null = null;

  constructor(private fb: FormBuilder, private router: Router, private sectorService: SuperAdminService,private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.loadSuperAdminId();
  }

  loadSuperAdminId(): void {
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.superadminId = user.id; // Extract superadminId
      console.log('Super Admin ID:', this.superadminId);
    } else {
      console.error('User  not found in local storage');
    }
  }

  get nameControl() {
    return this.form.get('name');
  }

  get descriptionControl() {
    return this.form.get('description');
  }

  addSector(): void {
    if (this.form.valid) {
        const sectorData = {
            name: this.form.value.name,
            description: this.form.value.description
        };

        if (this.superadminId) {
            this.sectorService.createSector(sectorData, this.superadminId).subscribe(
                response => {
                    console.log('Sector added successfully:', response);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Sector added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.router.navigate(['/home/superAdmin/sectorList']); 
                    });
                },
                error => {
                    console.error('Error adding sector:', error);
                    
                    // Check if the error status is 409 Conflict
                    if (error.status === 409) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Sector name must be unique. Please choose a different name.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        // Show generic error alert for other errors
                        Swal.fire({
                            title: 'Error!',
                            text: 'Error adding sector: ' + error.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }
            );
        } else {
            console.error('Super Admin ID not found in local storage');
            Swal.fire({
                title: 'Error!',
                text: 'Super Admin ID not found in local storage.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } else {
        // If the form is invalid, show a SweetAlert warning
        console.log('Form is invalid');
        Swal.fire({
            title: 'Warning!',
            text: 'Please fill in all required fields.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
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