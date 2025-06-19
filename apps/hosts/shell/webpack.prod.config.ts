import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';
import * as dotenv from 'dotenv';
import * as path from 'node:path';

const loadEnvironment = () => {
  const nodeEnv = process.env['NODE_ENV'] || 'development';
  const envFile = `.env.${nodeEnv}`;

  dotenv.config({ path: path.resolve(process.cwd(), envFile) });

  console.log(`Loading environment: ${nodeEnv}`);
  console.log(`Environment file: ${envFile}`);
};

loadEnvironment();

const getRemoteBaseUrl = () => {
  const baseUrl = process.env['REMOTE_BASE_URL'] || 'http://localhost/remotes/blocks';
  console.log(`Remote base URL: ${baseUrl}`);
  return baseUrl;
};

const baseUrl = getRemoteBaseUrl();

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(
  {
    ...config,
    /*
     * Remote overrides for production.
     * Each entry is a pair of a unique name and the URL where it is deployed.
     *
     * e.g.
     * remotes: [
     *   ['app1', 'https://app1.example.com'],
     *   ['app2', 'https://app2.example.com'],
     * ]
     */

    remotes: [
      ['header', `${baseUrl}/header/header/remoteEntry.mjs`],
      ['footer', `${baseUrl}/footer/footer/remoteEntry.mjs`],
    ]
  },
  { dts: false }
);
