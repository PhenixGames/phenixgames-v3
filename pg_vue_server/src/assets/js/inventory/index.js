window.addEventListener('load', function () {
    window.ondragstart = function () {  
        return false;
    };

    window.addEventListener('contextmenu', (e) => e.preventDefault());

    setTimeout(() => {
        updateAllDragableDivs();
        dragAndDrop();    
    }, 200);

    var allDragableDivs;

    function updateAllDragableDivs() {
        allDragableDivs = document.querySelectorAll('.full');
    }

    var dragDiv;
    var oldParent;

    function dragAndDrop() {
        if (allDragableDivs.length > 0) {
            allDragableDivs.forEach(function (div) {
                
                var isstackable;
                div.addEventListener('mousedown', function (e) {
                    //RIGHT CLICK
                    if (e.which == 3) {
                        let divUnderClick = document.elementFromPoint(e.clientX, e.clientY);
                        if (!divUnderClick.id) divUnderClick = divUnderClick.parentNode.parentNode;

                        const contextMenu = document.querySelector('.inv_context');
                        if (!contextMenu) return;

                        contextMenu.classList.remove('display-none');
                        contextMenu.style.top = divUnderClick.offsetTop + 80 + 'px';
                        contextMenu.style.left = divUnderClick.offsetLeft + 'px';

                        window.addEventListener('click', function (e) {
                            if (e.target.classList.contains('inv_context')) {
                                return handleContextInput();
                            }

                            try {
                                const parent = e.target.parentNode.classList;

                                if (parent.contains('inv_context')) {
                                    return handleContextInput();
                                }
                                removeContextMenu();
                            } catch (err) {
                                removeContextMenu();
                            }

                            function removeContextMenu() {
                                contextMenu.classList.add('display-none');

                                removeEventListener();
                                function removeEventListener() {
                                    window.removeEventListener('click', function () {
                                        return true;
                                    });
                                    div.removeEventListener('mousedown', function () {
                                        return true;
                                    });
                                }
                            }

                            function handleContextInput() {
                                const action = e.target.dataset.action;
                                if (!action) return;

                                const itemid = e.target.dataset.itemid;

                                switch (action) {
                                    case 'drop':
                                        dropItem(itemid);
                                        break;
                                    case 'use':
                                        useItem(itemid);
                                        break;
                                    case 'split':
                                        splitItem(itemid);
                                        break;

                                    default:
                                        break;
                                }
                            }

                            function dropItem(itemid) {
                                try {
                                    mp.trigger('dropItem', itemid);
                                    removeContextMenu();
                                } catch (err) {}
                            }
                            function useItem(itemid) {
                                try {
                                    mp.trigger('useItem', itemid);
                                    removeContextMenu();
                                } catch (err) {}
                            }
                            function splitItem(itemid) {
                                try {
                                    mp.trigger('splitItem', itemid);
                                } catch (err) {}
                            }
                        });

                        return;
                    }

                    if (
                        !dragDiv &&
                        div.classList.contains('full') &&
                        !div.classList.contains('no-drag')
                    ) {
                        oldParent = div;
                        div.classList.remove('full');
                        div.classList.add('empty');

                        isstackable = div.dataset.isstackable;
                        div.dataset.isstackable = '';

                        dragDiv = div.children[0];

                        dragDiv.style.position = 'absolute';
                        dragDiv.style.zIndex = '9999';

                        document.addEventListener('mousemove', function (e) {
                            if (dragDiv) {
                                dragDiv.style.left = e.clientX - 25 + 'px';
                                dragDiv.style.top = e.clientY - 20 + 'px';
                            } else {
                                document.removeEventListener('mousemove', function (e) {
                                    return true;
                                });
                            }
                        });
                    }
                });

                div.addEventListener('mouseup', function (e) {
                    if (dragDiv) {
                        dragDiv.style.pointerEvents = 'none';

                        var divUnderMousePosition = document.elementFromPoint(e.clientX, e.clientY);

                        dragDiv.style.pointerEvents = 'all';
                        dragDiv.style.position = 'relative';
                        dragDiv.style.left = '';
                        dragDiv.style.top = '';
                        dragDiv.style.zIndex = '';
                        divUnderMousePosition.dataset.isstackable = isstackable;

                        if (divUnderMousePosition.classList.contains('empty')) {
                            divUnderMousePosition.classList.remove('empty');
                            divUnderMousePosition.classList.add('full');

                            divUnderMousePosition.append(dragDiv);
                        } else {
                            oldParent.classList.remove('empty');
                            oldParent.classList.add('full');
                            oldParent.append(dragDiv);
                        }

                        updateAllDragableDivs();
                        dragAndDrop();

                        dragDiv = null;
                    }
                });
            });
        }
    }
});
