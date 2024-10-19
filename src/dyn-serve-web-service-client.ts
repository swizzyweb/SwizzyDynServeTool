import { Axios } from 'axios';

export interface ISwizzyDynServeWebServiceClient {
	installService(props: any): Promise<any>; // TODO: define input / output
	runService(props: any): Promise<any>;
	stopService(props: any): Promise<any>;
	getRunningServices(props: any): Promise<any>;
};

export interface ISwizzyDynServeWebServiceClientProps {
	axios: Axios
};

const API_PATH = '/v1/webservice';

export class SwizzyDynServeWebServiceClient implements ISwizzyDynServeWebServiceClient {
	
	private _axios: Axios;
	constructor(props: ISwizzyDynServeWebServiceClientProps) {
		this._axios = props.axios;
	}

	async installService(props: any): Promise<any> {
		return await this._axios.post(`${props.url}${API_PATH}/install?serviceName=${props.serviceName}`); // TODO: define run args datastructure, it is currently defined in SwizzyDynServe I beleive. will need to be pulled out
	}

	async runService(props: any): Promise<any> {
		const args = props.runArgs ? {
			runArgs: props.runArgs
		} : undefined;
		return await this._axios.post(`${props.url}${API_PATH}/run?serviceName=${props.serviceName}`, args);
		// TODO: define run args datastructure, it is currently defined in SwizzyDynServe I beleive. will need to be pulled out

	}

	async stopService(props: any): Promise<any> {
		const args = props.stopArgs ? {
			stopArgs: props.stopArgs
		} : undefined;
		return await this._axios.post(`${props.url}${API_PATH}/stop?serviceName=${props.serviceName}`, args);
		// TODO: define run args datastructure, it is currently defined in SwizzyDynServe I beleive. will need to be pulled out

	}

	async getRunningServices(props: any) {
		return await this._axios.get(`${props.url}${API_PATH}/running/list`);
	}
};
