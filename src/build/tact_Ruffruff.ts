import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type SubmitWallet = {
    $$type: 'SubmitWallet';
    address: Address;
}

export function storeSubmitWallet(src: SubmitWallet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1569616578, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadSubmitWallet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1569616578) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'SubmitWallet' as const, address: _address };
}

function loadTupleSubmitWallet(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'SubmitWallet' as const, address: _address };
}

function storeTupleSubmitWallet(source: SubmitWallet) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserSubmitWallet(): DictionaryValue<SubmitWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSubmitWallet(src)).endCell());
        },
        parse: (src) => {
            return loadSubmitWallet(src.loadRef().beginParse());
        }
    }
}

export type SetHoldingWallet = {
    $$type: 'SetHoldingWallet';
    address: Address;
}

export function storeSetHoldingWallet(src: SetHoldingWallet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4087144204, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadSetHoldingWallet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4087144204) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'SetHoldingWallet' as const, address: _address };
}

function loadTupleSetHoldingWallet(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'SetHoldingWallet' as const, address: _address };
}

function storeTupleSetHoldingWallet(source: SetHoldingWallet) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserSetHoldingWallet(): DictionaryValue<SetHoldingWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetHoldingWallet(src)).endCell());
        },
        parse: (src) => {
            return loadSetHoldingWallet(src.loadRef().beginParse());
        }
    }
}

export type TransferToHoldingWallet = {
    $$type: 'TransferToHoldingWallet';
    amount: bigint;
}

export function storeTransferToHoldingWallet(src: TransferToHoldingWallet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3381338985, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadTransferToHoldingWallet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3381338985) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'TransferToHoldingWallet' as const, amount: _amount };
}

function loadTupleTransferToHoldingWallet(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'TransferToHoldingWallet' as const, amount: _amount };
}

function storeTupleTransferToHoldingWallet(source: TransferToHoldingWallet) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserTransferToHoldingWallet(): DictionaryValue<TransferToHoldingWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferToHoldingWallet(src)).endCell());
        },
        parse: (src) => {
            return loadTransferToHoldingWallet(src.loadRef().beginParse());
        }
    }
}

export type WalletResponse = {
    $$type: 'WalletResponse';
    address: Address;
    randomNumber: bigint;
}

export function storeWalletResponse(src: WalletResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeInt(src.randomNumber, 257);
    };
}

export function loadWalletResponse(slice: Slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _randomNumber = sc_0.loadIntBig(257);
    return { $$type: 'WalletResponse' as const, address: _address, randomNumber: _randomNumber };
}

function loadTupleWalletResponse(source: TupleReader) {
    let _address = source.readAddress();
    let _randomNumber = source.readBigNumber();
    return { $$type: 'WalletResponse' as const, address: _address, randomNumber: _randomNumber };
}

function storeTupleWalletResponse(source: WalletResponse) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.randomNumber);
    return builder.build();
}

function dictValueParserWalletResponse(): DictionaryValue<WalletResponse> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletResponse(src)).endCell());
        },
        parse: (src) => {
            return loadWalletResponse(src.loadRef().beginParse());
        }
    }
}

 type Ruffruff_init_args = {
    $$type: 'Ruffruff_init_args';
}

function initRuffruff_init_args(src: Ruffruff_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Ruffruff_init() {
    const __code = Cell.fromBase64('te6ccgECFAEAA2sAART/APSkE/S88sgLAQIBYgIDAtbQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVBEEAgEgDA0EzAGSMH/gcCHXScIflTAg1wsf3iCCEF2OcsK6jq4w0x8BghBdjnLCuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx4CCCEPOc3wy64wIgghDJiyNpuuMCghCUapi2ugUGBwgAqnCAZPhEbpf4JfgVf/hk3iGh+BGgUhABgQELAshZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyRA0EiBulTBZ9FkwlEEz9BPiAX8AYDDTHwGCEPOc3wy68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDExfwGeMNMfAYIQyYsjabry4IGBAQHXAAExggClUY0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCPHBbPy9FIQcn9VIG1tbds8fwoBWI6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwCQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwKAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCEb72Ntnm2eNhDBEOAgEgDxAAAiECEbsL3bPNs8bCGBESABG4K+7UTQ0gABgBfu1E0NQB+GPSAAGOJPQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEuAw+CjXCwqDCbry4InbPBMAAiAASm2NCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ=');
    const __system = Cell.fromBase64('te6cckECFgEAA3UAAQHAAQEFoR1bAgEU/wD0pBP0vPLICwMCAWIEDQLW0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCyPhDAcx/AcoAWQL0AAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQSBQTMAZIwf+BwIddJwh+VMCDXCx/eIIIQXY5ywrqOrjDTHwGCEF2OcsK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHgIIIQ85zfDLrjAiCCEMmLI2m64wKCEJRqmLa6BgcICQCqcIBk+ERul/gl+BV/+GTeIaH4EaBSEAGBAQsCyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJEDQSIG6VMFn0WTCUQTP0E+IBfwBgMNMfAYIQ85zfDLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTF/AZ4w0x8BghDJiyNpuvLggYEBAdcAATGCAKVRjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEI8cFs/L0UhByf1UgbW1t2zx/CwFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAKATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAsByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIA4QAhG+9jbZ5tnjYQwSDwACIQIBIBEVAhG7C92zzbPGwhgSFAF+7UTQ1AH4Y9IAAY4k9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS4DD4KNcLCoMJuvLgids8EwBKbY0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAACIAARuCvu1E0NIAAYnHBDuw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRuffruff_init_args({ $$type: 'Ruffruff_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Ruffruff_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    42321: { message: `Holding wallet not set` },
}

const Ruffruff_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SubmitWallet","header":1569616578,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetHoldingWallet","header":4087144204,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TransferToHoldingWallet","header":3381338985,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WalletResponse","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"randomNumber","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Ruffruff_getters: ABIGetter[] = [
    {"name":"SubmittedWallets","arguments":[],"returnType":{"kind":"dict","key":"address","value":"WalletResponse","valueFormat":"ref"}},
    {"name":"HoldingWallet","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Ruffruff_getterMapping: { [key: string]: string } = {
    'SubmittedWallets': 'getSubmittedWallets',
    'HoldingWallet': 'getHoldingWallet',
}

const Ruffruff_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SubmitWallet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetHoldingWallet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferToHoldingWallet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Ruffruff implements Contract {
    
    static async init() {
        return await Ruffruff_init();
    }
    
    static async fromInit() {
        const init = await Ruffruff_init();
        const address = contractAddress(0, init);
        return new Ruffruff(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Ruffruff(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Ruffruff_types,
        getters: Ruffruff_getters,
        receivers: Ruffruff_receivers,
        errors: Ruffruff_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SubmitWallet | SetHoldingWallet | TransferToHoldingWallet | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SubmitWallet') {
            body = beginCell().store(storeSubmitWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetHoldingWallet') {
            body = beginCell().store(storeSetHoldingWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferToHoldingWallet') {
            body = beginCell().store(storeTransferToHoldingWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getSubmittedWallets(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('SubmittedWallets', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserWalletResponse(), source.readCellOpt());
        return result;
    }
    
    async getHoldingWallet(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('HoldingWallet', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}