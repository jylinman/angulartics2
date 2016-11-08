import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2KeenIO } from './angulartics2-keenio';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2KeenIO', () => {

  var fixture: ComponentFixture<any>;
  var client: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2KeenIO
      ]
    });

    window.client = client = {
      addEvent: jasmine.createSpy('addEvent')
    };
  });

  it('should set collection',
    fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
        (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
          fixture = createRoot(RootCmp);
          advance(fixture);
          angulartics2KeenIO.setCollection('testCollection');
          expect(angulartics2KeenIO.collection).toEqual('testCollection');
      })));

  it('should set client',
    fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
        (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
          fixture = createRoot(RootCmp);
          advance(fixture);
          angulartics2KeenIO.setClient(client);
          expect(angulartics2KeenIO.client).toEqual(client);
      })));

  it('should track initial page',
    fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
        (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
          fixture = createRoot(RootCmp);
          advance(fixture);

          angulartics2KeenIO.setClient(client);
          angulartics2KeenIO.setCollection('testCollection');
          expect(client.addEvent).toHaveBeenCalledWith('testCollection', {
            event: 'pageview',
            path: '',
            location: ''
          });
      })));

  // it('should track pages',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.pageTrack.next({ path: '/abc', location: location });
  //         advance(fixture);
  //         expect(client.track).toHaveBeenCalledWith('Page Viewed', { page: '/abc' });
  //     })));
  //
  // it('should track events',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
  //         advance(fixture);
  //         expect(client.track).toHaveBeenCalledWith('do', { category: 'cat' });
  //     })));
  //
  //
  // it('should set username',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.setUsername.next('testUser');
  //         advance(fixture);
  //         expect(client.identify).toHaveBeenCalledWith('testUser');
  //     })));
  //
  // it('should set user properties',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //         advance(fixture);
  //         expect(client.people.set).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //     })));
  //
  // it('should set user properties once',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //         advance(fixture);
  //         expect(client.people.set_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //     })));
  //
  // it('should set super properties',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.setSuperProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //         advance(fixture);
  //         expect(client.register).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //     })));
  //
  // it('should set super properties once',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.setSuperPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //         advance(fixture);
  //         expect(client.register_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
  //     })));
  //
  // it('should set alias',
  //   fakeAsync(inject([Location, Angulartics2, Angulartics2KeenIO],
  //       (location: Location, angulartics2: Angulartics2, angulartics2KeenIO: Angulartics2KeenIO) => {
  //         fixture = createRoot(RootCmp);
  //         angulartics2.setAlias.next('testAlias');
  //         advance(fixture);
  //         expect(client.alias).toHaveBeenCalledWith('testAlias');
  //     })));

});
