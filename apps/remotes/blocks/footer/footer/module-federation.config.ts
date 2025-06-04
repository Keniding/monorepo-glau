import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'footer',
  exposes: {
    './Routes': 'apps/remotes/blocks/footer/footer/src/app/remote-entry/entry.routes.ts',
    './Component': 'apps/remotes/blocks/footer/footer/src/app/remote-entry/component.ts',
    './Module': 'apps/remotes/blocks/footer/footer/src/app/remote-entry/entry.component.ts',
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
