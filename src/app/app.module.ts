import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LayoutComponent } from './component/layout/layout.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { Error404Component } from './component/error404/error404.component';
import { JobListComponent } from './component/job-list/job-list.component';
import { JobDetailsComponent } from './component/job-details/job-details.component';
import { CompanyListComponent } from './component/company-list/company-list.component';
import { CompanyDetailsComponent } from './component/company-details/company-details.component';
import { CandidateListComponent } from './component/candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './component/candidate-details/candidate-details.component';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { BlogDetailsComponent } from './component/blog-details/blog-details.component';
import { PricingComponent } from './component/pricing/pricing.component';
import { FaqComponent } from './component/faq/faq.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { CandidateDashboardComponent } from './component/candidate-dashboard/candidate-dashboard.component';
import { PostJobComponent } from './component/post-job/post-job.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRecruiterComponent } from './component/register-recruiter/register-recruiter.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    Error404Component,
    JobListComponent,
    JobDetailsComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    CandidateListComponent,
    CandidateDetailsComponent,
    BlogListComponent,
    BlogDetailsComponent,
    PricingComponent,
    FaqComponent,
    AboutUsComponent,
    CandidateDashboardComponent,
    PostJobComponent,
    RegisterRecruiterComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
