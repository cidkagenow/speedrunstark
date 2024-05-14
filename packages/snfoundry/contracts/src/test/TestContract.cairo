use starknet::{ContractAddress, contract_address_const};

use snforge_std::{declare, ContractClassTrait};
use openzeppelin::utils::serde::SerializedAppend;
use openzeppelin::presets::ERC721;

use contracts::YourCollectible::{IYourCollectibleDispatcher, IYourCollectibleDispatcherTrait};

use openzeppelin::tests::utils::constants::{
    ZERO, OWNER, SPENDER, RECIPIENT, NAME, SYMBOL, DECIMALS, SUPPLY, VALUE
};

fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name);
    let mut calldata = array![];
    calldata.append_serde(OWNER());
    contract.deploy(@calldata).unwrap()
}

#[test]
fn test_mint_item() {
    let contract_address = deploy_contract("YourCollectible");
    let dispatcher = IYourCollectibleDispatcher { contract_address };
    let url: ByteArray = "QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr";
    let token_id = dispatcher.mint_item(OWNER(), url);
    let expected_token_id = 1;
    assert_eq!(token_id, expected_token_id);
}
