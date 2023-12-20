import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { config } from '../data';




function Charts() {
  useEffect(() => {
    const myChart = new Chart(document.getElementById('myChart'), config);

    return () => myChart.destroy();
  }, []);


  return (
    <>
        <div className='w-full h-full'>
          <div>
            Standard Course Timeline
          </div>
            <canvas id="myChart" width="400" height="170"></canvas>
        </div>
    </>
  );
}

export default Charts;

