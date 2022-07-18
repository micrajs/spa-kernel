import type {Location} from 'history';
import {createRequestFromLocation} from '../utilities/createRequestFromLocation';

export class SPAKernel implements Micra.Kernel {
  async boot(application: Micra.Application) {
    const history = application.container.use('history');

    async function onLocationChange(location: Location) {
      const request = createRequestFromLocation(location);

      application.container.value('request', request);
      application.container.value('location', location);
      for (const provider of application.serviceProviders) {
        if (provider.registerRequest) {
          await provider.registerRequest(application);
        }
      }

      for (const provider of application.serviceProviders) {
        if (provider.bootRequest) {
          await provider.bootRequest(application);
        }
      }

      await application.container.use('request-handler').handle({
        request,
        config: application.configuration.get.bind(application.configuration),
        env: application.environment.get.bind(application.environment),
        use: application.container.use.bind(application.container),
      });
    }

    history.listen(({location}) => onLocationChange(location));
    await onLocationChange(history.location);
  }

  async run(application: Micra.Application) {
    const UIEngine = application.container.use('ui-engine');

    UIEngine.mount(document as unknown as Element);
  }
}
