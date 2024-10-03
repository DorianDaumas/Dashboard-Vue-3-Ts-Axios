const labels = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
]

const labelsCountry = ['USA', 'GER', 'AUS', 'FRA', 'RO', 'BR', 'UK']

export const data1 = {
  labels: labels,
  datasets: [
    {
      label: ' Expéditions',
      backgroundColor: '#27293d',
      data: [65, 59, 80, 81, 56, 55, 65, 59, 60, 81, 55, 40],
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

export const data2 = {
  labels: labels.slice(0, 6),
  datasets: [
    {
      label: ' Expéditions',
      backgroundColor: '#27293d',
      data: [65, 59, 80, 81, 56, 55, 65, 59, 60, 81, 55, 40],
      fill: {
        target: 'origin',
        above: 'rgba(66, 184, 131, .10)',
        below: 'red'
      },
      title: {
        display: false
      },
      borderColor: 'rgb(66 184 131)',
      color: 'white',
      tension: 0.4,
      hoverBorderWidth: '3'
    }
  ]
}

export const data3 = {
  labels: labelsCountry,
  datasets: [
    {
      label: ' Transactions',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: ['rgba(54, 162, 235, 0.2)'],
      borderColor: ['#1d8cf8'],
      borderWidth: 2
    }
  ]
}

export const data4 = {
  labels: labels.slice(0, 5),
  datasets: [
    {
      label: ' Tâches',
      backgroundColor: '#27293d',
      data: [65, 59, 80, 81, 56, 55, 65, 59, 60, 81, 55, 40],
      fill: {
        target: 'origin',
        above: 'rgb(253 93 147 / 5%)',
        below: 'red'
      },
      title: {
        display: false
      },
      borderColor: 'rgb(253 93 147)',
      color: '#fd5d93',
      tension: 0.4,
      hoverBorderWidth: '3'
    }
  ]
}

export const dataPie = {
  labels: ['USA', 'France', 'Allemagne', 'Belgique', 'Australie', 'Royaume-Uni', 'Brésil'],
  datasets: [
    {
      backgroundColor: [
        '#42b883',
        '#2196F3',
        '#F57C00',
        '#FFB74D',
        '#FFF176',
        '#B0BEC5',
        '#ECEFF1'
      ],
      data: [53.23, 20.43, 10.53, 7.87, 5.94, 3.95, 1.05]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
