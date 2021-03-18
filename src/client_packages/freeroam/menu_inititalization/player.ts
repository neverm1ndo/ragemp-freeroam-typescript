export default function(browser: any) {
    mp.players.forEach(player => {
        browser.execute(`addPlayerInTheTable('${player.id}', '${player.name}');`);
    });
};
