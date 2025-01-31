import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ApiResponseModel, Application, Loan } from '../../model/application.model';
import { json } from 'stream/consumers';
import { MasterService } from '../../service/master.service';
import { error } from 'console';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loan-application.component.html',
  styleUrl: './loan-application.component.css'
})
export class LoanApplicationComponent {

  application: Application = new Application();
  loan: Loan = new Loan();

  masterSrv = inject(MasterService);

  addLoan() {
    const strObj = JSON.stringify(this.loan);
    const newObj = JSON.parse(strObj)
    this.application.Loans.unshift(newObj);
  }

  onSubmit(){
    debugger;
    this.masterSrv.addNewApplication(this.application).subscribe((Result:ApiResponseModel)=>{
      if(Result.result){
        alert("Loan Application Success")
      } else{
        alert(Result.message)
      }
    }, error=>{
      alert(error)
    })
  }

}
