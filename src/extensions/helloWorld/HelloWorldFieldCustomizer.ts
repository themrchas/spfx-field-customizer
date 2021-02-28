import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'HelloWorldFieldCustomizerStrings';
import styles from './HelloWorldFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
  
}

const LOG_SOURCE: string = 'HelloWorldFieldCustomizer';

export default class HelloWorldFieldCustomizer
  extends BaseFieldCustomizer<IHelloWorldFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    //this.context and this.properties are available.

     // this.properties.sampleText = "Yes - money";

    Log.info(LOG_SOURCE, 'Activated HelloWorldFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "HelloWorldFieldCustomizer" and "${strings.Title}"`);
    console.log("onInit: this.context and this.properties are",this.context, this.properties);
    return Promise.resolve<void>();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering
    //waits on a resolved promise from onInit; 
    //Called for each property listed in fieldCustomizer 

    console.log("onRenderCell: current event is",event,"with fieldValue", event.fieldValue);
    //const text: string = `${this.properties.sampleText}: ${event.fieldValue}`;
    console.log('onRenderCell: current item internal name is', this.context.field.internalName);
    console.log('onRenderCell: this.context is', this.context);
    event.domElement.classList.add(styles.cell); 


    //Note that for the debug testing used the internal name 'Percent' which matches the test
    //list.
    if (this.context.field.internalName == 'SPFxPercentage') 
    //if (this.context.field.internalName == 'Percent')
      event.domElement.innerHTML = `
          <div class='${styles.HelloWorld}'>
          <div class='${styles.full}'>
          <div style='width: ${event.fieldValue}px; background:#0094ff; color:#c0c0c0'>
              &nbsp; ${event.fieldValue}
          </div>
        </div>
    </div>`; 

  //  event.domElement.innerHTML = `<div style='width:50px background:#0094ff; color:#c0c0c0'>
    //      &nbsp; ${event.fieldValue}
    //      </div>`;

    else
      event.domElement.innerText = `${event.fieldValue}`;


   
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
