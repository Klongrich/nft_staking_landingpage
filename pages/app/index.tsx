import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { User } from "@styled-icons/boxicons-regular/User"

import Dashboard from "./dashboard";

//Move infuraID to .env file
const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: '43b86485d3164682b5d703fd1d39fe1c', // required
        },
    },
};

const Header = styled.div`
    padding-top: 95px;
    margin-bottom : -95px;
`

const ConnectWallet = styled.div`
    background-color: #F4A7A7;

    padding: 10px;
    
    width: 250px;
    height: 25px;

    text-align: center;

    font-size: 22px;

    border: 1px solid black;

    float: right;

    margin-right: 40px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    :hover {
        background-color: #FDC8C7;
        cursor: pointer;
    }
    
`

const AccountButton = styled.div`
    background-color: #F4A7A7;

    height: 36px;
    width: 44px;
    
    float: right;

    border: 1px solid black;

    margin-right: 90px;

    padding-left: 8px;
    padding-top: 8px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    :hover {
        background-color: #FDC8C7;
        cursor: pointer;
    }

`

export function Dapp(): any {

    //const [provider, setProvider] = useState('');
    //const [web3, setWeb3] = useState('');
    const [userAddress, setUserAddress] = useState('');



    async function loadWeb3() {

        if (typeof window !== "undefined") {
            const web3Modal = new Web3Modal({
                network: 'rinkeby', // optional
                cacheProvider: true, // optional
                providerOptions, // required
            });

            const provider = await web3Modal.connect();
            const web3 = await new Web3(provider);

            // setProvider(provider);
            // setWeb3(web3);

            if (web3) {
                const EthAccounts = await web3.eth.getAccounts();
                setUserAddress(EthAccounts[0]);
            } else {
                console.log('web3 not found');
            }
        }
    }

    function parseUserAddress(address: any) {
        return (address.substring(0, 4) + "...." + address.substring(38, 42));
    }

    useEffect(() => {
        loadWeb3();
    }, []);

    return (
        <>
            <Header>
                <AccountButton>
                    <User width={40} height={40} />
                </AccountButton>

                <ConnectWallet onClick={() => loadWeb3()}>
                    {userAddress && <> {parseUserAddress(userAddress)} </>}
                    {!userAddress && <> Connect Wallet </>}
                </ConnectWallet>
            </Header>

            <Dashboard userAddress={userAddress} />
        </>
    )


}

export default Dapp;