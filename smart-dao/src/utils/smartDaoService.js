import contractAbi from './smartDaoAbi.json';
import tokenContractAbi from './tokenContractAbi.json';
//import BigNumber from 'bignumber.js';

export default class SmartDaoService {
  constructor(contractAddress, web3Instance, account) {
    this.web3 = web3Instance;
    this.account = account;
    this.contract = new this.web3.eth.Contract(contractAbi, contractAddress);
   
  }
  async getDAOs() {
    try {
      const daos = await this.contract.methods.getDAOs().call();
      return daos;
    } catch (error) {
      console.error('Error while getting DAOs:', error);
      throw error;
    }
  }

  async getSymbolOfToken(tokenContractAddress) {
    try {
      this.tokenContract = new this.web3.eth.Contract(tokenContractAbi, tokenContractAddress);
      const symbol = await this.tokenContract.methods.symbol().call();
      return symbol;
    } catch (error) {
      console.error('Error while getting symbol:', error);
      throw error;
    }
  }

  async getNameOfToken(tokenContractAddress) {
    try {
      this.tokenContract = new this.web3.eth.Contract(tokenContractAbi, tokenContractAddress);
      const name = await this.tokenContract.methods.name().call();
      return name;
    } catch (error) {
      console.error('Error while getting name:', error);
      throw error;
    }
  }

  async getDecimalsOfToken(tokenContractAddress) {
    try {
      this.tokenContract = new this.web3.eth.Contract(tokenContractAbi, tokenContractAddress);
      const decimals = await this.tokenContract.methods.decimals().call();
      return decimals;
    } catch (error) {
      console.error('Error while getting decimals:', error);
      throw error;
    }
  }

  async getTotalSupplyOfToken(tokenContractAddress) {
    try {
      this.tokenContract = new this.web3.eth.Contract(tokenContractAbi, tokenContractAddress);
      const totalSupply = await this.tokenContract.methods.totalSupply().call();
      return totalSupply;
    } catch (error) {
      console.error('Error while getting totalSupply:', error);
      throw error;
    }
  }

  async createDao(
    daoName,
    votingOpener,
    voter,
    treasuryVotingOpener,
    treasuryVoter,
    logoURL,
    daoWebsite) {
    try {
      //const amountToSend = new BigNumber(amount).times(new BigNumber(10).pow(await this.getDecimals())).toFixed();
      console.log('createDao');
      var transaction = await this.contract.methods.createNewDAO(
        daoName,
        votingOpener,
        voter,
        treasuryVotingOpener,
        treasuryVoter,
        logoURL,
        daoWebsite);

      console.log('transaction', transaction);
      var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

      return tx.transactionHash;
    } catch (error) {
      console.log('Error while transferring:', error);
    }
  }

  async createDefaultERC20(name, symbol, totalSupply) {

    try {
      //const amountToSend = new BigNumber(amount).times(new BigNumber(10).pow(await this.getDecimals())).toFixed();
      console.log('createDefaultERC20');
      var transaction = await this.contract.methods.createDefaultERC20(
        name, symbol, totalSupply);

      console.log('transaction', transaction);
      var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

      return tx.transactionHash;
    } catch (error) {
      console.log('Error while transferring:', error);
    }
  }



  async createTreasuryVoting(
    treasuryVotingContractAddress,
    votingName,
    votingDescription,
    to,
    amount,
    tokenContract) {
    try {
      //const amountToSend = new BigNumber(amount).times(new BigNumber(10).pow(await this.getDecimals())).toFixed();
      console.log('createTreasuryVoting');
      var transaction = await this.contract.methods.createTreasuryVoting(
        treasuryVotingContractAddress,
        votingName,
        votingDescription,
        to,
        amount,//new BigNumber(amount).times(new BigNumber(10).pow(18)).toFixed(),//TODO decimal 18 sabit cunku contratlarda da sabit burasi kendi tokenlarinda sorun
        tokenContract);

      console.log('transaction', transaction);
      var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

      return tx.transactionHash;
    } catch (error) {
      console.log('Error while transferring:', error);
    }

  }



  async createDefaultERC721(name, symbol, totalSupply) {

    try {
      //const amountToSend = new BigNumber(amount).times(new BigNumber(10).pow(await this.getDecimals())).toFixed();
      console.log('createDefaultERC721');
      var transaction = await this.contract.methods.createDefaultERC721(
        name, symbol, totalSupply);

      console.log('transaction', transaction);
      var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

      return tx.transactionHash;
    } catch (error) {
      console.log('Error while transferring:', error);
    }
  }


  listenToERC20Created(callback) {
    this.listenToEvent('erc20Created', callback);
  }

  listenToERC721Created(callback) {
    this.listenToEvent('erc721Created', callback);
  }

  listenToDaoCreated(callback) {
    this.listenToEvent('daoCreated', callback);
  }

  listenToEvent(eventName, callback) {
    if (!this.contract.events || !this.contract.events[eventName]) {
      throw new Error(`The ${eventName} event is not defined on the contract according to the ABI.`);
    }

    const event = this.contract.events[eventName]({ fromBlock: 'latest' });

    if (!event || typeof event.on !== 'function') {
      throw new Error(`Unable to set up the ${eventName} listener.`);
    }

    event.on('data', (eventData) => {
      event.unsubscribe();
      if (typeof callback === 'function') {
        callback(eventData.returnValues);
      }
    });
  }



  async voteTreasury(treasuryVotingContractAddress, index, vote) {
  try {
    //const amountToSend = new BigNumber(amount).times(new BigNumber(10).pow(await this.getDecimals())).toFixed();
    console.log('voteTreasury');
    var transaction = await this.contract.methods.voteTreasury(
      treasuryVotingContractAddress,
      index,
      vote);

    console.log('transaction', transaction);
    var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

    return tx.transactionHash;
  } catch (error) {
    console.log('Error while transferring:', error);
  }
}

  async getTreasuryVotings(treasuryVotingContractAddress) {

  try {
    const votings = await this.contract.methods.getTreasuryVotings(treasuryVotingContractAddress).call();
    return votings;
  } catch (error) {
    console.error('Error while getting TreasuryVotings:', error);
    throw error;
  }
}

  async getTreasuryVotingResult(treasuryVotingContractAddress, index) {
  try {
    const votings = await this.contract.methods.getTreasuryVotingResult(treasuryVotingContractAddress, index).call();
    return votings;
  } catch (error) {
    console.error('Error while getting TreasuryVotings result:', error);
    throw error;
  }
}

  async finishTreasuryVoting(treasuryVotingContractAddress, index) {
  try {

    console.log('finishTreasuryVoting');
    var transaction = await this.contract.methods.finishTreasuryVoting(treasuryVotingContractAddress, index);

    console.log('transaction', transaction);
    var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

    return tx.transactionHash;
  } catch (error) {
    console.log('Error while transferring:', error);
  }
}

  async createGeneralVoting(votingContractAddress, votingName, votingDescription, choices) {

  try {
    console.log('createGeneralVoting');
    var transaction = await this.contract.methods.createGeneralVoting(
      votingContractAddress,
      votingName,
      votingDescription,
      choices);

    console.log('transaction', transaction);
    var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

    return tx.transactionHash;
  } catch (error) {
    console.log('Error while transferring:', error);
  }


}

  async voteGeneral(votingContractAddress, index, choice) {

  try {
    console.log('voteGeneral');
    var transaction = await this.contract.methods.voteGeneral(
      votingContractAddress,
      index,
      choice);

    console.log('transaction', transaction);
    var tx = await transaction.send({ from: this.account, data: transaction.encodeABI() });

    return tx.transactionHash;
  } catch (error) {
    console.log('Error while transferring:', error);
  }

}

  async getGeneralVotings(votingContractAddress) {
  try {
    const votings = await this.contract.methods.getGeneralVotings(votingContractAddress).call();
    return votings;
  } catch (error) {
    console.error('Error while getting GeneralVotings:', error);
    throw error;
  }
}



  async getGeneralVoteResult(votingContractAddress, index) {
  try {
    const votings = await this.contract.methods.getGeneralVoteResult(votingContractAddress, index).call();
    console.log(votings);
    //Votings will return string[] memory, uint256[] memory union these with order and return dictionary
    const choices = votings[0];
    const results = votings[1];
    const dictionary = {};
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const result = results[i];
      dictionary[choice] = result;
    }
    return dictionary;
  } catch (error) {
    console.error('Error while getting GeneralVotings result:', error);
    throw error;
  }
}



}
