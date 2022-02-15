// takes in an array and returns a javascript object containing the counts
// of each key
function parseData(data) {
    const parsed_data = {};

    for (const item of data) {
        parsed_data[item] = 1 + (parsed_data[item] || 0)
    }
    return parsed_data;
}

// return array of javascript objects
function generatePieData(data, total) {
    let pie_data = [];
    const colors = [];

    for (const property in data) {
        pie_data.push({
            values: [Math.round((data[property] / total) * 100)],
            text: property,
        })
    }
    return pie_data;
}

// takes in an array of javascript object and returns an array of javascript 
// objects of the form { "values": [] }
function createRowData(data) {
    row_data = [];

    for (const object of data) {
        row_data.push({
            "values": [object.resX, object.resY, object.innerWidth, object.innerHeight]
        });
    }
    return row_data;
}

window.addEventListener('load', () => {
    let parser = new UAParser();

    let language_data_raw = [];
    let browser_data_raw = [];

    // language and browser data
    fetch('https://web-analytics.cloud/api/static/general')
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        })
        .then(data => {
            // parse data 
            let language_name = new Intl.DisplayNames(['en'], { type: 'language' });

            for (const object of data) {
                language_data_raw.push(language_name.of(object.language));
                browser_data_raw.push(
                    parser.setUA(object.userAgent).getBrowser().name
                );
            }

            language_data = parseData(language_data_raw);
            browser_data = parseData(browser_data_raw);
            console.log({ language_data, browser_data });

            // line chart
            zingchart.render({
                id: 'barChart',
                data: {
                    type: 'bar',
                    "color": '#e37455',
                    plotarea: {
                        'adjust-layout': true
                    },
                    'scale-x': {
                        label: { /* Scale Title */
                            text: "Browser Type",
                        },
                        labels: Object.keys(browser_data)
                    },
                    'scale-y': {
                        label: { /* Scale Title */
                            text: "Number of visits",
                        },
                    },
                    plot: {
                        animation: {
                            effect: "ANIMATION_EXPAND_BOTTOM"
                        }
                    },
                    series: [
                        {
                            values: Object.values(browser_data),
                            // backgroundColor: '#e37455',
                        },

                    ]
                }
            });

            // pie chart
            zingchart.render({
                id: 'pieChart',
                data: {
                    type: 'pie3d',
                    plotarea: {
                        'adjust-layout': true
                    },
                    series: generatePieData(language_data, language_data_raw.length)
                }
            });
        })
        .catch(error => console.error(error));


    // // dimensions data
    fetch('https://web-analytics.cloud/api/static/dimensions')
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        })
        .then(data => {

            for (const object of data) {
                delete object.id;
                delete object.sessionID;
                delete object.outerWidth;
                delete object.outerHeight;

                object.displayResolutionWidth = object.resX;
                object.displayResolutionHeight = object.resY;
                object.windowWidth = object.innerWidth;
                object.windowHeight = object.innerHeight;

                delete object.resX;
                delete object.resY;
                delete object.innerWidth;
                delete object.innerHeight;
            }
            const zgRef = document.querySelector('zing-grid');
            zgRef.setData(data);

        })
        .catch(error => console.error(error));

});