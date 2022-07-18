/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@micra/core/application" />
/// <reference types="@micra/core/router" />
/// <reference types="@micra/core/ui-engine" />
/// <reference types="@micra/core/request-handler" />
import type {History, Location} from 'history';

declare global {
  namespace Application {
    interface Services {
      history: History;
      request: Request;
      location: Location;
      router: Micra.Router;
      'ui-engine': Micra.UIEngine<any>;
      'request-handler': Micra.RequestHandlerManager;
    }
  }

  namespace Micra {
    interface ServiceProvider {
      registerRequest?(application: Application): void | Promise<void>;
      bootRequest?(application: Application): void | Promise<void>;
    }
  }
}

export {};
