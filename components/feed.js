import React from 'react';
import { Flex, Box, Button } from 'rebass';
import PropTypes from 'prop-types';
import { User } from 'radiks';

import Text from '../styled/typography';
import Input from '../styled/input';
import Message from '../models/Message';
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
    gurantor: '',
    gurantorAddress: '',
    gurantorBusiness: '',
    // newMessage: '',
    gurantorPhone: '',
    loanAmount:'',
    customerSignature:'',
    gurantorSignature:'',
    debtHistory:'',
    createdMessageIDs: {},
    messages: [],
    currentUser: null,
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
    // Message.addStreamListener(this.newMessageListener.bind(this));
    // Person.addStreamListener(this.newPersonListener.bind(this));
  }


  componentWillReceiveProps(newProps) {
    const rawMessages = newProps.messages;
    const messages = rawMessages.map(messageData => new Message(messageData.attrs));
    this.setState({ messages });
  }


  newMessageListener(message) {
    const { messages } = this.state;
    if (!this.state.createdMessageIDs[message._id]) {
      messages.unshift(message);
      this.setState({ messages });
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
    const { newMessage, name, age, phone, address, bName, bType, sales, kinName, gurantor, gurantorAddress, gurantorBusiness, gurantorPhone, loanAmount, customerSignature,gurantorSignature, debtHistory  } = this.state;
    const message = new Message({
      content: newMessage,
      creditorName: name,
      age: age,
      phone:phone,
      address:address,
      bName: bName,
      bType: bType,
      sales: sales,
      kinName:kinName,
      gurantor:gurantor,
      gurantorAddress:gurantorAddress,
      gurantorBusiness:gurantorBusiness,
      gurantorPhone:gurantorPhone,
      loanAmount:loanAmount,
      customerSignature:customerSignature,
      gurantorSignature:gurantorSignature,
      debtHistory:debtHistory,
      createdBy: this.state.currentUser._id,
    });
    const { messages, createdMessageIDs } = this.state;
    messages.unshift(message);
    createdMessageIDs[message._id] = true;
    this.setState({ messages, createdMessageIDs, newMessage: '' });
    await message.save();
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
        <Text.em>{message.attrs.gurantor}</Text.em>
        <Text.em>{message.attrs.gurantorAddress}</Text.em>
        <Text.em>{message.attrs.gurantorBusiness}</Text.em>
        <Text.em>{message.attrs.gurantorPhone}</Text.em>
        <Text.em>{message.attrs.loanAmount}</Text.em>
        <Text.em>{message.attrs.customerSignature}</Text.em>
        <Text.em>{message.attrs.gurantorSignature}</Text.em>
        <Text.em>{message.attrs.debtHistory}</Text.em>
        <Text.em>{message.attrs.content}</Text.em>
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
            placeholder="Gurantor"
            value={this.state.gurantor}
            onChange={evt => this.setState({ gurantor: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Gurantor Address"
            value={this.state.gurantorAddress}
            onChange={evt => this.setState({ gurantorAddress: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Gurantor Business"
            value={this.state.gurantorBusiness}
            onChange={evt => this.setState({ gurantorBusiness: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Gurantor Phone"
            value={this.state.gurantorPhone}
            onChange={evt => this.setState({ gurantorPhone: evt.target.value })}
          />
          <Input
            mt={3}
            width={1}
            placeholder="Gurantor Signature"
            value={this.state.gurantorSignature}
            onChange={evt => this.setState({ gurantorSignature: evt.target.value })}
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
