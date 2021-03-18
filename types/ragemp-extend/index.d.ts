// import 'ragemp-s';

  interface MpBrowsers {
    "new":(url: string) => any
  }
  interface MpGUI {
    execute: (js: string) => any
  }
  interface EventMpPoolExtended {
    callRemote: (event: string, [...args]?) => any
  }
  interface PlayerMpPoolExtended {
    local: {
      vehicle: {
        setCustomPrimaryColour: (r: number, g: number, b: number) => any;
        setCustomSecondaryColour: (r: number, g: number, b: number) => any;
        isNeonLightEnabled: (index: number) => boolean;
        setNeonLightEnabled: (index: number, enabled?: boolean) => any;
        setNeonLightsColour: (r: string, g: string, b: string) => any;
      }
    }
  }

  interface MpEx extends Mp {
    browsers: MpBrowsers;
    gui: MpGUI;
    events: EventMpPool & EventMpPoolExtended;
    players: PlayerMpPool & PlayerMpPoolExtended;
    trigger: (name: string, ...args: any[]) => void;
    invoke: (type: string, p: boolean) => void;
  }

  declare const mpex: MpEx;
