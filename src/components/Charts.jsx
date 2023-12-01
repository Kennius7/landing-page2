import { useEffect } from 'react';
import Chart from 'chart.js/auto';




function Charts() {
  useEffect(() => {
    // Dummy data for demonstration
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Courses',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: 'bar',
      data: data,
    };

    // Create a new chart instance
    const myChart = new Chart(document.getElementById('myChart'), config);

    // Cleanup chart on component unmount
    return () => myChart.destroy();
  }, []);



  return (
    <>
        <div className='w-full h-full'>
            <h2>Charts</h2>
            <canvas id="myChart" width="400" height="200"></canvas>
        </div>
    </>
  );
}

export default Charts;

