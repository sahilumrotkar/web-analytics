async function getReportData() {
    const response = await fetch('https://collector.web-analytics.cloud/analytics/static/dimensions');
    const dimension_data = await response.json();

    return dimension_data;
}

await getReportData().then(data => console.log(data));

window.addEventListener('load', () => {






});