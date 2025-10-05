import { Component, Input } from '@angular/core';

import { NewsPost } from '../../news.service';

@Component({
    selector: 'ngx-news-post',
    templateUrl: 'news-post.component.html',
    standalone: false
})
export class NewsPostComponent {

  @Input() post: NewsPost;
}
