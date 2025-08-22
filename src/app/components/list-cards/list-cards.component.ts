import {
  Component,
  OnInit,
  inject,
  HostListener,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  PLATFORM_ID, OnDestroy
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {register, SwiperContainer} from 'swiper/element/bundle';
import { Activity } from '../../core/types/Activity';
import { ActivityService } from '../../core/service/activity-service';
import { CardsComponent } from '../cards/cards.component';
import {Pagination} from '../../core/types/Pagination';
import {ActivityModal} from '../activity-modal/activity-modal';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {tap} from 'rxjs/operators';

register();

interface ActivitiesState {
  loading: boolean;
  activities: Pagination<Activity> | null;
}

@Component({
  selector: 'app-list-cards',
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    CardsComponent,
    ActivityModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.scss']
})
export class ListCardsComponent implements OnInit, OnDestroy {
  activitiesState$!: Observable<ActivitiesState>;

  private readonly platformId = inject(PLATFORM_ID);
  private assetService = inject(ActivityService);
  activities: Pagination<Activity> = {} as Pagination<Activity>;
  isMobile = false;

  @ViewChild('swiperContainer') swiperContainerRef!: ElementRef<SwiperContainer>;

  isModalVisible = false;
  selectedActivity: Activity | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
    this.loadActivities();
  }

  ngOnDestroy(): void {
    if (this.swiperContainerRef?.nativeElement?.swiper) {
      this.swiperContainerRef.nativeElement.swiper.destroy(true, true);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  loadActivities(): void {
    this.activitiesState$ = this.assetService.getAllActivities().pipe(
      map(data => ({ loading: false, activities: data })),
      tap(state => {
        if (isPlatformBrowser(this.platformId) && state.activities && state.activities.data.length > 0) {
          setTimeout(() => this.initializeOrUpdateSwiper(), 0);
        }
      }),
      startWith({ loading: true, activities: null }),
      catchError(() => of({ loading: false, activities: null }))
    );
  }

  showDetails(activity: Activity): void {
    this.selectedActivity = activity;
    this.isModalVisible = true;
  }

  hideDetails(): void {
    this.isModalVisible = false;
  }


  initializeOrUpdateSwiper(): void {
    if (!this.swiperContainerRef?.nativeElement) return;

    if (this.swiperContainerRef.nativeElement.swiper) {
      this.swiperContainerRef.nativeElement.swiper.update();
      return;
    }

    const swiperOptions = {
      slidesPerView: 1,
      spaceBetween: 16,
      centeredSlides: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        769: {
          slidesPerView: 3,
          spaceBetween: 20,
          centeredSlides: false,
          pagination: false,
          navigation: { nextEl: '.carousel__nav-next', prevEl: '.carousel__nav-prev' },
        }
      },
    };
    Object.assign(this.swiperContainerRef.nativeElement, swiperOptions);
    this.swiperContainerRef.nativeElement.initialize();
  }
}
