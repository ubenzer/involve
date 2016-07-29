import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {ActivatedRoute, Router} from "@angular/router";
import {MdInput} from "@angular2-material/input";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card";
import {MdButton} from "@angular2-material/button";
import {Observable} from 'rxjs/Rx';
import {ISubscription} from "rxjs/Subscription";
import {Comment} from '../comment';

@Component({
  moduleId: module.id,
  selector: 'app-comment-form',
  templateUrl: 'comment-form.component.html',
  styleUrls: ['comment-form.component.css'],
  directives: [NgForm, MdInput, MdButton, MD_CARD_DIRECTIVES]
})
export class CommentFormComponent implements OnInit, OnDestroy {
  firebaseNameRef: FirebaseObjectObservable<any> = null;
  firebaseEmailRef: FirebaseObjectObservable<any> = null;
  firebaseCommentRef: FirebaseObjectObservable<any> = null;

  // subscription refs for cleanup
  firebaseNameRefSub: ISubscription = null;
  firebaseEmailRefSub: ISubscription = null;
  firebaseCommentRefSub: ISubscription = null;
  combinedSub: ISubscription = null;

  // internal data
  userId: string = null;
  contentId: string = null;

  // form data
  name: string = "";
  email: string = "";
  comment: string = "";

  updateCurrentComment(comment: string) {
    this.firebaseCommentRef.set(comment);
  }

  updateName(name: string) {
    this.firebaseNameRef.set(name);
  }

  updateEmail(email: string) {
    this.firebaseEmailRef.set(email);
  }

  constructor(
    private af: AngularFire,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.combinedSub = Observable.combineLatest(this.af.auth, this.route.params)
      .filter((args) => args[0] != null)
      .subscribe((args) => {
      let auth = args[0];
      let routeParams = args[1];

      this.contentId = routeParams["id"];
      this.userId = auth.uid;

      // cleanup leftovers from previous states
      this.cleanup();

      this.firebaseCommentRef = this.af.database.object(`/user/${this.userId}/entryDraftByContentId/${this.contentId}/entry`);
      this.firebaseCommentRefSub = this.firebaseCommentRef
        .subscribe(data => {
          if (typeof data.$value !== "string") { return; }
          this.comment = <string>data.$value;
        });

      this.firebaseNameRef = this.af.database.object(`/user/${this.userId}/name`);
      this.firebaseNameRefSub = this.firebaseNameRef
        .subscribe(data => {
          if (!data.$value) { return; }
          this.name = <string>data.$value;
        });

      this.firebaseEmailRef = this.af.database.object(`/user/${this.userId}/email`);
      this.firebaseEmailRefSub = this.firebaseEmailRef
        .subscribe(data => {
          if (!data.$value) { return; }
          this.email = <string>data.$value;
        });
    });
  }

  onSubmit() {
    let contentRef = this.af.database.list(`/entry/byContentId/${this.contentId}`);
    let entry = new Comment(this.contentId, this.name, this.comment, false, new Date(), this.userId);
    let entryId = contentRef.push(entry.getObjectForContentByIdStorage()).key;

    let toVerifyStreamRef = this.af.database.list(`/entry/toVerify`);
    toVerifyStreamRef.push({contentId: this.contentId, entryId: entryId});

    // clear draft
    this.firebaseCommentRef.set("");
  }

  private cleanup() {
    if (this.firebaseCommentRefSub) {
      this.firebaseCommentRefSub.unsubscribe();
    }

    if (this.firebaseNameRefSub) {
      this.firebaseNameRefSub.unsubscribe();
    }

    if (this.firebaseEmailRefSub) {
      this.firebaseEmailRefSub.unsubscribe();
    }
  }
  ngOnDestroy() {
    this.combinedSub.unsubscribe();
    this.cleanup();
  }
}
