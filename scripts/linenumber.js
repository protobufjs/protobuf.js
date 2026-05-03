(function() {
    'use strict';

    let counter = 0;
    const source = document.querySelector('.prettyprint.source');

    if (source) {
        const linenums = source.classList.contains('linenums');

        if (linenums) {
            const list = source.getElementsByTagName('ol')[0];
            if (!list) {
                return;
            }

            Array.from(list.children).forEach(function(item) {
                counter++;
                item.id = 'line' + counter;
            });
        } else {
            const code = source.getElementsByTagName('code')[0];
            if (!code) {
                return;
            }

            const numbered = code.innerHTML.split('\n').map(function(item) {
                counter++;
                return '<span id="line' + counter + '"></span>' + item;
            });

            code.innerHTML = numbered.join('\n');
        }
    }
})();
