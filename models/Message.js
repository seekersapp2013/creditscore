import { Model } from 'radiks';

export default class Message extends Model {
    static className = 'Message';

    static schema = {
      name: String,
      age: Number,
      phone: Number,
      address: String,
      bType: String,
      sales: Number,
      KinName: String,
      gurantor: String,
      gurantorAddress: String,
      gurantorBusiness: String,
      gurantorPhone: Number,
      loanAmount: Number,
      customerSignature: String,
      gurantorSignature: String,
      debitHistory: Boolean,
      hasDebt: {
        type: Boolean,
        decrypted: false // all users will know if this record likes dogs!
      }
    }
  
  
}
