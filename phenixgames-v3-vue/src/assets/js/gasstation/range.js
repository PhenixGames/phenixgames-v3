window.addEventListener('load', function () {
    const _R = document.getElementById('r'),
        _W = _R.parentNode,
        _O = _R.nextElementSibling;

    document.documentElement.classList.add('js');

    _R.addEventListener(
        'input',
        (e) => {
            _O.value = _R.value + 'L';
            _W.style.setProperty('--val', +_R.value);

            const currentPrice = _R.value * this['selected_type'];

            this.current_price = currentPrice;
        },
        false
    );
});
