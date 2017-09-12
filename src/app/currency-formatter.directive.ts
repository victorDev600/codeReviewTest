import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { CurrencyPipe } from "./currency.pipe";

@Directive({
  selector: '[appCurrencyFormatter]',
  providers: [CurrencyPipe],
})
export class CurrencyFormatterDirective implements OnInit {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    setTimeout(()=>this.el.value = this.el.value == '' ? '' : '$'+this.currencyPipe.transform(this.el.value.replace("$", "")),600);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
  	value = value.replace("$", "");
  	if(value!=''){
    	this.el.value = '$'+this.currencyPipe.parse(value); // opossite of transform
  	}
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
  	value = value.replace("$", "");
  	if(value!=''){
    	this.el.value = '$'+this.currencyPipe.transform(value);
  	}
  }

}
