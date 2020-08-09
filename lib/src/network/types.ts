import ow from 'ow';
import { FeeConfig } from '../fee';
import { NetworkEnum } from './network';
import { owFeeConfig } from '../fee/types';

/**
 * @typedef {object} NetworkConfig
 * @property {string} name Name of the network
 * @property {string} addressPrefix Prefix of the bech32 transfer address
 * @property {Buffer} chainHexId Two hex characters chainHexId
 * @property {FeeConfig} feeConfig Default fee configuration
 */
export type NetworkConfig = {
    name: string;
    chainHexId: Buffer;
    addressPrefix: string;
    bip44Path: string;
    feeConfig: FeeConfig;
};

export interface DevnetOptions {
    feeConfig: FeeConfig;
    chainHexId: Buffer | string;
}

/**
 * @internal
 */
const owNetworkEnumValidateFn = (value: any) => ({
    validator: value === 'Mainnet' || value === 'Testnet' || value === 'Devnet',
    message:
        'Expected value to be one of the network variants (Mainnet, Testnet, Devnet)',
});

/**
 * @internal
 */
export const owNetworkEnum = ow.string.validate(owNetworkEnumValidateFn);
/**
 * @internal
 */
export const owOptionalNetworkEnum = ow.optional.string.validate(
    owNetworkEnumValidateFn,
);

/**
 * @internal
 */
const owMainnet = ow.object
    .exactShape({
        name: owNetworkEnum,
        chainHexId: ow.buffer,
        addressPrefix: ow.string,
        bip44Path: ow.string,
        feeConfig: owFeeConfig,
    })
    .validate((value: any) => ({
        validator: value.name === NetworkEnum.Mainnet,
        message: `Expected network name to be ${NetworkEnum.Mainnet}`,
    }));
/**
 * @internal
 */
const owTestnet = ow.object
    .exactShape({
        name: owNetworkEnum,
        chainHexId: ow.buffer,
        addressPrefix: ow.string,
        bip44Path: ow.string,
        feeConfig: owFeeConfig,
    })
    .validate((value: any) => ({
        validator: value.name === NetworkEnum.Testnet,
        message: `Expected network name to be ${NetworkEnum.Testnet}`,
    }));
/**
 * @internal
 */
const owDevnet = ow.object
    .exactShape({
        name: owNetworkEnum,
        chainHexId: ow.buffer,
        addressPrefix: ow.string,
        bip44Path: ow.string,
        feeConfig: owFeeConfig,
    })
    .validate((value: any) => ({
        validator: value.name === NetworkEnum.Devnet,
        message: `Expected network name to be ${NetworkEnum.Devnet}`,
    }));

/**
 * @internal
 */
export const owNetworkConfig = ow.any(owMainnet, owTestnet, owDevnet);
/**
 * @internal
 */
export const owOptionalNetworkConfig = ow.optional.any(
    owMainnet,
    owTestnet,
    owDevnet,
);

/**
 * @internal
 */
const owChainHexIdStr = ow.string.validate((value: any) => ({
    validator: /^[0-9a-fA-F]{2}$/.test(value),
    message: 'Expected value to be two hex characters of chain Id',
}));
/**
 * @internal
 */
const owChainHexIdBuffer = ow.buffer.validate((value: any) => ({
    validator: /^[0-9a-fA-F]{2}$/.test(value.toString('hex')),
    message: 'Expected value to be two hex characters of chain Id',
}));
/**
 * @internal
 */
export const owChainHexId = ow.any(owChainHexIdStr, owChainHexIdBuffer);
/**
 * @internal
 */
export const owOptionalChainId = ow.optional.any(
    owChainHexIdStr,
    owChainHexIdBuffer,
);

/**
 * @internal
 */
export const owDevnetOptions = ow.object.exactShape({
    feeConfig: owFeeConfig,
    chainHexId: owChainHexId,
});
