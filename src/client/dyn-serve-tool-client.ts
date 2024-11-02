import { Axios } from 'axios';

export interface ISwizzyDynServeToolClient {
	installTool(props: any): Promise<any>; // TODO: define input / output
	runTool(props: any): Promise<any>;
	stopTool(props: any): Promise<any>;
	getRunningTools(props: any): Promise<any>;
};

export interface ISwizzyDynServeWebServiceClientProps {
	axios: Axios
};

const API_PATH = '/v1/tool';

export class SwizzyDynServeToolClient implements ISwizzyDynServeToolClient {
	
	private _axios: Axios;
	constructor(props: ISwizzyDynServeWebServiceClientProps) {
		this._axios = props.axios;
	}

	async installTool(props: any): Promise<any> {
		return await this._axios.post(`${props.url}${API_PATH}/install?toolName=${props.toolName!}`); // TODO: define run args datastructure, it is currently defined in SwizzyDynServe I beleive. will need to be pulled out
	}

	async runTool(props: any): Promise<any> {
		const args = props.runArgs ? {
			runArgs: props.runArgs
		} : undefined;
		return await this._axios.post(`${props.url}${API_PATH}/run?toolName=${props.toolName!}`, args);
		// TODO: define run args datastructure, it is currently defined in SwizzyDynServe I beleive. will need to be pulled out

	}

	async stopTool(props: any): Promise<any> {
		const args = props.stopArgs ? {
			stopArgs: props.stopArgs
		} : undefined;
		return await this._axios.post(`${props.url}${API_PATH}/stop?toolName=${props.toolName!}`, args);
		// TODO: define run args datastructure, it is currently defined in SwizzyDynServe I beleive. will need to be pulled out

	}

	async getRunningTools(props: any) {
		return await this._axios.get(`${props.url}${API_PATH}/running/list`);
	}
};
