window.addEventListener('load', function () {

    window.ondragstart = function () {
        return false;
    }

    let loaded = false;

    if (!loaded) {
        loaded = true;
        updateAllDragableDivs();
        dragAndDrop();
    }

    var allDragableDivs;

    function updateAllDragableDivs() {
        allDragableDivs = document.querySelectorAll('.full');
    }

    var dragDiv
    var oldParent
    var isstackable;


    function dragAndDrop() {

        if (allDragableDivs.length > 0) {
            allDragableDivs.forEach(function (div) {
                if (dragDiv && !div.classList.contains('full') && div.classList.contains('no-drag')) return;

                div.addEventListener('mousedown', function (e) {

                    //RIGHT CLICK
                    if (e.which == 3) {
                        return openContextMenu(e);
                    }

                    oldParent = div;

                    dragDiv = div.querySelector('div');
                    dragDiv.style.position = 'absolute';
                    dragDiv.style.zIndex = '99';

                    document.addEventListener('mousemove', function (e) {
                        if (!dragDiv) {
                            return document.removeEventListener('mousemove', function (e) {
                                return true
                            });
                        }

                        dragDiv.style.left = e.clientX - 25 + 'px';
                        dragDiv.style.top = e.clientY - 20 + 'px';
                    });
                });

                div.addEventListener('mouseup', function (e) {
                    if (!dragDiv) return;

                    dragDiv.style = 'null';

                    const divUnderMouse = document.elementFromPoint(e.clientX, e.clientY);

                    const isTheSameItem = isSameItem(dragDiv, divUnderMouse);


                    if (isTheSameItem) {
                        stackItems(dragDiv, divUnderMouse);
                        return clear();
                    }

                    if (divUnderMouse.classList.contains('empty')) {
                        divUnderMouse.classList.remove('empty');
                        divUnderMouse.classList.add('full');

                        divUnderMouse.dataset.itemid = dragDiv.parentNode.dataset.itemid;
                        divUnderMouse.dataset.amount = dragDiv.parentNode.dataset.amount;
                        divUnderMouse.dataset.isstackable = dragDiv.parentNode.dataset.isstackable;

                        cleanOldDiv();
                        resetDiv(div.parentNode);

                        divUnderMouse.append(dragDiv);
                    } else {
                        oldParent.append(dragDiv);
                    }

                    clear();
                    function clear() {
                        dragDiv = null;
                        oldParent = null;
                        isstackable = null;

                        document.removeEventListener('mousemove', function (e) {
                            return true
                        });
                        document.removeEventListener('mouseup', function (e) {
                            return true
                        });
                        document.removeEventListener('mousedown', function (e) {
                            return true
                        });

                        updateAllDragableDivs();
                        dragAndDrop();
                    }

                    function cleanOldDiv() {
                        oldParent.classList.remove('full');
                        oldParent.classList.add('empty');
                        oldParent.dataset.itemid = '';
                        oldParent.dataset.amount = '';
                        oldParent.dataset.isstackable = '';
                    }

                    return;
                });
            });
        }
    }

    function isSameItem(div, target) {
        return div.dataset.itemid == target.dataset.itemid
    }

    function stackItems(div, target) {
        
        const divParent = div.parentNode;
        const targetParent = target.parentNode.parentNode;

        if(targetParent.dataset.isstackable == 'false') return;

        var amount = parseInt(divParent.dataset.amount);
        var targetAmount = parseInt(targetParent.dataset.amount);

        target.dataset.amount = amount + targetAmount;

        targetParent.querySelector('span').innerHTML = amount + targetAmount;

        divParent.classList.remove('full');
        divParent.classList.add('empty');

        resetDiv(div.parentNode);

        div.remove();
        return;
    }

    function resetDiv(div) {
        div.dataset.isstackable = "";
        div.dataset.amount = "";
        div.dataset.itemid = ""
    }

    function openContextMenu(div) {}
});