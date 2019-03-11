import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appCountdown]'
})
export class CountdownDirective implements OnInit, OnDestroy {
  /** Состояние счетчика */
  private isActive: boolean;
  @Input() set appCountdown(value: string) {
    this.isActive = Boolean(value);
  }

  /** Дата остановки отсчета */
  private endDat: number;
  @Input() set appCountdownEndDat(value: string) {
    this.endDat = Date.parse(value);
  }

  private timer;

  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) { }

  ngOnInit(): void {
    if (!this.isActive) {
      this.container.clear();
      return;
    }

    // Вывод на экран первоначального значения
    const view = this.container.createEmbeddedView(this.template);
    let secondsLeft = this.getLeftSeconds(this.endDat);

    view.rootNodes[0].innerText = this.convertDate(secondsLeft);

    this.timer = setInterval(() => {
      secondsLeft = this.getLeftSeconds(this.endDat);
      if (secondsLeft <= 0) {
        return clearInterval(this.timer);
      }

      view.rootNodes[0].innerText = this.convertDate(secondsLeft);
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  /**
   * Определить сколько осталось секунд до остановки счетчика
   * @param endDat - дата/время остановки счетчика
   */
  private getLeftSeconds(endDat: number): number {
    return  (endDat - Date.now()) / 1000;
  }

  /**
   * Конвертировать секунды в время оставшегося до остановки счетчика
   * @param seconds - к=во секунд
   */
  private convertDate(seconds: number): string {
    if (seconds <= 0) {
      return '0h 0m 0s';
    }

    // Выделить из "seconds" дни, часы, минуты и секунды
    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    return days ? days.toLocaleString() : `${hours}h ${minutes}m ${seconds}s` ;
  }

}
