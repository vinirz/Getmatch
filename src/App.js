import './App.css'
import Title from './assets/images/analise.svg'
import Question from './assets/images/question.svg'
import List from './components/List'


function App() {

  return <main>
      <div className='title-contain'>
        <img className='title' src={ Title } alt="Análise inicial" />
        <img  className='about' src={ Question } alt="Saber mais sobre" />
      </div>
      <List></List>
  </main>
}

export default App;
