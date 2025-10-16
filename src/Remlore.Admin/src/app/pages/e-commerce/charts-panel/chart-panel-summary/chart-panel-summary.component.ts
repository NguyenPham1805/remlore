import { Component, Input } from "@angular/core";

@Component({
  selector: "rl-chart-panel-summary",
  styleUrls: ["./chart-panel-summary.component.scss"],
  template: `
    <div class="summary-container">
      @for (item of summary; track $index) {
      <div>
        <div>{{ item.title }}</div>
        <div class="h6">{{ item.value }}</div>
      </div>
      }
    </div>
  `,
})
export class ChartPanelSummaryComponent {
  @Input() summary: { title: string; value: number }[] = [];
}
