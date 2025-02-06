import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LayoutComponent } from './component/layout/layout.component';
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
import { RegisterRecruiterComponent } from './component/register-recruiter/register-recruiter.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { AddCityComponent } from './component/add-city/add-city.component';
import { AddCompanyComponent } from './component/add-company/add-company.component';
import { AddLevelComponent } from './component/add-level/add-level.component';
import { AddSectorComponent } from './component/add-sector/add-sector.component';
import { ListSectorComponent } from './component/list-sector/list-sector.component';
import { ListCategoryComponent } from './component/list-category/list-category.component';
import { ListCityComponent } from './component/list-city/list-city.component';
import { ListCompanyComponent } from './component/list-company/list-company.component';
import { ListLevelComponent } from './component/list-level/list-level.component';
import { PackagesComponent } from './component/packages/packages.component';
import { ProfilComponent } from './component/profil/profil.component';
import { SuperAdminOffersComponent } from './component/super-admin-offers/super-admin-offers.component';
import { SuperAdminDashboardComponent } from './component/super-admin-dashboard/super-admin-dashboard.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'registerRecruiter', component: RegisterRecruiterComponent },


  {

    path: 'home',component: HomeComponent,
    children: [
      { path: '', component: LayoutComponent },
      { path: 'faqs', component: FaqComponent },
      { path: 'candidateDashboard', component: CandidateDashboardComponent },
      { path: 'adminDashboard', component: AdminDashboardComponent },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'postjob', component: PostJobComponent },
      { path: 'joblist', component: JobListComponent },
      { path: 'jobdetails/:id', component: JobDetailsComponent },//jobDetails with id  
      // { path: 'jobdetails', component: JobDetailsComponent },
      { path: 'companylist', component: CompanyListComponent },
      { path: 'companyDetails/:id', component: CompanyDetailsComponent },
      //{ path: 'companyDetails/:id', component: CompanyDetailsComponent },//CompanyDetails with id
      { path: 'candidatelist', component: CandidateListComponent },
      { path: 'candidateDetails', component: CandidateDetailsComponent },
      //{ path: 'candidateDetails/:id', component: CandidateDetailsComponent },//candidateDetails with id
      { path: 'bloglist', component: BlogListComponent },
      { path: 'blogDetails', component: BlogDetailsComponent },
      //{ path: 'blogDetails/:id', component: BlogDetailsComponent },//blogDetails with id
      { path: 'addCompany', component: AddCompanyComponent },
      { path: 'profil', component: ProfilComponent },

      { path: 'superAdmin/dashboard', component: SuperAdminDashboardComponent },
      { path: 'superAdmin/addCategory', component: AddCategoryComponent },
      { path: 'superAdmin/addCity', component: AddCityComponent },
      { path: 'superAdmin/addLevel', component: AddLevelComponent },
      { path: 'superAdmin/addSector', component: AddSectorComponent },
      { path: 'superAdmin/sectorList', component: ListSectorComponent },
      { path: 'superAdmin/categoryList', component: ListCategoryComponent },
      { path: 'superAdmin/cityList', component: ListCityComponent },
      { path: 'superAdmin/companyList', component: ListCompanyComponent },
      { path: 'superAdmin/levelList', component: ListLevelComponent },
      { path: 'superAdmin/packages', component: PackagesComponent },
      { path: 'superAdmin/offers', component: SuperAdminOffersComponent },

















    ]

  },
  { path: '', redirectTo:'/home',pathMatch:'full' },
  { path: '**', component:Error404Component },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
