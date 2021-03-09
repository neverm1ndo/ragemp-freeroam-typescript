/**
 * Remove old files, copy front-end ones.
 */

import * as fs from 'fs-extra';
import Logger from 'jet-logger';
import { join } from 'path';
import * as childProcess from 'child_process';

// Setup logger
const logger = new Logger();
logger.timestamp = false;

(async () => {
    try {
        // Remove current build
        logger.info(`[builder]: clear ./dist directory`);
        await remove('./dist/');
        // Copy production env and conf file
        logger.info(`[builder]: copy production env and conf file`);
        await copy('./src/packages/freeroam/environment/production.env', './dist/packages/freeroam/environment/production.env');
        await copy('./src/packages/freeroam/conf.json', './dist/packages/freeroam/conf.json');
        // Copy ingame config files
        await (async () => {
          const confDir = './packages/freeroam/configs';
          await (async () => {
            fs.readdir(join('./src/', confDir), async (err: NodeJS.ErrnoException) => {
              if (err) {
                logger.info(`[builder]: creating configs directory ${confDir}`);
                await fs.mkdir(join('./dist/', confDir));
              } else {
                logger.info(`[builder]: ${confDir} exists`);
              }
            });
          })();
          fs.readdir(join('./src/', confDir), (err: NodeJS.ErrnoException, configs: string[]) => {
            if (err) throw err;
            configs.forEach(async file => {
              await copy(join('./src/',confDir, file), join('./dist/', confDir, file));
              logger.info(`[builder]: copy ingame config ${file}`);
            });
          });
        })();
        // Copy back-end files
        logger.info(`[builder]: copy back-end files`);
        await exec('tsc --build tsconfig.prod.json', './')
    } catch (err) {
        logger.err(err);
    }
})();


function remove(loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.remove(loc, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}


function copy(src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.copy(src, dest, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}


function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
            if (!!stdout) {
                logger.info(stdout);
            }
            if (!!stderr) {
                logger.warn(stderr);
            }
            return (!!err ? rej(err) : res());
        });
    });
}
