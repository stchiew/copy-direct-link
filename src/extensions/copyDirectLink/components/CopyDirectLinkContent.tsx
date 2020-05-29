import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Callout } from '@fluentui/react/lib/Callout';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IconButton, IIconProps, Icon } from '@fluentui/react';
import styles from './CopyDirectLinkComponent.module.scss';

interface ICopyLinkContentProps {
  fileName: string;
  absolutePath: string;
  domElement: any;
  onDismiss: () => void;
}

interface ICopyLinkContentState {
  linkState: string;
}
const emojiIcon: IIconProps = { iconName: 'ChromeClose' };

export default class CopyLinkContent extends
  React.Component<ICopyLinkContentProps, ICopyLinkContentState> {

  constructor(props: ICopyLinkContentProps) {
    super(props);

    this.state = {
      linkState: "Ready!"
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <Callout
          className="ms-CalloutExample-callout"
          ariaLabelledBy={'callout-label-1'}
          ariaDescribedBy={'callout-description-1'}
          role={'alertdialog'}
          gapSpace={0}
          target={this.props.domElement}
          hidden={false}
          setInitialFocus={true}
          onDismiss={this.onDismiss.bind(this)}>
          <div className={styles.justALinkContentContainer}>
            <div className={styles.iconCloseContainer}>
              <IconButton iconProps={emojiIcon} title="Close" onClick={this.onDismiss.bind(this)} />
            </div>
            <div className={styles.iconContainer} ><Icon iconName="CheckMark" className={styles.icon} /></div>
            <div className={styles.fileName}>Link {this.state.linkState}</div>
            <div className={styles.shareContainer}>
              <TextField className={styles.filePathTextBox}
                value={this.props.absolutePath}
                autoFocus
                onFocus={ev => { ev.target.select(); }}
              />
              <PrimaryButton text="Copy" onClick={this.btnCopyCLicked.bind(this)}
              />
            </div>
          </div>
        </Callout>
      </div>
    );
  }

  private onDismiss(ev: any) {
    this.props.onDismiss();
  }

  private btnCopyCLicked(): void {
    var el = document.createElement('textarea');
    el.value = this.props.absolutePath;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.focus();
    el.select();

    document.execCommand('copy');
    document.body.removeChild(el);
    this.setState({ linkState: "Copied!" });
  }
}