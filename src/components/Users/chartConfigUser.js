const arrayToShuffle = [65, 59, 80, 81, 56, 55, 65, 59, 60, 81, 55, 40]
const shuffledArray = arrayToShuffle.sort(() => 0.5 - Math.random())

export const data = {
  labels: 'user',
  datasets: [
    {
      label: ' Ventes',
      backgroundColor: '#27293d',
      data: shuffledArray,
      fill: {
        target: 'origin',
        above: 'rgba(75, 192, 192, .10)',
        below: 'red'
      },
      title: {
        display: false
      },
      borderColor: 'rgb(75, 192, 192)',
      color: 'white',
      tension: 0.4,
      hoverBorderWidth: '3'
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
