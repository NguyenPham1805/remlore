import { Component } from "@angular/core";
import { NbCardModule, NbListModule } from "@nebular/theme";
import { NewsService } from "../news.service";
import { NewsPostPlaceholderComponent } from "./news-post-placeholder/news-post-placeholder.component";
import { NewsPostComponent } from "./news-post/news-post.component";

@Component({
  selector: "rl-infinite-list",
  templateUrl: "infinite-list.component.html",
  styleUrls: ["infinite-list.component.scss"],
  imports: [
    NewsPostComponent,
    NewsPostPlaceholderComponent,
    NbCardModule,
    NbListModule,
  ],
  providers: [NewsService],
})
export class InfiniteListComponent {
  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  constructor(private newsService: NewsService) {}

  loadNext(cardData: any) {
    if (cardData.loading) {
      return;
    }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.newsService
      .load(cardData.pageToLoadNext, this.pageSize)
      .subscribe((nextNews) => {
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }
}
