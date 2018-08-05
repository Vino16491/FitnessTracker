import { Component, OnInit, EventEmitter, Output, OnDestroy } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }
  onClose() {
    this.closeSideNav.emit();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
