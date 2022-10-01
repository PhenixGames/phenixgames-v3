window.addEventListener('load', function () {

    window.ondragstart = function () {
        return false;
    }

    updateAllDragableDivs();
    dragAndDrop();

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
                    if(e.which == 3) {
                        alert('right click triggered');
                        return;
                    }

                    if (!dragDiv && div.classList.contains('full') && !div.classList.contains('no-drag')) {
                        oldParent = div;
                        div.classList.remove('full');
                        div.classList.add('empty');

                        isstackable = div.dataset.isstackable;
                        div.dataset.isstackable = "";

                        dragDiv = div.children[0];

                        dragDiv.style.position = 'absolute';
                        dragDiv.style.zIndex = '9999';

                        document.addEventListener('mousemove', function (e) {
                            if (dragDiv) {
                                dragDiv.style.left = e.clientX - 25 + 'px';
                                dragDiv.style.top = e.clientY - 20 + 'px';
                            } else {
                                document.removeEventListener('mousemove', function (e) {
                                    return true
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
                        divUnderMousePosition.dataset.isstackable = isstackable

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