import { Component, EventEmitter } from '@angular/core';
import { DataService } from "./data.service";
import { MaterializeAction } from 'angular2-materialize';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	constructor(private dataService: DataService) {}

	app_id : any;
	linecreditloanid : any;
	postData : any = {
		"app_id" : "",
		"linecreditloanid" : "",
	    "data" : "",
	};

	ngOnInit(){
		this.app_id = this.getParameterByName('app_id');
		this.linecreditloanid = this.getParameterByName('linecreditloanid');
		console.log(this.linecreditloanid);
		this.linecreditloanid = this.linecreditloanid == null ? 0 : this.linecreditloanid;
		console.log(this.linecreditloanid);
		this.dataService.getDrawdown(this.app_id,this.linecreditloanid);
	}

	getParameterByName(name) {
		let url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	DatePickerOptions = {
		format: 'd-mmm-yyyy',
	}

	saveData(){
		this.postData.app_id = this.app_id;
		this.postData.linecreditloanid = this.linecreditloanid;
	    this.postData.data = JSON.stringify(this.data);
		this.dataService.saveDrawdown(this.postData);
	}

	get data(){
		return this.dataService.data;
	}

	set data(value:any){
		this.dataService.data = value; 
	}

	modalActions = new EventEmitter<string|MaterializeAction>();

	openModal() {
	    this.modalActions.emit({action:"modal",params:['open']});
	}

	closeModal() {
	    this.modalActions.emit({action:"modal",params:['close']});
	}

	witnessToggle(){
		this.data.show_witness = !this.data.show_witness;
	}

	principalCal(){
		this.data.new_amount = 0;
		if(this.data.drawdown_amount != ''){
			this.data.new_amount = this.data.new_amount + parseInt(this.data.drawdown_amount);
		}
		if(this.data.current_balance != ''){
			this.data.new_amount = this.data.new_amount + parseInt(this.data.current_balance);
		}
		if(this.data.admin_fee != ''){
			this.data.new_amount = this.data.new_amount + parseInt(this.data.admin_fee);
		}
		if(this.data.valuation_fee != ''){
			this.data.new_amount = this.data.new_amount + parseInt(this.data.valuation_fee);
		}
		if(this.data.verification_fee != ''){
			this.data.new_amount = this.data.new_amount + parseInt(this.data.verification_fee);
		}
		if(this.data.registration_fee != ''){
			this.data.new_amount = this.data.new_amount + parseInt(this.data.registration_fee);
		}
		if(this.data.referrer_fee != ''){
			this.data.new_amount = this.data.new_amount + parseInt(this.data.referrer_fee);
		}				
	}

	Signature(){
		this.dataService.sig();
	}

}

