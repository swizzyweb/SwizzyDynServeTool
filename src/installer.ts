import axios from 'axios';
import { SwizzyDynServeWebServiceClient } from "./client/dyn-serve-web-service-client";
import { SwizzyDynServeTool } from "./tool";
import { SwizzyDynServeToolClient } from './client/dyn-serve-tool-client';

export class SwizzyDynServeToolInstaller {
    // static install(toolkit: BrowserToolkit) { // TODO: pull out into common package
    static async install(toolkit: any): Promise<void> {
    	const actualAxios = toolkit.axios??axios;
		const webServiceClient = new SwizzyDynServeWebServiceClient({
			axios: actualAxios,
		});

		const toolClient = new SwizzyDynServeToolClient({
			axios: actualAxios
		});

        const tool = new SwizzyDynServeTool({browserToolkit: toolkit, webServiceClient, toolClient});
        toolkit.addTool(tool);
    }
}
