import { SwizzyDynServeToolInstaller } from "./installer";

console.log('Installing SwizzyDynServeTool tool with SwizzyDynServeToolInstaller ');
SwizzyDynServeToolInstaller.install((window as any).BrowserToolkit).then(() => {
console.log('Installed SwizzyDynServeTool with SwizzyDynServeToolInstaller');
}).catch((e) => {
	console.log(`Error installing SwizzyDynServeTool Error: ${e}`);
	throw e;
});

