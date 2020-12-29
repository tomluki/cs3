import { CustomerDataService } from 'app/services/customer-data.service';
import { CompanyDataService } from 'app/services/company-data.service';
import { FiltersService } from 'app/services/filters.service';
import { TokenManagerService } from './../../services/token-manager.service';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DataService } from 'app/services/data.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionAlertComponent } from 'app/components/action-alert/action-alert.component';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

   
    
    constructor(private customerDataService:CustomerDataService,private companyDataService:CompanyDataService,public filterService:FiltersService,public _modalService: NgbModal ,public location: Location,private dataService:DataService, private element : ElementRef,private router:Router ,private tokenManagerService:TokenManagerService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        
       

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
      
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isComponent(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/admin'||titlee === '/customer'||titlee === '/company' ) {
            return true;
        }
        else {
            return false;
        }
    }
     logout():void{
        const message = 'Are you sure you want to logout?'
        const result =  this._modalService.open(ActionAlertComponent);
        result.componentInstance.titlee = 'Logout'
        result.componentInstance.message = 'Are you sure you want to logout?'
        result.result.then((result) => {
            this.dataService.deleteAllCoupons();
            this.filterService.deleteCoupons();
            this.companyDataService.deleteAllCompanies();
            this.customerDataService.deleteAllCustomers();
            this.tokenManagerService.deleteLoginResponse();
            this.router.navigate(['/home']); 
        }).catch(()=>{})
      
     }
    }

