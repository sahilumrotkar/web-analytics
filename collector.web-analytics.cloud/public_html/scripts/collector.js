export const data = {
    static: {
        general: {
            userAgent: null,
            language: null,
            acceptsCookies: null
        },
        dimensions: {
            innerWidth: null,
            innerHeight: null,
            outerWidth: null,
            outerHeight: null
        },
        connection: {
            downlink: null,
            effectiveType: null,
            rtt: null,
            saveData: null
        },
        ready: false
    },
    performance: {
        startTime: null,
        fetchStart: null,
        requestStart: null,
        responseStart: null,
        responseEnd: null,
        domInteractive: null,
        domContentLoadedEventStart: null,
        domContentLoadedEventEnd: null,
        domComplete: null,
        loadEventStart: null,
        loadEventEnd: null,
        duration: null,
        transferSize: null,
        decodedBodySize: null,
        ready: false
    },
    activity: {
        mousePosition: [],
        mouseClicks: [],
        keydown: [],
        keyup: [],
        timing: {
            pageEnter: null,
            pageLeave: null,
            currPage: null
        }
    }
};

// Get the current time as soon as this script loads for an accurate page enter
data.activity.timing.pageEnter = new Date().getTime();
// Get the URL path as well since that does not require the page to load
data.activity.timing.currPage = window.location.pathname;
// Right before the user leaves the page, capture the time and store it
window.addEventListener('beforeunload', () => {
    data.activity.timing.pageLeave = new Date().getTime();
    postData(
        'https://collector.web-analytics.cloud/analytics/activity/timing',
        data.activity.timing,
        responseText => console.log(responseText)
    );
});

/**
 * Collects all of the static data outlined in the data object above
 */
function collectStaticData() {
    data.static.general.userAgent = navigator.userAgent;
    data.static.general.language = navigator.language;
    data.static.general.acceptsCookies = navigator.cookieEnabled;
    data.static.dimensions = {
        resX: window.screen.width,
        resY: window.screen.height,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight
    };
    if (navigator.connection) {
        data.static.connection = {
            downlink: navigator.connection.downlink,
            effectiveType: navigator.connection.effectiveType,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData
        };
    }
    data.static.ready = true;
}

/**
 * Collects all of the performance data outlined in the data object above
 */
function collectPerformanceData() {
    let perf = performance.getEntriesByType('navigation')[0];
    // Safari doesn't support the new PerformanceNavigationTiming API yet
    perf ||= performance.timing;
    // Call this method every 250ms to check if loading has finished
    if (perf.loadEventEnd == 0) {
        setInterval(collectPerformanceData, 250);
    } else {
        data.performance.startTime = perf.startTime;
        data.performance.fetchStart = perf.fetchStart;
        data.performance.requestStart = perf.requestStart;
        data.performance.responseStart = perf.responseStart;
        data.performance.responseEnd = perf.responseEnd;
        data.performance.domInteractive = perf.domInteractive;
        data.performance.domContentLoadedEventStart = perf.domContentLoadedEventStart;
        data.performance.domContentLoadedEventEnd = perf.domContentLoadedEventEnd;
        data.performance.domComplete = perf.domComplete;
        data.performance.loadEventStart = perf.loadEventStart;
        data.performance.loadEventEnd = perf.loadEventEnd;
        data.performance.duration = perf.duration;
        data.performance.transferSize = perf.transferSize;
        data.performance.decodedBodySize = perf.decodedBodySize;
        data.performance.ready = true;
    }
}

/**
 * Binds all of the event listeners for mouse clicks and keystrokes
 */
function bindActivityEvents() {
    let mousemoveEvents = 0;

    // Record every 20th mouse coordinate inside the window (there will be a lot)
    window.addEventListener('mousemove', e => {
        mousemoveEvents += 1;
        if (mousemoveEvents % 20 != 0) return;
        let newMouseMove = {
            clientX: e.clientX,
            clientY: e.clientY,
            layerX: e.layerX,
            layerY: e.layerY,
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            pageX: e.pageX,
            pageY: e.pageY,
            screenX: e.screenX,
            screenY: e.screenY,
            x: e.x,
            y: e.y,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            timestamp: e.timeStamp
        };
        data.activity.mousePosition.push(newMouseMove);
    });

    // Record all mouse clicks inside the window
    window.addEventListener('click', e => {
        let newClick = {
            clientX: e.clientX,
            clientY: e.clientY,
            layerX: e.layerX,
            layerY: e.layerY,
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            pageX: e.pageX,
            pageY: e.pageY,
            screenX: e.screenX,
            screenY: e.screenY,
            x: e.x,
            y: e.y,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            timestamp: e.timeStamp
        };
        data.activity.mouseClicks.push(newClick);
    });

    // Record all keydowns inside the window
    window.addEventListener('keydown', e => {
        let newKeydown = {
            key: e.key,
            code: e.code,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            timestamp: e.timeStamp
        };
        data.activity.keydown.push(newKeydown);
    });

    // Record all keyups inside the window
    window.addEventListener('keyup', e => {
        let newKeyup = {
            key: e.key,
            code: e.code,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            timestamp: e.timeStamp
        };
        data.activity.keyup.push(newKeyup);
    });
}

function postData(url, body, responseHandler) {
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.text()
        })
        .then(responseHandler)
        .catch(error => console.log(error));
}

function postActivityData(url, body, responseHandler) {
    if (body.length != 0) {
        postData(url, body[0], responseHandler);
    }
}

/**
 * The "initialize" function here begins the collector program by calling all
 * of the necessary methods. Organizing the code this way makes sure that
 * nothing runs before it is ready to run.
 */
function init() {
    collectStaticData();
    collectPerformanceData();
    bindActivityEvents();

    setInterval(
        function () {
            postActivityData(
                'https://collector.web-analytics.cloud/analytics/activity/mouseclick',
                data.activity.mouseClicks,
                function (responseText) {
                    data.activity.mouseClicks.shift();
                    console.log(responseText);
                }
            )
        }, 15000
    );

    setInterval(
        function () {
            postActivityData(
                'https://collector.web-analytics.cloud/analytics/activity/mouseposition',
                data.activity.mousePosition,
                function (responseText) {
                    data.activity.mousePosition.shift();
                    console.log(responseText);
                }
            )
        }, 15000
    );

    setInterval(
        function () {
            postActivityData(
                'https://collector.web-analytics.cloud/analytics/activity/keyup',
                data.activity.keyup,
                function (responseText) {
                    data.activity.keyup.shift();
                    console.log(responseText);
                }
            )
        }, 15000
    );

    setInterval(
        function () {
            postActivityData(
                'https://collector.web-analytics.cloud/analytics/activity/keydown',
                data.activity.keydown,
                function (responseText) {
                    data.activity.keydown.shift();
                    console.log(responseText);
                }
            )
        }, 15000
    );

    postData(
        'https://collector.web-analytics.cloud/analytics/static/general',
        data.static.general,
        response => console.log(response)
    );
    postData(
        'https://collector.web-analytics.cloud/analytics/static/dimensions',
        data.static.dimensions,
        response => console.log(response)
    );
    postData(
        'https://collector.web-analytics.cloud/analytics/static/connection',
        data.static.connection,
        response => console.log(response)
    );

    // checks if the performance data has been set every 300ms
    const interval_id = setInterval(function () {
        if (data.performance.ready) {
            postData(
                'https://collector.web-analytics.cloud/analytics/performance',
                data.performance,
                responseText => {
                    clearInterval(interval_id);
                    console.log(responseText)
                }
            )
        }
    }, 300);

}

// The initilize function will run once the DOM has been parsed which gives
// some time for things to load
window.addEventListener('DOMContentLoaded', init);
