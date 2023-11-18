import Web3 from 'web3';

class MetaMaskService {
    web3 = null;
    account = null;

    static instance = null;

    static getInstance() {
        if (!MetaMaskService.instance) {
            MetaMaskService.instance = new MetaMaskService();
        }

        return MetaMaskService.instance;
    }

    async transfer(to, amount) {
        try
        {
           var tx =  await window.ethereum.request(
                {
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: this.account,
                            to: to,
                            value: "0x" + Web3.utils.toBigInt(Web3.utils.toWei(amount, "ether")).toString(16)
                        }
                    ]
                }
            );
            return tx;
        }
        catch(error)
        {
            console.log(error);
            return null;

        }

    }

    async getBalance() {
        if (!this.web3 || !this.account) {
           return 0;
        }
    
        const balance = await this.web3.eth.getBalance(this.account); // Get balance
        return this.web3.utils.fromWei(balance, 'ether');
    }

    registerAccountsChangedListener(callback) {
        window.ethereum.on('accountsChanged', callback);
    }

    registerChainChangedListener(callback) {
        window.ethereum.on('chainChanged', callback);
    }

    isMetaMaskInstalled() {
        return Boolean(window.ethereum && window.ethereum.isMetaMask);
    }


    async connectToMetaMask() {
        if (!this.isMetaMaskInstalled()) {
            return { success: false, error: 'MetaMask is not installed' };
        }

        try {
            this.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            this.account = accounts[0];

            // register accountsChanged event
            this.registerAccountsChangedListener((accounts) => {
                // update local account when accountsChanged event is triggered
                if (accounts.length > 0) {
                    this.account = accounts[0];
                } else {
                    this.account = null;
                }
            });

            return { success: true, account: this.account, web3: this.web3 };
        } catch (error) {
            console.error('Failed to connect MetaMask:', error);
            return { success: false, error };
        }
    }

    getAccount() {
        return this.account;
    }

    getWeb3() {
        return this.web3;
    }
}

export default MetaMaskService.getInstance();