import { Component, HostListener } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from ' /../../src/environments/environment';
//import { PagerService } from './../app/common/pagination/pagination';//pagination
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { TrackScrollDirective } from './../app/common/scroll.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  beerArray: any[];
  beerArrayTemp: any[];
  beerArrayDetailsInfo: any[];
  beerInfo: boolean;
  closeResult: string;
  _timeout: any = null;

  public constructor(private http: Http, private modalService: NgbModal) {//private pagerService: PagerService
    this.beerArray = [];

  }

  public ngOnInit() {
    this.getData();

  }

  //pagination
  // pager object
  pager: any = {
    currentPage: 1
  };
  // paged items
  // pagedItems: any[];
  // setPage(page: number) {
  //   if (page < 1 || page > this.pager.totalPages) {
  //     return;
  //   }
  //   if (page !== this.pager.currentPage) {
  //     console.log('page:' + page);
  //     console.log('this.pager.currentPage:' + this.pager.currentPage);
  //     this.pager.currentPage = page
  //     this.getData();
  //   } else {
  //     // get pager object from service
  //     this.pager = this.pagerService.getPager(this.pager.totalItems, page, this.pager.pageSize);
  //     // get current page of items
  //     this.pagedItems = this.beerArray.slice(this.pager.startIndex, this.pager.endIndex + 1);
  //   }
  // }

  getData() {
    this.http.get(
      environment.urlApi + 'beers?page=' + (this.pager.currentPage == undefined ? 1 : this.pager.currentPage) + '&per_page=' + (this.pager.pageSize == undefined ? 20 : this.pager.pageSize),
      {}
    )
      .subscribe(response => {
        this.beerArrayTemp = response.json();
        let respJSON = response.json();

        this.beerArrayTemp.forEach(element => {
          this.beerArray.push(element);
        });
        console.log(this.beerArray);
        // this.pager.totalItems = this.beerArray.length;// respJSON.itemsCount//?
        // this.pager.pageSize = 20
        // this.pager.startIndex = 0;//pagination
        // this.pager.endIndex = 0;//pagination
        // this.pager.pages = []
        // this.pagedItems = []
        // this.setPage(this.pager.currentPage);
        // this.pager.totalPages = respJSON.pageCount

      });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.pager.currentPage++;
        this.getData();
        console.log("load next page");
      }

    }, 500);
  }

  getDataBeerDetails(content, id) {
    this.http.get(
      environment.urlApi + 'beers/' + id,
      {}
    )
      .subscribe(response => {
        //this.beerArray = response.json();        
        let respJSON = response.json();
        this.beerArrayDetailsInfo = respJSON;

        this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        //console.log(this.beerArrayDetailsInfo);
      });
  }

  open(content, id) {
    if (id) {
      this.getDataBeerDetails(content, id);
    }
    // this.modalService.open(content).result.then((result) => { 
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
