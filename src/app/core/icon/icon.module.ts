import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faStar, 
  faCalendar, 
  faGift, 
  faChartBar, 
  faCog, 
  faDoorOpen, 
  faRotate, 
  faDownload, 
  faClock, 
  faCheck, 
  faTimes, 
  faChartLine, 
  faLocationDot, 
  faPhone, 
  faBolt, 
  faFile, 
  faGem, 
  faUser, 
  faEnvelope, 
  faLock, 
  faRightToBracket, 
  faUserPlus,
  faArrowRight,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class IconModule {
  static icons = {
    faStar,
    faCalendar,
    faGift,
    faChartBar,
    faCog,
    faDoorOpen,
    faRotate,
    faDownload,
    faClock,
    faCheck,
    faTimes,
    faChartLine,
    faLocationDot,
    faPhone,
    faBolt,
    faFile,
    faGem,
    faUser,
    faEnvelope,
    faLock,
    faRightToBracket,
    faUserPlus,
    faArrowRight,
    faCircleExclamation
  };
}
