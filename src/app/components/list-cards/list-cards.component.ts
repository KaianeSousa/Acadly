import {
  Component,
  OnInit,
  inject,
  HostListener,
  ViewChild,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {register, SwiperContainer} from 'swiper/element/bundle';
import { Activity } from '../../core/types/Activity';
import { ActivityService } from '../../core/service/activity-service';
import { CardsComponent } from '../cards/cards.component';
import {Pagination} from '../../core/types/Pagination';

register();

@Component({
  selector: 'app-list-cards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    CardsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.scss']
})
export class ListCardsComponent implements OnInit, AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private assetService = inject(ActivityService);
  activities: Pagination<Activity> = {
    data: [],
    pagination: {
      page: 0,
      pageSize: 0,
      totalElements: 0,
      totalPages: 0,
    },
  };
  isMobile = false;
  private viewInitialized = false;
  private swiperInitialized = false;

  @ViewChild('swiperContainer') swiperContainerRef!: ElementRef<SwiperContainer>;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
    this.getAllActivities();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.initSwiperIfNeeded();
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
    this.initSwiperIfNeeded();
  }

  checkScreen() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  getAllActivities(): void {
      this.assetService.getAllActivities().subscribe(data => {
        this.activities = data;
        this.initSwiperIfNeeded();
      });
  }

  private initSwiperIfNeeded() {
    if (this.activities.data.length > 0 && this.viewInitialized) {
      this.initSwiper();
    }
  }

  private initSwiper() {
    if (!this.swiperContainerRef?.nativeElement) {
      return;
    }

    if (this.swiperInitialized) {
      this.swiperContainerRef.nativeElement.swiper?.update();
      return;
    }
    const swiperParams = this.isMobile
      ? {
          slidesPerView: 1,
          spaceBetween: 16,
          centeredSlides: true,
          pagination: {
            clickable: true,
            type: 'bullets',
          },
          navigation: false,
          breakpoints: {
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 1.5,
            },
          },
        }
      : {
          slidesPerView: 3,
          spaceBetween: 20,
          centeredSlides: false,
          pagination: false,
          navigation: {
            nextEl: '.carousel__nav-next',
            prevEl: '.carousel__nav-prev',
          },
          breakpoints: {
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
        };

    Object.assign(this.swiperContainerRef.nativeElement, swiperParams);


    this.swiperInitialized = true;
  }
}
