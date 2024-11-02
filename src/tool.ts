import { IBrowserToolkit, Tool, IToolInstaller} from '@swizzyweb/browser-toolkit-interface';
import { ISwizzyDynServeWebServiceClient } from './client/dyn-serve-web-service-client';
import { ISwizzyDynServeToolClient } from './client/dyn-serve-tool-client';

export interface ISwizzyDynServeToolProps {
	browserToolkit: IBrowserToolkit;
	//swizzyDynServeClient: ISwizzyDynServeClient;
	rootApiUrl?: string; // ie: http://localhost:3005 , note: exlude /v1/manage/tools/download
 	webServiceClient: ISwizzyDynServeWebServiceClient;
	toolClient: ISwizzyDynServeToolClient;
};

export interface IServiceProps {
	serviceName: string;
	port?: number;
};

export class SwizzyDynServeTool implements Tool {
    readonly name: string = "SwizzyDynServeTool";
    //pitch: number;
    // rate: number;
	private browserToolkit: IBrowserToolkit;
	//private swizzyDynServeClient: ISwizzyDynServeClient;
	private static readonly INSTALLER_TOOL_NAME = 'InstallerTool'
	private rootApiUrl?: string;
	private webServiceClient: ISwizzyDynServeWebServiceClient;
	private _toolClient: ISwizzyDynServeToolClient;
    constructor(props: ISwizzyDynServeToolProps) {
    	this.browserToolkit = props.browserToolkit;
		//this.swizzyDynServeClient = props.swizzyDynServeClient;
		this.rootApiUrl = props.rootApiUrl;
		this.webServiceClient = props.webServiceClient;
		this._toolClient = props.toolClient;
	}

	async installService(props: IServiceProps) {
		const response = await this.webServiceClient.installService({url: this.rootApiUrl!, serviceName: props.serviceName, runArgs: props.port});
		// Error handling
		return response.data;
	}

	async runService(props: IServiceProps) {
		const response = await this.webServiceClient.runService({url: this.rootApiUrl!, serviceName: props.serviceName, port: props.port});
		// Error handling
		return response.data;
	}

	async stopService(props: IServiceProps) {
		const response = await this.webServiceClient.stopService({url: this.rootApiUrl!, serviceName: props.serviceName, port: props.port});
		// Error handling
		return response.data;
	}

	public getRootApiUrl() {
		return this.rootApiUrl;
	}

	public setRootApiUrl(rootApiUrl: string) {
		this.rootApiUrl = rootApiUrl;
	}

	async installTool(props: {toolName: string}) {
		const response = await this._toolClient.installTool({url: this.rootApiUrl, toolName: props.toolName});

		return response.data;
	}
	
	async installToolToToolkit(props: {toolName: string}) {
		const installerTool = this.browserToolkit.getTool('InstallerTool') as IToolInstaller;
		installerTool.installTool({url: `${this.rootApiUrl}/v1/tool/download?toolName=${props.toolName}`});
	}
	
	async runTool(props: {toolName: string}) {
		return (await this._toolClient.runTool({url: this.rootApiUrl, toolName: props.toolName})).data;
	}

	async stopTool(props: {toolName: string}) {
		return (await this._toolClient.stopTool({url: this.rootApiUrl, toolName: props.toolName})).data;
	}
	
	async getRunningWebServices(props: {}) {
		const response = await this.webServiceClient.getRunningServices({url: this.rootApiUrl});
		// error handling
		return response.data;
	}
	
	async getRunningTools(props: {}) {
		const response = await this._toolClient.getRunningTools({url: this.rootApiUrl});
		return response.data;
	}
}


export interface IInstallServiceProps {
	url: string; // ie: http://localhost:3005/v1/manage/tools/download
	toolName: string; // ie: @swizzyweb/swap-cache-db-client-tool
};

export interface IInstallToolProps {
	url: string;// IE: http://localhost:3005/v1/manage/tools/download?toolName=@swizzyweb/speech-tool
 
	//url: string; // ie: http://localhost:3005/v1/manage/tools/download
	//toolName: string; // ie: @swizzyweb/swap-cache-db-client-tool
};

export interface IGetRunningToolsProps {
	
};

export interface IGetRunningWebServicesProps {
	
};

export interface ISwizzyDynServeClient {
	installService(props: IInstallServiceProps): Promise<any>; // TODO: implement result interface
	installTool(props: IInstallToolProps): Promise<any>;
	getRunningTools(props: IGetRunningToolsProps): Promise<any>;
	getRunningWebServices(props: IGetRunningWebServicesProps): Promise<any>;
};
