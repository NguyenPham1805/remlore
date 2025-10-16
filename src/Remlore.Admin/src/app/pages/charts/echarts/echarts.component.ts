import { Component } from "@angular/core";
import { NbCardModule } from "@nebular/theme";
import { EchartsAreaStackComponent } from "./echarts-area-stack.component";
import { EchartsBarAnimationComponent } from "./echarts-bar-animation.component";
import { EchartsBarComponent } from "./echarts-bar.component";
import { EchartsLineComponent } from "./echarts-line.component";
import { EchartsMultipleXaxisComponent } from "./echarts-multiple-xaxis.component";
import { EchartsPieComponent } from "./echarts-pie.component";
import { EchartsRadarComponent } from "./echarts-radar.component";

@Component({
  selector: "rl-echarts",
  styleUrls: ["./echarts.component.scss"],
  templateUrl: "./echarts.component.html",
  imports: [
    NbCardModule,
    EchartsPieComponent,
    EchartsLineComponent,
    EchartsBarComponent,
    EchartsMultipleXaxisComponent,
    EchartsAreaStackComponent,
    EchartsRadarComponent,
    EchartsBarAnimationComponent,
  ],
})
export class EchartsComponent {}
