declare interface IHelloWorldFieldCustomizerStrings {
  Title: string;
  anotherStringsProperty: string;
}

declare module 'HelloWorldFieldCustomizerStrings' {
  const strings: IHelloWorldFieldCustomizerStrings;
  export = strings;
}
