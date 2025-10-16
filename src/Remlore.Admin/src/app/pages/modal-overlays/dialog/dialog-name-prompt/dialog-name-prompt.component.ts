import { Component } from "@angular/core";
import {
  NbButtonModule,
  NbCardModule,
  NbDialogRef,
  NbInputModule,
} from "@nebular/theme";

@Component({
  selector: "rl-dialog-name-prompt",
  templateUrl: "dialog-name-prompt.component.html",
  styleUrls: ["dialog-name-prompt.component.scss"],
  imports: [NbCardModule, NbButtonModule, NbInputModule],
})
export class DialogNamePromptComponent {
  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name: string) {
    this.ref.close(name);
  }
}
