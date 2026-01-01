import Chart from './Chart'

const Home = () => {

  return (
    <div>
      <Chart
        style={{ width: '600px', height: '400px' }}
        title="三大前端框架使用數據"
        xData={['Vue', 'React', 'Angular']}
        seriesData={[120, 200, 150]} />
      <Chart
        style={{ width: '600px', height: '400px' }}
        title="三大前端框架使用數據2"
        xData={['Vue', 'React', 'Angular']}
        seriesData={[120, 200, 150]} />
    </div>
  )
}
export default Home