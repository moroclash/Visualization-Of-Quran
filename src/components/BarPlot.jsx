import { Bar } from 'react-chartjs-2';
import { tashkeelOrder } from '../models/Globals';

const labels = tashkeelOrder

const BarPlot = (props) => {
    let data = {
        labels: labels,
        datasets: props.rows.map(row => {
            return ({
                label: `id: ${row.id}`,
                backgroundColor: row.color,
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                data: labels.map(label => row[label])
            })
        })
    }

    const options = {
        responsive: true,
        legend: {
            display: false,
        },
        type: 'bar',

        scales: {
            xAxes: [{
                ticks: {
                    fontSize: 30
                }
            }]
        }
    }
    return (
        <div style={{width: '100%', height: "100px"}}>
            <Bar
                data={data}
                width={null}
                height={null}
                options={options}
            />
        </div>
    )
}

export default BarPlot;
