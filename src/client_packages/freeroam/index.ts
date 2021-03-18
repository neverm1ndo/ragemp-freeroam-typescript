// CEF browser.
let menu: any;
// Configs.

import vehicles from './configs/vehicles';
import skins from './configs/skins';
import weapon from './configs/weapon';

// Initialization functions.
import vehiclesInit from './menu_inititalization/vehicles';
import skinsinit from './menu_inititalization/skins';
import weaponInit from './menu_inititalization/weapon';
import playersInit from './menu_inititalization/player';

// import { mp } from './index.d';

// Creating browser.
mp.events.add('guiReady', () => {
    if (!menu) {
        // Creating CEF browser.
        menu = mpex.browsers.new('package://freeroam/browser/index.html');
        // Init menus and events, when browser ready.
        mp.events.add('browserDomReady', (browser) => {
            if (browser == menu) {
                // Init events.
                require('freeroam/events.js')(menu);
                // Init menus.
                vehiclesInit(menu, vehicles);
                skinsinit(menu, skins);
                weaponInit(menu, weapon);
                playersInit(menu);

                mpex.gui.execute(`insertMessageToChat('<div style="background-color: rgba(0, 0, 0, 0.75); font-size: 1.0vw; padding: 6px; color: #ff0000; font-weight: 600;">Press F2 for open freeroam menu.</div>', 'true');`);
            }
        });
    }
});
