import Web3 from 'web3';
import * as BankJSON from '../../../build/contracts/Bank.json';
import { Bank } from '../../types/Bank';

const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
};

export class BankWrapper {
    web3: Web3;

    contract: Bank;

    address: string;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(BankJSON.abi as any) as any;
    }

    get isDeployed() {
        return Boolean(this.address);
    }

    async getBankReport() {
        const funds = await this.contract.methods.bankReport().call();
        return parseInt(funds, 10);
    }
    async depositFunds(value: number, fromAddress: string) {
        return await this.contract.methods.deposit().send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value
        });
    }

    async withdrawFunds(value: number, fromAddress: string) {
        return await this.contract.methods.withdraw(value).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
        });
    }

    async deploy(fromAddress: string) {
        const deployTx = await (this.contract
            .deploy({
                data: BankJSON.bytecode,
                arguments: []
            })
            .send({
                ...DEFAULT_SEND_OPTIONS,
                from: fromAddress,
                to: '0x0000000000000000000000000000000000000000'
            } as any) as any);
        this.useDeployed(deployTx.contractAddress);
        return deployTx.transactionHash;
    }

    useDeployed(contractAddress: string) {
        this.address = contractAddress;
        this.contract.options.address = contractAddress;
    }
}
