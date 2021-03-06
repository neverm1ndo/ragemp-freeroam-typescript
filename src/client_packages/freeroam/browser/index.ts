// Chat active.
let chatActive = false;
// Vehicle color.
let colorType: string | undefined = 'primary';

let newColorPrim = {r: 0, g: 0, b: 0};
let oldColorPrim = newColorPrim;

let newColorSec  = {r: 0, g: 0, b: 0};
let oldColorSec  = newColorSec;

let newColorNeon = {r: 0, g: 0, b: 0};
let oldColorNeon = newColorNeon;

// Set color type change.
$('.color_button').click(function() {
    if ($(this).attr('id') !== colorType) {
        $('.color_button').each(function(index: any, item: any) {
            $(item).removeClass('color_button_active');
        });

        $(this).addClass('color_button_active');
        colorType = $(this).attr('id');
    }
});
// const colorButton = $('.color_button').click((e: Event) => {
//
// });
// colorButton.addEventListener('click', function(e: Event) {
//   // e.target.
// })

// Apply colorpicker.
// eslint-disable-next-line no-undef
// ColorPicker(
//     document.getElementById('slide'),
//     document.getElementById('picker'),
//     function(hex: string, hsv: string, rgb: {r: number, g: number, b: number}) {
//         if (colorType === 'primary')
//             newColorPrim = rgb;
//
//         if (colorType === 'secondary')
//             newColorSec = rgb;
//
//         if (colorType === 'neon')
//             newColorNeon = rgb;
//
//         mpex.trigger('cefData', 'client_color', colorType, JSON.stringify(rgb));
//     }
// );

// Show/hide menu.
document.addEventListener('keydown', function(e) {
    if (e.key === 'F2' || e.keyCode === 113) {
        // Show freeroam menu.
        if ($('#wrapper').css('display') === 'none') {
            mpex.invoke('focus', true);
            $('#wrapper').fadeIn(250);
            $('.draggable_window').each((index, item) => {
                if ($(item).data('active') === 'true')
                    $(item).fadeIn(250);
            });

            // Hime freeroam menu.
        } else {
            mpex.invoke('focus', false);
            $('#wrapper').fadeOut(250);
            $('.draggable_window').each((index, item) => {
                $(item).fadeOut(250);
            });

            // If colors were changed - trigger to server.
            if (newColorPrim !== oldColorPrim || newColorSec !== oldColorSec) {
                mpex.trigger('cefData', 'server_color', 'color', JSON.stringify(newColorPrim), JSON.stringify(newColorSec));
                oldColorPrim = newColorPrim;
                oldColorSec  = newColorSec;
            }

            if (newColorNeon !== oldColorNeon && Object.keys(newColorNeon).length > 0) {
                mpex.trigger('cefData', 'server_color', 'neon', JSON.stringify(newColorNeon));
                oldColorNeon = newColorNeon;
            }
        }
    }
});

let centered = false;

// Show players online.
document.addEventListener('keydown', function(e) {
    if ((e.key === 'z' || e.keyCode === 90) && !chatActive) {
        if (!centered) {
            $('#online_players').css('top', Math.max(0, (($(window).height()! - $('#online_players').outerHeight()!) / 2) + $(window).scrollTop()!) + 'px');
            $('#online_players').css('left', Math.max(0, (($(window).width()! - $('#online_players').outerWidth()!) / 2) + $(window).scrollLeft()!) + 'px');
            centered = true;
        }
        $('#online_players').css('display', 'block');
    }
});

// Hide players online.
document.addEventListener('keyup', function(e: KeyboardEvent) {
  if ((e.key === 'z' || e.keyCode === 90) && !chatActive) {
    $('#online_players').css('display', 'none');
    centered = false;
  }
});

// Send vehicle name to server.
$(document).on('click', '.vehicle', function() {
    mpex.trigger('cefData', 'vehicle', $(this).data('name'));
});

// Send skin name to server.
$(document).on('click', '.skin', function() {
    mpex.trigger('cefData', 'skin', $(this).data('name'));
});

// Send weapon hash to server.
$(document).on('click', '.weapon', function() {
    mpex.trigger('cefData', 'weapon', $(this).data('hash'));
});

// Add player in the table.
function addPlayerInTheTable(id: number, name: string) {
    let text = `
            <tr id="player-${id}">
                <td class="id">${id}</td>
                <td class="name">${name}</td>
            </tr>`;

    let formated = text.replace(/\n/g, '').replace(/"/g, '"');

    $('#online_players #online_players_table tbody').append(text);
}

// Remove player from table.
function removePlayerInTheTable(id: string) {
    $('#player-'+id).remove();
}

// Set chat activity.
function setChatActive(state: any) {
    chatActive = state;
}
