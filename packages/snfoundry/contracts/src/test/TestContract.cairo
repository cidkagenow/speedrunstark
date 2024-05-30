use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait};
use openzeppelin::utils::serde::SerializedAppend;
use contracts::YourCollectible::{IYourCollectibleDispatcher, IYourCollectibleDispatcherTrait};
use openzeppelin::tests::utils::constants::OWNER;

fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name).unwrap();
    let contract = declare(name).unwrap();
    let mut calldata = array![];
    calldata.append_serde(OWNER());
    let (contract_address, _) = contract.deploy(@calldata).unwrap();
    contract_address
    let (contract_address, _) = contract.deploy(@calldata).unwrap();
    contract_address
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
