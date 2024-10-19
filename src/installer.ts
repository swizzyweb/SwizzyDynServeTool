import axios from 'axios';
import { SwizzyDynServeWebServiceClient } from "./dyn-serve-web-service-client";
import { SwizzyDynServeTool } from "./tool";

export class SwizzyDynServeToolInstaller {
    // static install(toolkit: BrowserToolkit) { // TODO: pull out into common package
    static async install(toolkit: any): Promise<void> {
    	
		const webServiceClient = new SwizzyDynServeWebServiceClient({
			axios,
		});

        const speechTool = new SwizzyDynServeTool({browserToolkit: toolkit, webServiceClient});
        toolkit.addTool(speechTool);
    }
}
