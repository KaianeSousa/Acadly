import { Component, OnInit, inject, HostListener, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { register } from 'swiper/element/bundle';
import { Activity } from '../../core/types/Activity';
import { ActivityService } from '../../core/service/activity-service';
import { CardsComponent } from '../cards/cards.component';

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
  private assetService = inject(ActivityService);
  activities: Activity[] = [];
  isMobile = false;

  @ViewChild('swiperContainer') swiperContainerRef!: any;

  ngOnInit(): void {
    this.checkScreen();
    this.getAllActivities();
  }

  ngAfterViewInit(): void {
    this.initSwiperIfNeeded();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
    this.initSwiperIfNeeded();
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
  }

  getAllActivities(): void {
    this.assetService.getAllActivities().subscribe(data => {
      this.activities = data;
      this.initSwiperIfNeeded();
    });
  }

  private initSwiperIfNeeded() {
    if (this.swiperContainerRef && this.activities.length > 0) {
      this.initSwiper();
    }
  }

  private initSwiper() {
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

    if (!this.swiperContainerRef.nativeElement.swiper) {
      this.swiperContainerRef.nativeElement.initialize();
    } else {
      this.swiperContainerRef.nativeElement.swiper.update();
    }
  }
}