import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import { NbButtonModule, NbCardModule, NbWindowService } from "@nebular/theme";
import { WindowFormComponent } from "./window-form/window-form.component";

@Component({
  selector: "rl-window",
  templateUrl: "window.component.html",
  styleUrls: ["window.component.scss"],
  imports: [NbCardModule, NbButtonModule, MatRipple],
})
export class WindowComponent {
  @ViewChild("contentTemplate", { static: true })
  contentTemplate!: TemplateRef<any>;
  @ViewChild("disabledEsc", { read: TemplateRef, static: true })
  disabledEscTemplate!: TemplateRef<HTMLElement>;

  constructor(private windowService: NbWindowService) {}

  openWindow(contentTemplate: TemplateRef<any>) {
    this.windowService.open(contentTemplate, {
      title: "Window content from template",
      context: {
        text: "some text to pass into template",
      },
    });
  }

  openWindowForm() {
    this.windowService.open(WindowFormComponent, { title: `Window` });
  }

  openWindowWithoutBackdrop() {
    this.windowService.open(this.disabledEscTemplate, {
      title: "Window without backdrop",
      hasBackdrop: false,
      closeOnEsc: false,
    });
  }
}
