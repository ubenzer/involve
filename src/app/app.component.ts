import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {PostMessageService} from "./post-message.service";

@Component({
  moduleId: module.id,
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {
  constructor(pms: PostMessageService) {
    pms.sendMessage("test","123");
  }

  ngOnInit() {
  }

}
