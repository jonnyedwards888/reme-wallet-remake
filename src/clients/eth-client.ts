import { HTTPRequester } from './http-requester'

export class ETHClient {

    static async gasPrice (): Promise<string> {
        const result = await HTTPRequester.post(
            process.env.REACT_APP_BLOCKCHAIN_NETWORK || '',
            { "jsonrpc": "2.0", "method": "eth_gasPrice", "params": [], "id": 1 }
        )

        return result.result
    }
}
