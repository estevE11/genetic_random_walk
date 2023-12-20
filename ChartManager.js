let manager = {
    chart: null,
};

function initChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    manager.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Fitness',
                data: [],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function chartAddData(data) {
    manager.chart.data.labels.push(data.generation);
    manager.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data.fitness);
    });
    manager.chart.update();
}