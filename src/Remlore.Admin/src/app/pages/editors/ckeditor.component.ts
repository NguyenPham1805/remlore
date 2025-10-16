import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  CKEditorCloudConfig,
  CKEditorCloudResult,
  CKEditorModule,
  loadCKEditorCloud,
} from "@ckeditor/ckeditor5-angular";
import { NbCardModule } from "@nebular/theme";
import type {
  ClassicEditor,
  EditorConfig,
} from "https://cdn.ckeditor.com/typings/ckeditor5.d.ts";

@Component({
  selector: "rl-ckeditor",
  template: `
    <nb-card>
      <nb-card-header> CKEditor </nb-card-header>
      <nb-card-body>
        @if (Editor && config) {
        <ckeditor
          data="<p>Hello, world!</p>"
          [editor]="Editor"
          [config]="config"
        >
        </ckeditor>
        }
      </nb-card-body>
    </nb-card>
  `,
  imports: [NbCardModule, CKEditorModule, FormsModule],
})
export class CKEditorComponent {
  public Editor: typeof ClassicEditor | null = null;

  public config: EditorConfig | null = null;

  public ngOnInit(): void {
    loadCKEditorCloud({
      version: "47.0.0",
      premium: false,
    }).then(this._setupEditor.bind(this));
  }

  private _setupEditor(cloud: CKEditorCloudResult<CKEditorCloudConfig>) {
    const { ClassicEditor, Essentials, Paragraph, Bold, Italic } =
      cloud.CKEditor;

    this.Editor = ClassicEditor;
    this.config = {
      licenseKey:
        "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3OTE1OTAzOTksImp0aSI6Ijk2MGI0MTI3LWJkYjgtNGMxYy1iNmVlLTI1OTM4NDJjNWI0NiIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInJlbW92ZUZlYXR1cmVzIjpbIlBCIiwiUkYiLCJTQ0giLCJUQ1AiLCJUTCIsIlRDUiIsIklSIiwiU1VBIiwiQjY0QSIsIkxQIiwiSEUiLCJSRUQiLCJQRk8iLCJXQyIsIkZBUiIsIkJLTSIsIkZQSCIsIk1SRSJdLCJ2YyI6IjAxMzQ1NmRiIn0.6FAgGiqwOv80alrnjKFEcM3ox_9YYVEqtwwvOATOdH0lqnWTPNVL83EB0q9IEkDC7p19CvERfS7wsFN2HU8BHg",
      plugins: [Essentials, Paragraph, Bold, Italic],
      toolbar: ["undo", "redo", "|", "bold", "italic", "|"],
    };
  }
}
