declare interface ICopyDirectLinkCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CopyDirectLinkCommandSetStrings' {
  const strings: ICopyDirectLinkCommandSetStrings;
  export = strings;
}
