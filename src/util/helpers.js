var register = function (Handlebars) {
    var helpers = {
        dateToLocaleStr: function (dateISO8601) {
            return new Date(dateISO8601).toLocaleString();
        },
        stringify: function (obj) {
            return JSON.stringify(obj);
        },
        displayNone: function (disableFAB) {
            return disableFAB ? 'mdc-fab--exited' : '';
        },
        debug: function (obj) {
            console.log(obj);
        },
        ifCond: function(v1, v2, trueResult, falseResult) {
            //console.log(v1 == v2 ? trueResult : falseResult);
            if (v1 == v2) return trueResult;
            else falseResult;
        },
        drawerIndex: function (routerStr, tabStr) {
            return routerStr == tabStr ? '0' : '-1';
        },
        stressPronounciation: function (pronounciation, stress) {
            var words = pronounciation.split(' / ');
            var stresses = stress.toString().split(',');
            var resultP = '';

            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                var syllables = word.split('-');
                var resultW = '';

                for (var j = 0; j < syllables.length; j++) {
                    var syllable = syllables[j];
                    var el = stresses[i] == (j + 1) ? '<b>' + syllable + '</b>' : syllable;

                    resultW += !resultW ? el : '-' + el;
                }
                resultP += !resultP ? resultW : ' ' + resultW;
            }
            return resultP;
        },
        getPageIndex: function (items, wordToHighlight) {
            // console.log(wordToHighlight);
            // console.log(maxItemsPerPage);
            var itemsArr = items.reduce(function (prev, curr) {
                var word = curr.word.toLowerCase();
                if (word) prev.push(word);
                return prev;
            }, []);
            // console.log(itemsArr);
            var itemIx = itemsArr.indexOf(wordToHighlight.toLowerCase()) + 1;
            var maxes = [1, 2, 3, 4];
            var pageIxs = [];

            for (var i = 0; i < maxes.length; i++) {
                var maxItemsPerPage = maxes[i];
                var pageIx = Math.ceil(itemIx / maxItemsPerPage);

                pageIxs.push(pageIx + 1);
            }
            
            // console.log(pageIx);
            return pageIxs;
        },
        buildPages: function (items, wordToHighlight) {
            var stressPronounciation = function (pronounciation, stress) {
                var words = pronounciation.split(' / ');
                var stresses = stress.toString().split(',');
                var resultP = '';

                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    var syllables = word.split('-');
                    var resultW = '';

                    for (var j = 0; j < syllables.length; j++) {
                        var syllable = syllables[j];
                        var el = stresses[i] == (j + 1) ? '<b class="glossary-stress">' + syllable + '</b>' : '<span class="glossary-no-stress">' + syllable + '</span>';

                        resultW += !resultW ? el : '-' + el;
                    }
                    resultP += !resultP ? resultW : ' ' + resultW;
                }
                return resultP;
            }
            
            var maxes = [1, 2, 3, 4];
            var pagesBySize = [];

            for (var h = 0; h < maxes.length; h++) {
                var max = maxes[h];
                var pages = '';
                var page = '';
                var wordsOnPage = [];

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var definitions = item.definition.split('; ');
                    var title = '';
                    var definition;
                    //page = i % 4 == 0 ? '<div class="test">' : page; 

                    wordsOnPage.push(item.word);

                    page +=
                        '<div class="mdc-card glossary-item' + (wordToHighlight.toLowerCase() == item.word.toLowerCase() ? " glossary-item-selected" : "") + '">' +
                        '<div>' +
                        '<b class="glossary-word">' + item.word +
                        '</b> [' + stressPronounciation(item.pronounciation, item.stress) + ']' +
                        '</div>' +
                        '<hr class="mdc-list-divider">' +
                        '<div class="glossary-definition">' +
                        '<div class="glossary-type">' +
                        '<i>' + item.type +
                        '</i>' +
                        '</div>' +
                        '<br>' +
                        '<ol>';

                    for (var j = 0; j < definitions.length; j++) {
                        definition = definitions[j];
                        page += '<li>' + definition + '</li>';
                    }

                    page += '</ol>' + '</div>' + '</div>';

                    if (i % max == (max - 1) || i == items.length - 1) {
                        title = 'Starts with ' + (wordsOnPage[0].substr(0, 12).trim() != wordsOnPage[0].trim()) ? wordsOnPage[0].substr(0, 12) + '...' : wordsOnPage[0].substr(0, 12);
                        page = '<div title="' + title + '">' + page + '</div>';
                        pages += page;
                        page = '';
                        wordsOnPage = [];
                    }
                }
                pagesBySize.push({pages: pages, display: max === 4 ? '' : 'glossary-hidden'});
            }
            // console.log(pagesBySize);
            return pagesBySize;
        },
        isActiveBoolean: function (routerStr, tabStr) {
            return routerStr == tabStr;
        },
        isActiveIndex: function (routerStr, tabStr) {
            return routerStr == tabStr ? 0 : -1;
        },
        isActiveTabClass: function (routerStr, tabStr) {
            return routerStr == tabStr ? 'mdc-tab mdc-tab--active' : 'mdc-tab';
        },
        isActiveIndicatorClass: function (routerStr, tabStr) {
            return routerStr == tabStr ? 'mdc-tab-indicator mdc-tab-indicator--active' : 'mdc-tab-indicator';
        },
        isActiveDrawerClass: function (routerStr, tabStr) {
            return routerStr == tabStr ? 'mdc-list-item mdc-list-item--activated' : 'mdc-list-item';
        },
        isActiveDrawerLogo: function (routerStr, tabStr) {
            return routerStr == tabStr ? '../../images/LAUX-color/LAUX-color/LAUX-blk.png' : '../../images/LAUX-color/LAUX-color/LAUX-blk.png';
        },
        isSelected: function (requestType, optionType) {
            return requestType == optionType ? 'mdc-list-item--selected' : '';
        },
        getColor: function (rec) {
            return rec == 'warning' ? 'maybe'
                : rec == 'error' ? 'no'
                    : 'yes';
        },
        noUpcomingEvents: function(events) {
            var today = new Date();
            return !events || events.length === 0 || events.filter(e => new Date(e.dateOfEvent) >= today).length == 0;
        },
        upcomingEvents: function (events, max, options) {
            if (!events || events.length === 0) {
                return options.inverse(this);
            }
            var today = new Date();
            //var sortFx = function(a, b) {
            //    return b.date - a.date;
            //};
            var result = [];
            var counter = 0;
            //events.sort(sortFx);

            for (var i = 0; i < events.length; i++) {
                // console.log(events[i]);
                var date = new Date(events[i].dateOfEvent);
                // console.log(date);

                //console.log(events[i]);
                //console.log(date >= today);

                if (date >= today && counter < max) {

                    result.push(options.fn(events[i]));
                    counter++;
                }
            }
            result = result.toString();
            result = result.replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g, '').replace(/>, </g, '><');
            // console.log(result);
            return result;
        },
        futureEvents: function (events, options) {
            if (!events || events.length === 0) {
                return options.inverse(this);
            }
            var today = new Date();
            var result = [];

            for (var i = 0; i < events.length; i++) {
                var date = new Date(events[i].dateOfEvent);

                if (date >= today) {

                    result.push(options.fn(events[i]));
                }
            }
            result = result.toString();
            result = result.replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g, '').replace(/>, </g, '><');
            return result;
        },
        pastEvents: function (events, options) {
            if (!events || events.length === 0) {
                return options.inverse(this);
            }
            var today = new Date();
            var result = [];

            for (var i = 0; i < events.length; i++) {
                var date = new Date(events[i].dateOfEvent);

                if (date < today) {

                    result.push(options.fn(events[i]));
                }
            }
            result = result.toString();
            result = result.replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g, '').replace(/>, </g, '><');
            return result;
        },
        if_isUpcoming: function (event, options) {
            var today = new Date();

            if (event.date >= today) return options.fn(this);
            else options.inverse(this);

        },
        getRegistrationDetails: function (obj) {
            var signature = obj.signature;
            var idnumber = obj.idnumber;
            var registration = obj.registration;

            return registration || (signature + '\n' + idnumber);
        },
        toTitleCase: function (str) {
            return str.replace('-', ' ').replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null); 