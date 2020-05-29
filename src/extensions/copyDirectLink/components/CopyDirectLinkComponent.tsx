import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog } from '@microsoft/sp-dialog';
import CopyDirectLinkContent from './CopyDirectLinkContent';

export default class CopyDirectLinkComponent extends BaseDialog {
  public fileName: string;
  public absolutePath: string;

  public render(): void {
    ReactDOM.render(<CopyDirectLinkContent
      fileName={this.fileName}
      absolutePath={this.absolutePath}
      domElement={document.activeElement.parentElement}
      onDismiss={this.onDismiss.bind(this)}
    />, this.domElement);
  }

  private onDismiss() {
    ReactDOM.unmountComponentAtNode(this.domElement);
  }
}