import React from 'react';
import Cronometro from '../components/Cronometro';
import Form from '../components/Form';
import List from '../components/List';
import ITarefa from '../types/task';
import style from "./App.module.scss"

function App() {
  const [tasks, setTasks] = React.useState<ITarefa[] | []>([]);
  const [selected, setSelected] = React.useState<ITarefa>();

  function selectTask(taskSelected:ITarefa) {
    setSelected(taskSelected);
    setTasks(afterTasks => afterTasks.map(task => ({
      ...task,
      selecionado: task.id === taskSelected.id ? true : false
    })))
  }
  function finishTask() {
    if(selected) {
      setSelected(undefined);
      setTasks(beforeTasks => beforeTasks.map(task => {
        if(task.id === selected.id) {
          return {
            ...task,
            selecionado: false,
            completado: true
          }
        }
        return task;
      }))
    }
  }
  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks} />
      <List 
        tasks={tasks}
        selectTask={selectTask}
      />
      <Cronometro
        selected={selected}
        finishTask={finishTask}
      />
    </div>
  );
}

export default App;
