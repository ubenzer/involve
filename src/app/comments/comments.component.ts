import {Component, OnInit, OnDestroy} from "@angular/core";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {CommentFormComponent} from "../comment-form/comment-form.component";
import {ActivatedRoute} from "@angular/router";
import {CommentSingleComponent} from "../comment-single/comment-single.component";
import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: "app-comments",
  templateUrl: "comments.component.html",
  styleUrls: ["comments.component.css"],
  directives: [CommentFormComponent, CommentSingleComponent]
})
export class CommentsComponent implements OnInit, OnDestroy {
  private combinedSub: any;

  private contentId: string;
  private userId: string;

  commentsRef: FirebaseListObservable<any[]>;
  constructor(
    private af: AngularFire,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.combinedSub = Observable.combineLatest(this.af.auth, this.route.params)
      .filter((args) => args[0] != null)
      .subscribe((args) => {
        let auth = args[0];
        let routeParams = args[1];

        this.contentId = routeParams["id"];
        this.userId = auth.uid;
        this.commentsRef = this.af.database.list(`/entry/byContentId/${this.contentId}/`);
      });
  }

  ngOnDestroy() {
    this.combinedSub.unsubscribe();
  }
}
