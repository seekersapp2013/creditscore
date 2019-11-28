import React from 'react';
import { Flex, Box, Button } from 'rebass';
import PropTypes from 'prop-types';
import { User } from 'radiks';

import Text from '../styled/typography';
import Input from '../styled/input';
import Message from '../models/Message';
import Transaction from '../models/Transaction';
// import Person from '../models/Person';



export default class Feed extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
  }

  static defaultProps = {
    messages: [],
  }

  state = {
    name: '',
    age:'',
    phone:'',
    address: '',
    bName: '',
    bType: '',
    sales:'',
    kinName:'',
    guarantor: '',
    guarantorAddress: '',
    guarantorBusiness: '',
    newMessage: '',
    guarantorPhone: '',
    loanAmount:'',
    customerSignature:'',
    guarantorSignature:'',
    debtHistory:'',
    createdMessageIDs: {},
    createdTransactionIDs: {},
    messages: [],
    currentUser: null,
    meetingDay: '',
    mainSavings: '', 
    disbursementDate: '', 
    schemeName: '', 
    loanType: '', 
    serviceCharge: '', 
    serviceCharge2: '', 
    totalInstallments: '', 
    amountPayable: '', 
    date: '', 
    manDeposit: '', 
    volDeposit: '', 
    interestSavings: '', 
    withdrawal: '', 
    balance: '', 
    installmentNumber: '', 
    repayment: '', 
    balance2: '', 

  }

  componentWillMount() {
    const rawMessages = this.props.messages;
    const messages = rawMessages.map(messageData => new Message(messageData.attrs));
    this.setState({ messages });
  }

  componentDidMount() {
    this.setState({
      currentUser: User.currentUser(),
    });
    Message.addStreamListener(this.newMessageListener.bind(this));
    // Person.addStreamListener(this.newPersonListener.bind(this));
    Transaction.addStreamListener(this.newTransactionListener.bind(this));
  }


  componentWillReceiveProps(newProps) {
    const rawMessages = newProps.messages;
    const messages = rawMessages.map(messageData => new Message(messageData.attrs));
    this.setState({ messages });
    // const rawTransactions = newProps.Transactions;
    // const Transaction = rawTransactions.map(transactionData => new Transaction(transactionData.attrs));
    // this.setState({ transactions });
  }

  newMessageListener(message) {
    const { messages } = this.state;
    if (!this.state.createdMessageIDs[message._id]) {
      messages.unshift(message);
      this.setState({ messages });
    }
  }

  newTransactionListener(transaction) {
    const { transactions } = this.state;
    if (!this.state.createdTransactionIDs[transaction._id]) {
      transactions.unshift(transaction);
      this.setState({ transactions });
    }
  }

  // newPersonListener(person) {
  //   const { persons } = this.state;
  //   if (!this.state.createdPersonIDs[person._id]) {
  //     persons.unshift(person);
  //     this.setState({ persons });
  //   }
  // }

  async submit() {//Next line is important
    const { newMessage, name, age, phone, address, bName, bType, sales, kinName, guarantor, guarantorAddress, guarantorBusiness, guarantorPhone, loanAmount, customerSignature, guarantorSignature, debtHistory, mainSavings, disbursementDate, schemeName, loanType, serviceCharge, serviceCharge2, totalInstallments, amountPayable, date, manDeposit, volDeposit, interestSavings, withdrawal, balance, installmentNumber, repayment, balance2,   } = this.state;
    const message = new Message({
      content: newMessage,
      creditorName: name,
      age: age,
      phone:phone,
      address:address,
      bName: bName,
      bType: bType,
      sales: sales,
      kinName: kinName,
      guarantor: guarantor,
      guarantorAddress: guarantorAddress,
      guarantorBusiness: guarantorBusiness,
      guarantorPhone: guarantorPhone,
      loanAmount: loanAmount,
      customerSignature: customerSignature,
      guarantorSignature: guarantorSignature,
      debtHistory: debtHistory,
      mainSavings: mainSavings, 
      disbursementDate: disbursementDate, 
      schemeName: schemeName, 
      loanType: loanType, 
      serviceCharge: serviceCharge, 
      serviceCharge2: serviceCharge2, 
      totalInstallments: totalInstallments, 
      amountPayable: amountPayable, 
      date: date, 
      manDeposit: manDeposit, 
      volDeposit: volDeposit, 
      interestSavings: interestSavings, 
      withdrawal: withdrawal, 
      balance: balance, 
      installmentNumber: installmentNumber, 
      repayment: repayment, 
      balance2: balance2, 
      createdBy: this.state.currentUser._id,
    });
    const { messages, createdMessageIDs } = this.state;
    messages.unshift(message);
    createdMessageIDs[message._id] = true;
    this.setState({ messages, createdMessageIDs, newMessage: '' });
    await message.save();
  }
  
  async submit2() {//Next line is important
  const { newTransaction, meetingDay,mainSavings, disbursementDate, schemeName, loanType, serviceCharge, serviceCharge2, totalInstallments, amountPayable, date, manDeposit, volDeposit, interestSavings, withdrawal, balance, installmentNumber, repayment, balance2, agentSignature  } = this.state;
    const transaction = new Transaction({
      content: newTransaction,
      meetingDay: meetingDay,
      mainSavings: mainSavings, 
      disbursementDate: disbursementDate, 
      schemeName: schemeName, 
      loanType: loanType, 
      serviceCharge: serviceCharge, 
      serviceCharge2: serviceCharge2, 
      totalInstallments: totalInstallments, 
      amountPayable: amountPayable, 
      date: date, 
      manDeposit: manDeposit, 
      volDeposit: volDeposit, 
      interestSavings: interestSavings, 
      withdrawal: withdrawal, 
      balance: balance, 
      installmentNumber: installmentNumber, 
      repayment: repayment, 
      balance2: balance2, 
      createdBy: this.state.currentUser._id,
    });
    const { transactions, createdTransactionIDs } = this.state;
    transactions.unshift(transaction);
    createdTransactionIDs[transaction._id] = true;
    this.setState({ transactions, createdTransactionIDs, newTransaction: '' });
    await transaction.save();
  }
  
  messages() {
    return this.state.messages.map(message => (
      <div key={message._id}>
        <Text.p mt={4} mb={1}>
          {message.attrs.createdBy}
          {' '}
          says:
        </Text.p>
        <Text.em>{message.attrs.creditorName}</Text.em>
        <Text.em>{message.attrs.age}</Text.em>
        <Text.em>{message.attrs.phone}</Text.em>
        <Text.em>{message.attrs.address}</Text.em>
        <Text.em>{message.attrs.bName}</Text.em>
        <Text.em>{message.attrs.bType}</Text.em>
        <Text.em>{message.attrs.sales}</Text.em>
        <Text.em>{message.attrs.kinName}</Text.em>
        <Text.em>{message.attrs.guarantor}</Text.em>
        <Text.em>{message.attrs.guarantorAddress}</Text.em>
        <Text.em>{message.attrs.guarantorBusiness}</Text.em>
        <Text.em>{message.attrs.guarantorPhone}</Text.em>
        <Text.em>{message.attrs.loanAmount}</Text.em>
        <Text.em>{message.attrs.customerSignature}</Text.em>
        <Text.em>{message.attrs.guarantorSignature}</Text.em>
        <Text.em>{message.attrs.debtHistory}</Text.em>
        <Text.em>{message.attrs.content}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="mainSavings"
          value={this.state.mainSavings}
          onChange={evt => this.setState({ mainSavings: evt.target.value })}
        />
        Main Savings: <Text.em>{message.attrs.mainSavings}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="disbursementDate"
          value={this.state.disbursementDate}
          onChange={evt => this.setState({ disbursementDate: evt.target.value })}
        />
        Disbursement Date: <Text.em>{message.attrs.disbursementDate}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="Scheme Name"
          value={this.state.schemeName}
          onChange={evt => this.setState({ schemeName: evt.target.value })}
        />
        Scheme Name: <Text.em>{message.attrs.schemeName}</Text.em>
       
        <Input
          mt={3}
          width={1}
          placeholder="loanType"
          value={this.state.loanType}
          onChange={evt => this.setState({ loanType: evt.target.value })}
        />
        Scheme Name: <Text.em>{message.attrs.loanType}</Text.em>
       
        <Input
          mt={3}
          width={1}
          placeholder="loanType"
          value={this.state.loanType}
          onChange={evt => this.setState({ loanType: evt.target.value })}
        />
        loanType: <Text.em>{message.attrs.loanType}</Text.em>
        
        <Input
          mt={3}
          width={1}
          placeholder="serviceCharge"
          value={this.state.serviceCharge}
          onChange={evt => this.setState({ serviceCharge: evt.target.value })}
        />
        serviceCharge: <Text.em>{message.attrs.serviceCharge}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="serviceCharge2"
          value={this.state.serviceCharge2}
          onChange={evt => this.setState({ serviceCharge2: evt.target.value })}
        />
        serviceCharge2: <Text.em>{message.attrs.serviceCharge2}</Text.em>
       
        <Input
          mt={3}
          width={1}
          placeholder="totalInstallments"
          value={this.state.totalInstallments}
          onChange={evt => this.setState({ totalInstallments: evt.target.value })}
        />
        totalInstallments: <Text.em>{message.attrs.totalInstallments}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="amountPayable"
          value={this.state.amountPayable}
          onChange={evt => this.setState({ amountPayable: evt.target.value })}
        />
        amountPayable: <Text.em>{message.attrs.amountPayable}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="date"
          value={this.state.date}
          onChange={evt => this.setState({ date: evt.target.value })}
        />
        date: <Text.em>{message.attrs.date}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="manDeposit"
          value={this.state.manDeposit}
          onChange={evt => this.setState({ manDeposit: evt.target.value })}
        />
        manDeposit: <Text.em>{message.attrs.manDeposit}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="volDeposit"
          value={this.state.volDeposit}
          onChange={evt => this.setState({ volDeposit: evt.target.value })}
        />
        volDeposit: <Text.em>{message.attrs.volDeposit}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="interestSavings"
          value={this.state.interestSavings}
          onChange={evt => this.setState({ interestSavings: evt.target.value })}
        />
        interestSavings: <Text.em>{message.attrs.interestSavings}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="withdrawal"
          value={this.state.withdrawal}
          onChange={evt => this.setState({ withdrawal: evt.target.value })}
        />
        withdrawal: <Text.em>{message.attrs.withdrawal}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="balance"
          value={this.state.balance}
          onChange={evt => this.setState({ balance: evt.target.value })}
        />
        balance: <Text.em>{message.attrs.balance}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="installmentNumber"
          value={this.state.installmentNumber}
          onChange={evt => this.setState({ installmentNumber: evt.target.value })}
        />
        installmentNumber: <Text.em>{message.attrs.installmentNumber}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="repayment"
          value={this.state.repayment}
          onChange={evt => this.setState({ repayment: evt.target.value })}
        />
        repayment: <Text.em>{message.attrs.repayment}</Text.em>
        <Input
          mt={3}
          width={1}
          placeholder="balance2"
          value={this.state.balance2}
          onChange={evt => this.setState({ balance2: evt.target.value })}
        />
        balance2: <Text.em>{message.attrs.balance2}</Text.em>
        <br></br>

        Recorded By: <Text.em>{message.attrs.createdBy}</Text.em>                                                                                                                                                                    
        <br></br>
        <Button onClick={() => this.submit()} mt={2}>
            Submit2
          </Button>

      </div>
    ));
  }

  render() {
    return (
      <Flex>
        <Box width={[1, 1 / 2]} mx="auto" textAlign="center">
          <Text.p textAlign="center">
            Create Customer
          </Text.p>

          <Input
            mt={3}
            width={1}
            placeholder="Name"
            value={this.state.name}
            onChange={evt => this.setState({ name: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Age"
            value={this.state.age}
            onChange={evt => this.setState({ age: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Phone"
            value={this.state.phone}
            onChange={evt => this.setState({ phone: evt.target.value })}
          />

          <Input
            mt={3}
            width={1}
            placeholder="Address"
            value={this.state.address}
            onChange={evt => this.setState({ address: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Business Name"
            value={this.state.bName}
            onChange={evt => this.setState({ bName: evt.target.value })}
          />

          <Input
            mt={3}
            width={1}
            placeholder="Business Type"
            value={this.state.bType}
            onChange={evt => this.setState({ bType: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Sales"
            value={this.state.sales}
            onChange={evt => this.setState({ sales: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Next of Kin"
            value={this.state.kinName}
            onChange={evt => this.setState({ kinName: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="guarantor"
            value={this.state.guarantor}
            onChange={evt => this.setState({ guarantor: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="guarantor Address"
            value={this.state.guarantorAddress}
            onChange={evt => this.setState({ guarantorAddress: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="guarantor Business"
            value={this.state.guarantorBusiness}
            onChange={evt => this.setState({ guarantorBusiness: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="guarantor Phone"
            value={this.state.guarantorPhone}
            onChange={evt => this.setState({ guarantorPhone: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="guarantor Signature"
            value={this.state.guarantorSignature}
            onChange={evt => this.setState({ guarantorSignature: evt.target.value })}
          />

          <Input
            mt={3}
            width={1}
            placeholder="Loan Amount"
            value={this.state.loanAmount}
            onChange={evt => this.setState({ loanAmount: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Customer Signature"
            value={this.state.customerSignature}
            onChange={evt => this.setState({ customerSignature: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Debt History"
            value={this.state.debtHistory}
            onChange={evt => this.setState({ debtHistory: evt.target.value })}
          />
          {/* <Input
            mt={3}
            width={1}
            placeholder="What do you have to say?"
            value={this.state.newMessage}
            onChange={evt => this.setState({ newMessage: evt.target.value })}
          /> */}
          
          <Button onClick={() => this.submit()} mt={2}>
            Submit
          </Button>

          {this.messages()}

          <Text.p textAlign="center">
            Only showing the most recent
            {' '}
            {this.state.messages.length}
            {' '}
            customers.
          </Text.p>
        </Box>
      </Flex>
    );
  }
}
