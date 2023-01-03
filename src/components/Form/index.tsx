import React, { useState } from "react";
import ITarefa from "../../types/task";
import Button from "../Button";
import style from "./Form.module.scss";
import {v4 as uuidv4} from "uuid";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<ITarefa[]>>
}

function Form({setTasks}:Props) {

  const[tarefa, setTarefa] = useState("");
  const[tempo, setTempo] = useState("00:00:00");
  function adicionarTarefa(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    setTasks(tasksAntigas => 
      [
        ...tasksAntigas, 
        {
          tarefa,
          tempo,
          selecionado:false,
          completado:false,
          id:uuidv4()
        }
      ]
    );
    setTarefa("");
    setTempo("00:00:00")
  }

  return (
    <form className={style.novaTarefa} onSubmit={adicionarTarefa}>
        <div className={style.inputContainer}>
          <label htmlFor="tarefa">Adicione um novo estudo</label>
          <input
            type="text"
            name="tarefa"
            id="tarefa"
            value={tarefa}
            onChange={(event) =>
              setTarefa(event.target.value)
            }
            placeholder="O que vc quer estudar?"
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="tempo">tempo</label>
          <input
            type="time"
            step="1"
            name="tempo"
            value={tempo}
            onChange={(event) => {
              setTempo(event.target.value)
            }}
            id="tempo"
            min="00:00:00"
            max="01:30:00"
          />
        </div>
        <Button type="submit">Adicionar</Button>
      </form>
  )
}

export default Form;
