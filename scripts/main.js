(function() {
    'use strict';

    function onReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    function each(items, callback) {
        Array.from(items).forEach(callback);
    }

    function show(element) {
        element.style.display = 'block';
    }

    function hide(element) {
        element.style.display = 'none';
    }

    function openItem(item) {
        show(item);
        each(item.querySelectorAll('.itemMembers'), show);
    }

    function addSourceLineAnchors() {
        let counter = 0;
        const source = document.querySelector('.prettyprint.source');

        if (!source) {
            return;
        }

        if (source.classList.contains('linenums')) {
            const list = source.querySelector('ol');

            if (!list) {
                return;
            }

            each(list.children, function(item) {
                counter++;
                item.id = 'line' + counter;
            });

            return;
        }

        const code = source.querySelector('code');

        if (!code) {
            return;
        }

        const numbered = code.innerHTML.split('\n').map(function(line) {
            counter++;
            return '<span id="line' + counter + '"></span>' + line;
        });

        code.innerHTML = numbered.join('\n');
    }

    onReady(function() {
        const navigation = document.querySelector('.navigation');
        const list = navigation && navigation.querySelector('.list');
        const search = document.getElementById('search');
        const pageTitle = document.querySelector('.page-title');
        let currentItem = null;

        addSourceLineAnchors();

        if (!navigation || !list) {
            return;
        }

        function showDefaultNavigation() {
            each(navigation.querySelectorAll('.item'), show);
            each(navigation.querySelectorAll('.itemMembers'), hide);

            if (currentItem) {
                openItem(currentItem);
            }
        }

        function filterNavigation() {
            const value = search.value.trim().toLowerCase();

            if (value) {
                each(navigation.querySelectorAll('li, .itemMembers'), hide);

                each(navigation.querySelectorAll('li'), function(item) {
                    const name = item.getAttribute('data-name');

                    if (name && name.toLowerCase().indexOf(value) !== -1) {
                        const itemMembers = item.closest('.itemMembers');
                        const parentItem = item.closest('.item');

                        show(item);

                        if (itemMembers) {
                            show(itemMembers);
                        }
                        if (parentItem) {
                            show(parentItem);
                        }
                    }
                });
            } else {
                showDefaultNavigation();
            }

            list.scrollTop = 0;
        }

        if (search) {
            search.addEventListener('input', filterNavigation);
            search.addEventListener('keyup', filterNavigation);
        }

        navigation.addEventListener('click', function(event) {
            const title = event.target.closest('.title');

            if (!title || !navigation.contains(title)) {
                return;
            }

            each(title.parentNode.querySelectorAll('.itemMembers'), function(item) {
                if (window.getComputedStyle(item).display === 'none') {
                    show(item);
                } else {
                    hide(item);
                }
            });
        });

        if (pageTitle) {
            const filename = pageTitle.getAttribute('data-filename') || '';

            each(navigation.querySelectorAll('.item'), function(item) {
                const link = item.querySelector('.title a');
                const href = link && link.getAttribute('href');

                if (!currentItem && href === filename) {
                    currentItem = item;
                }
            });

            if (currentItem) {
                const currentLink = currentItem.querySelector('.title a');

                currentItem.classList.add('is-current');
                if (currentLink) {
                    currentLink.setAttribute('aria-current', 'page');
                }

                openItem(currentItem);
                currentItem.scrollIntoView({ block: 'nearest' });
            }
        }

    });
})();
