mp.events.addCommand('veh', (player: PlayerMp, _: string, vehName: string) => {
  if (vehName && vehName.trim().length > 0) {
      let pos = player.position;
      pos.x += 2;
  } else {
      player.outputChatBox(`<b>Command syntax:</b> /veh [vehicle_name]`);
  }
});

mp.events.addCommand('skin', (player: PlayerMp, _: string, skinName: string) => {
  if (skinName && skinName.trim().length > 0)
      player.model = mp.joaat(skinName);
  else
      player.outputChatBox(`<b>Command syntax:</b> /skin [skin_name]`);
});

mp.events.addCommand('fix', (player: PlayerMp) => {
  if (player.vehicle)
      player.vehicle.repair();
  else
      player.outputChatBox(`<b>Error:</b> you are not in the vehicle!`);
});

mp.events.addCommand('flip', (player: PlayerMp) => {
  if (player.vehicle) {
      let rotation = player.vehicle.rotation;
      rotation.y = 0;
      player.vehicle.rotation = rotation;
  } else {
      player.outputChatBox(`<b>Error:</b> you are not in the vehicle!`);
  }
});

mp.events.addCommand('weapon', (player: PlayerMp, _: string, weaponName: string) => {
  if (weaponName.trim().length > 0)
      player.giveWeapon(mp.joaat(`weapon_${weaponName}`), 100);
  else
      player.outputChatBox(`<b>Command syntax:</b> /weapon [weapon_name]`);
});

mp.events.addCommand('kill', (player: PlayerMp) => {
  player.health = 0;
});

mp.events.addCommand('hp', (player: PlayerMp) => {
  player.health = 100;
});

mp.events.addCommand('armour', (player: PlayerMp) => {
  player.armour = 100;
});

mp.events.addCommand('warp', (player: PlayerMp, _: string, playerID: string) => {
  if (playerID && playerID.trim().length > 0) {
      let sourcePlayer = mp.players.at(parseInt(playerID));
      if (sourcePlayer) {
          let playerPos = sourcePlayer.position;
          playerPos.x += 1;
          player.position = playerPos;
      } else {
          player.outputChatBox(`<b>Warp:</b> player with such ID not found!`);
      }
  } else
      player.outputChatBox(`<b>Command syntax:</b> /warp [player_id]`);
});

mp.events.addCommand('tp', (player: PlayerMp, _: string, x: string, y: string ,z: string) => {
  if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z)))
      player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
  else
      player.outputChatBox(`<b>Command syntax:</b> /tp [x] [y] [z]`);
});
