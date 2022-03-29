// $(function () {
//     $('.drag_items').draggable({
//         snap: true,
//         snaptolerance: 0,
//         revert: function (event, ui) {
//             $(this).data("uiDraggable").originalPosition = {
//                 top: 0,
//                 left: 0
//             };
//             return !event;
//         },
//         revertDuration: 0
//     });

//     $('.empty').droppable({
//         accept: '.drag_items',
//         drop: function (event, ui) {
//             var dropped = ui.draggable;
//             var droppedOn = $(this);
//             $(dropped).detach().css({
//                 top: 0,
//                 left: 0
//             }).appendTo(droppedOn);
//             $(dropped).addClass('empty')
//             $(droppedOn).removeClass('empty')
//         }
//     });
// });