import {Component, OnInit, Input} from '@angular/core';
import {MdCard} from "@angular2-material/card";
import {Comment} from "../comment";
import {FirebaseAuth} from "angularfire2";

@Component({
  moduleId: module.id,
  selector: 'comment-single',
  templateUrl: 'comment-single.component.html',
  styleUrls: ['comment-single.component.css'],
  directives: [MdCard]
})
export class CommentSingleComponent implements OnInit {
  @Input() comment: Comment;

  private sub = null;

  private userId: string = null;
  private showComment: boolean = false;

  constructor(private auth: FirebaseAuth) { }

  ngOnInit() {
    this.sub = this.auth.subscribe((auth) => {
      this.userId = auth.uid;
      this.showComment = this.comment.isPublished || (this.comment.userId === this.userId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
