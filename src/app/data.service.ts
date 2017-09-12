import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

	constructor(private http : Http) { }

	data : any = {
		"date":"",
		"loan_id":"",
		"drawdown_amount":"",
		"current_balance":"",
		"admin_fee":"",
		"valuation_fee":"",
		"verification_fee":"",
		"registration_fee":"",
		"referrer_fee":"",
		"new_amount":"",
		"repayment_current":"",
		"repayment_new":"",	
		"low_rate_current":"",
		"low_rate_new":"",
		"frequency_current":"",
		"frequency_new":"",
		"maturity_current":"",
		"maturity_new":"",	
		"balloon_current":"",
		"balloon_new":"",
		"show_witness":false,
		"account_holder":"",
		"bank_name":"",
		"bsb":"",
		"account_name":"",
		"borrower_name":"",
		"borrower_name_next":"",
	}

	info : any = {
		"account_no":"",
		"Applicant":[],
	}

	initialData(app_id){
		this.http.get('http://192.168.1.49:81/Pages/Drawdown/service/initialData.php?app_id='+app_id)
		.subscribe((res) => {
			this.info = res ? res.json() : [];
			this.data.account_no = this.info.account_no;
			this.data.Applicant = this.info.Applicant;
			for(let i=0; i<this.data.Applicant.length; i++){
				if(i == 0 ){
					this.data.borrower_name = this.data.Applicant[i]['Name'];
				}
				if(i == 1 ){
					this.data.borrower_name = this.data.borrower_name + ', ' +this.data.Applicant[i]['Name']
				}
				if(i == 2 ){
					this.data.borrower_name_next = this.data.Applicant[i]['Name'];
				}
				if(i == 3 ){
					this.data.borrower_name_next = this.data.borrower_name_next + ', ' +this.data.Applicant[i]['Name']
				}
			}
			this.sig();
		})
	}


	checkCompany(){
		this.data.Company = '';
		for(let i=0; i<this.data.Applicant.length; i++){	
			if(this.data.Applicant[i]['Role'] == 'Company'){
				this.data.Company = this.data.Applicant[i]['Name'];
			}
		}
	}

	sig(){
		this.checkCompany();
		this.data.Sig = [];
		for(let i=0; i<this.data.Applicant.length; i++){
			if(this.data.Applicant[i]['Role'] == 'Director' && this.data.Company != ''){
				let sig = {"Name":this.data.Company, "Note":"Executed by " + this.data.Applicant[i]['Name'] + " as director in accordance with Section 127 of the Corporations Act 2001 (Cth)"}
				this.data.Sig.push(sig); 		
			}
			if(this.data.Applicant[i]['Role'] != 'Company'){
				let sig = {"Name":this.data.Applicant[i]['Name'], "Note":""}
				this.data.Sig.push(sig); 
			}
		}
	}

	getDrawdown(app_id,linecreditloanid){
		this.http.get('http://192.168.1.49:81/Pages/Drawdown/service/GetDrawdown.php?app_id='+app_id+'&linecreditloanid='+linecreditloanid)
		.subscribe((res) => {
			if(res.text() == 'No Data'){
				this.initialData(app_id);
			}
			if(res.text() != 'No Data'){
				let result = res ? res.json() : [];
				this.data =  JSON.parse(result);	
			}
		})
	}

	saveDrawdown(data){
		const req = this.http.post('http://192.168.1.49:81/Pages/Drawdown/service/SaveDrawdown.php', data);
		req.subscribe(res=>{
			if(res.text() == 'Success'){
				alert("Drawdown agreement has been saved");
			}
		});
	}

}
