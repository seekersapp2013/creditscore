import { Model } from 'radiks';

export default class Transaction extends Model {
    static className = 'Transaction';

    static schema = {
      loanAmount: Number,
      meetingDay: String,
      mainSavings: Number,
      disbursementDate: String,
      schemeName: String,//MSP
      loanType: String,//Soft
      serviceCharge: Number,//Amount of Service Charge
      serviceCharge2: Number,//Loan + Service Charge
      totalInstallments: Number,//Total Number of Installments
      amountPayable: Number,//Amount Per Weekly Installment
      date: String,//Weekly Loan Dates
      manDeposit: Number,//Mandatory Deposit
      volDeposit: Number,//Voluntary Deposit
      interestSavings: Number,//Interest on interestSavings
      withdrawal: Number,//withdrawal/return
      balance: Number,//withdrawal Balance
      installmentNumber: Number,//
      repayment: Number,//Repayment
      balance2: Number,//Repayment balance
      agentSignature: Number,// Agent signature
    }

}
