import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';

declare var mixpanel: any;

@Injectable()
export class Angulartics2KeenIO {

  // Keen client for the page, needs to be set
  public client: any;

  // Keen collection that will be tracked
  public collection: string;

  // Base data model to be sent with each request
  public dataModel: object = {};

  constructor(
    private angulartics2: Angulartics2
  ) {
    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.setSuperProperties.subscribe((x: any) => this.setSuperProperties(x));
  }

  /**
   * When instantiating a Keen IO object be sure to notify this provider
   * of the new client because this global variable is not standardized.
   *
   * Documentation: https://github.com/keen/keen-js
   *
   *   var client = new Keen({
   *     projectId: "YOUR_PROJECT_ID",
   *     writeKey: "YOUR_WRITE_KEY"
   *   });
   *
   *   angulartics2KeenIO.setClient(client);
   */
  setClient(client: any) {
    this.client = client;
  }

  /**
   * Set the Keen IO collection for tracking
   */
  setCollection(collection: string) {
    this.collection = collection;
  }

  pageTrack(path: string, location: any) {
    if (! this.client || ! this.collection) {
      console.error('Please set the Keen IO client and collection first.');
      return;
    }

    const data = Object.assign(this.dataModel, {
      event: 'pageview',
      path: path,
      location: location
    });

    this.client.addEvent(this.collection, data, err => {
      if (err) {
        throw err;
      }
    });
  }

  eventTrack(action: string, properties: any) {
    if (! this.client || ! this.collection) {
      console.error('Please set the Keen IO client and collection first.');
      return;
    }

    const data = Object.assign(this.dataModel, {
      event: action
    }, properties);

    this.client.addEvent(this.collection, data, err => {
      if (err) {
        throw err;
      }
    });
  }

  /**
   * Setup your primary properties that will be called with each request.
   * This relates directly to a Keen IO data model with decorators. This
   * object will be merged with each event that is sent.
   *
   *   angulartics2KeenIO.setSuperProperties({
   *     referrer: document.referrer,
   *     keen: {
   *       timestamp: new Date().toISOString()
   *     }
   *   });
   */
  setSuperProperties(properties: object) {
    this.dataModel = properties;
  }
}
