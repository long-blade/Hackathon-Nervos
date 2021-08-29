/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
import './app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import { AddressTranslator } from 'nervos-godwoken-integration';
import { BankWrapper } from '../lib/contracts/BankWrapper';
import { CONFIG } from '../config';




async function createWeb3() {
    // Modern dapp browsers...
    if ((window as any).ethereum) {
        // const web3 = new Web3((window as any).ethereum);
        const godwokenRpcUrl = CONFIG.WEB3_PROVIDER_URL;
        const providerConfig = {
            rollupTypeHash: CONFIG.ROLLUP_TYPE_HASH,
            ethAccountLockCodeHash: CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
            web3Url: godwokenRpcUrl
        };
        const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);
        const web3 = new Web3(provider);

        try {
            // Request account access if needed
            await (window as any).ethereum.enable();
        } catch (error) {
            // User denied account access...
        }

        return web3;
    }

    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return null;
}

export function App() {
    const [web3, setWeb3] = useState<Web3>(null);
    const [contract, setContract] = useState<BankWrapper>();
    const [accounts, setAccounts] = useState<string[]>();
    const [l2Balance, setL2Balance] = useState<bigint>();
    const [existingContractIdInputValue, setExistingContractIdInputValue] = useState<string>();
    const [bankFunds, setBankFunds] = useState<number | undefined>();
    const [amountInputValue, setAmountInputValue] = useState<number | undefined>();
    const [deployTxHash, setDeployTxHash] = useState<string | undefined>();
    const [polyjuiceAddress, setPolyjuiceAddress] = useState<string | undefined>();
    const [transactionInProgress, setTransactionInProgress] = useState(false);
    const toastId = React.useRef(null);
    

    useEffect(() => {
        if (accounts?.[0]) {
            const addressTranslator = new AddressTranslator();
            setPolyjuiceAddress(addressTranslator.ethAddressToGodwokenShortAddress(accounts?.[0]));
        } else {
            setPolyjuiceAddress(undefined);
        }
    }, [accounts?.[0]]);

    useEffect(() => {
        if (transactionInProgress && !toastId.current) {
            toastId.current = toast.info(
                'Transaction in progress. Confirm MetaMask signing dialog and please wait...',
                {
                    position: 'top-right',
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: false
                }
            );
        } else if (!transactionInProgress && toastId.current) {
            toast.dismiss(toastId.current);
            toastId.current = null;
        }
    }, [transactionInProgress, toastId.current]);

    const account = accounts?.[0];

    async function deployContract() {
        const _contract = new BankWrapper(web3);

        try {
            setDeployTxHash(undefined);
            setTransactionInProgress(true);

            // await _contract.deploy(account);
            const transactionHash = await _contract.deploy(account);

            setDeployTxHash(transactionHash);

            setExistingContractAddress(_contract.address);
            toast(
                'Successfully deployed a smart-contract.',
                { type: 'success' }
            );
        } catch (error) {
            console.error(error);
            toast('There was an error sending your transaction. Please check developer console.');
        } finally {
            setTransactionInProgress(false);
        }
    }

    async function setExistingContractAddress(contractAddress: string) {
        const _contract = new BankWrapper(web3);
        _contract.useDeployed(contractAddress.trim());

        setContract(_contract);
        setBankFunds(undefined);
    }

    async function depositAmount() {
        try {
            setTransactionInProgress(true);
            await contract.depositFunds(amountInputValue, account);
            toast(
                'Successfully deposited amount',
                { type: 'success' }
            );
        } catch (error) {
            console.error(error);
            toast('There was an error sending your transaction. Please check developer console.');
        } finally {
            setTransactionInProgress(false);
        }
    }

    async function withdrawAmount() {
        try {
            setTransactionInProgress(true);
            await contract.withdrawFunds(amountInputValue, account);
            toast(
                'Successfully withdraw.',
                { type: 'success' }
            );
        } catch (error) {
            console.error(error);
            toast('There was an error sending your transaction. Please check developer console.');
        } finally {
            setTransactionInProgress(false);
        }
    }
    
    async function getBankReport() {
        const funds = await contract.getBankReport();
        toast('Getting bank statement.', { type: 'success' });
        setBankFunds(funds);
    }

    useEffect(() => {
        if (web3) {
            return;
        }

        (async () => {
            const _web3 = await createWeb3();
            setWeb3(_web3);

            const _accounts = [(window as any).ethereum.selectedAddress];
            setAccounts(_accounts);
            if (_accounts && _accounts[0]) {
                const _l2Balance = BigInt(await _web3.eth.getBalance(_accounts[0]));
                setL2Balance(_l2Balance);
            }
        })();
    });

    const LoadingIndicator = () => <span className="rotating-icon">⚙️</span>;

    return (
        <div>
            <div className="card mb-4">
                <div className="card-body">
                    Your ETH address: <b>{accounts?.[0]}</b>
                    <br />
                    <br />
                    Your Polyjuice address: <b>{polyjuiceAddress || ' - '}</b>
                    <br />
                    <br />
                    Nervos Layer 2 balance:{' '}
                    <b>{l2Balance ? (l2Balance / 10n ** 8n).toString() : <LoadingIndicator />} CKB</b>
                    <br />
                    <br />
                    Deployed contract address: <b>{contract?.address || '-'}</b> <br />
                    Deploy transaction hash: <b>{deployTxHash || '-'}</b>
                    <br />
                </div>
            </div>

            <div className="card p-4">
                <div className="row">
                    <div className="col-6">
                        <div className="mb-4">
                            <button className="btn btn-primary btn-lg mb-2" onClick={deployContract} disabled={!l2Balance}>
                                Deploy Bank contract
                            </button>
                            <small className="d-block text-danger">The button above will deploy a Bank smart contract where you can withdraw and deposit funds.</small>
                            <h6 className="badge bg-secondary mb-2">OR</h6>
                            <div className="input-group">
                                <input placeholder="Existing contract id" className="form-control" onChange={e => setExistingContractIdInputValue(e.target.value)}/>
                                <button className="btn btn-outline-secondary" disabled={!existingContractIdInputValue || !l2Balance} onClick={() => setExistingContractAddress(existingContractIdInputValue)}>
                                Use existing contract
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Amount" onChange={e => setAmountInputValue(parseInt(e.target.value, 10))}/>
                            <button className="btn btn-outline-success" type="button" disabled={!contract} onClick={depositAmount} >Deposit</button>
                            <button className="btn btn-outline-secondary" type="button" disabled={!contract} onClick={withdrawAmount} >Withdraw</button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div  className="h4 mb-4">Reports:</div>
                        <br/>
                        <br/>
                        <div className="input-group mb-4">
                            <button className="btn btn-outline-success"  type="button" disabled={!contract} onClick={getBankReport}>Get Bank Report</button>
                            <input className="form-control" type="text" placeholder={bankFunds ? bankFunds.toString() : null} disabled/>  
                        </div>
                    </div>
                </div>
            </div>
            
            
            <hr />
            The contract is deployed on Nervos Layer 2 - Godwoken + Polyjuice. After each
            transaction you might need to wait up to 120 seconds for the status to be reflected.
            <ToastContainer />
        </div>
    );
}
