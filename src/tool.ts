import { IBrowserToolkit, Tool, IToolInstaller} from '@swizzyweb/browser-toolkit-interface';
import { ISwizzyDynServeWebServiceClient } from './dyn-serve-web-service-client';

export interface ISwizzyDynServeToolProps {
	browserToolkit: IBrowserToolkit;
	//swizzyDynServeClient: ISwizzyDynServeClient;
	rootApiUrl?: string; // ie: http://localhost:3005 , note: exlude /v1/manage/tools/download
 	webServiceClient: ISwizzyDynServeWebServiceClient;
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
    constructor(props: ISwizzyDynServeToolProps) {
    	this.browserToolkit = props.browserToolkit;	
		//this.swizzyDynServeClient = props.swizzyDynServeClient;
		this.rootApiUrl = props.rootApiUrl;
		this.webServiceClient = props.webServiceClient;
	}

	async installService(props: {serviceName: string}) {
		const response = await this.webServiceClient.installService({url: this.rootApiUrl!, serviceName: props.serviceName});
		// Error handling
		return response.data;
	}

	async runService(props: {serviceName: string}) {
		const response = await this.webServiceClient.runService({url: this.rootApiUrl!, serviceName: props.serviceName});
		// Error handling
		return response.data;
	}

	async stopService(props: {serviceName: string}) {
		const response = await this.webServiceClient.stopService({url: this.rootApiUrl!, serviceName: props.serviceName});
		// Error handling
		return response.data;
	}

	public getRootApiUrl() {
		return this.rootApiUrl;
	}

	public setRootApiUrl(rootApiUrl: string) {
		this.rootApiUrl = rootApiUrl;
	}

	installTool(props: {toolName: string}) {
		const installerTool = this.browserToolkit.getTool('InstallerTool') as IToolInstaller;
		installerTool.installTool({url: `${this.rootApiUrl}/v1/manage/tools/download?toolName=${props.toolName}`});
	}

	
	async getRunningWebServices(props: {}) {
		const response = await this.webServiceClient.getRunningServices({});
		// error handling
		return response.data;
	}
	
	getRunningTools(props: {}) {
		
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
