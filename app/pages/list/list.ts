import {Page, Modal, NavController, MenuController} from 'ionic-angular';
import {TopicService} from '../../services/topics';
import {DetailPage} from '../detail/detail';

@Page({
  templateUrl: './build/pages/list/list.html',
  providers: [TopicService]
})

export class ListPage {
  topic: Array<any>;
  topicService: any;
  nav: any;
  menu: any;
  page: number;
  constructor(
      topicService: TopicService,
      nav: NavController,
      menu: MenuController) { 
        this.nav = nav;
        this.menu = menu;
        this.topic = null;
        this.topicService = topicService;
        this.page = 2;
  }
  
  onPageWillEnter () {
        this.getTopics(1 ,(data) => {
            this.topic = data;
        });
  }
  
  doRefresh (refresher) {
        this.getTopics(1 ,(data) => {
            this.topic = data;
            refresher.complete();
        });
  }
  
  doInfinite (infiniteScroll) {
        this.getTopics(this.page++ ,(data) => {
            Array.prototype.push.apply(this.topic, data);
            infiniteScroll.complete();
        });
  }
  
  getTopics (page: number, cb: any) {
        this.topicService.getTopics(page).subscribe(
        data => {
            cb && cb(data.data);
        },
        err => {console.log(err)});
  }
  
  goDetail (item) {
      this.nav.push(DetailPage, {
          id: item.id
      });
  }
  
  openMenu() {
      this.menu.open();
  }
  
  openModal() {
      let pushModal = Modal.create(null);
      this.nav.present(pushModal);
  }
}
