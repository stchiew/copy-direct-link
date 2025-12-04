import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
//import { Dialog } from '@microsoft/sp-dialog';
import CopyDirectLinkComponent from './components/CopyDirectLinkComponent';
//import * as strings from 'CopyDirectLinkCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICopyDirectLinkCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'CopyDirectLinkCommandSet';

export default class CopyDirectLinkCommandSet extends BaseListViewCommandSet<ICopyDirectLinkCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CopyDirectLinkCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        let siteUrl = this.context.pageContext.site.absoluteUrl;
        let endIndex = siteUrl.lastIndexOf('/sites/');
        let rootSiteUrl = siteUrl.substring(0, endIndex);

        let relativeUrl = event.selectedRows[0].getValueByName('FileRef');
        let fileName = event.selectedRows[0].getValueByName('FileLeafRef');
        let absoluteUrl = `${rootSiteUrl}${relativeUrl}`;

        const callout: CopyDirectLinkComponent = new CopyDirectLinkComponent();
        callout.fileName = encodeURI(fileName);
        callout.absolutePath = encodeURI(absoluteUrl);
        callout.show();

        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
