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

register();

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
    this.getAllActivities();
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

  getAllActivities(): void {
    this.assetService.getAllActivities().subscribe(data => {
      this.activities = data;
    });
  }

  showDetails(activity: Activity): void {
    this.selectedActivity = activity;
    this.isModalVisible = true;
  }
  hideDetails(): void {
    this.isModalVisible = false;
  }
}
