import { Component, EventEmitter, Input, OnChanges, Output, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarComponent implements OnChanges {
  @Input() rating = 0;
  cropWidth = 75;
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  private static readonly STAR_WIDTH = 75;
  private static readonly MAX_RATING = 5;

  ngOnChanges(): void {
    this.cropWidth = this.rating * StarComponent.STAR_WIDTH / StarComponent.MAX_RATING;
  }

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
