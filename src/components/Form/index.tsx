import React from "react";
import ITarefa from "../../types/task";
import Button from "../Button";
import style from "./Form.module.scss";
import {v4 as uuidv4} from "uuid";

class Form extends React.Component<{
  setTasks: React.Dispatch<React.SetStateAction<ITarefa[]>>
}> {
  state = {
    tarefa: "",
    tempo: "00:00:00",
  };
  adicionarTarefa(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    this.props.setTasks(tasksAntigas => 
      [
        ...tasksAntigas, 
        {
          ...this.state,
          selecionado:false,
          completado:false,
          id:uuidv4()
        }
      ]
    );
    this.setState({
      tarefa: "",
      tempo: "00:00:00",
    })
  }
  render(): React.ReactNode {
    return (
      <form className={style.novaTarefa} onSubmit={this.adicionarTarefa.bind(this)}>
        <div className={style.inputContainer}>
          <label htmlFor="tarefa">Adicione um novo estudo</label>
          <input
            type="text"
            name="tarefa"
            id="tarefa"
            value={this.state.tarefa}
            onChange={(event) =>
              this.setState({ ...this.state, tarefa: event.target.value })
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
            value={this.state.tempo}
            onChange={(event) => {
              this.setState({
                ...this.state,
                tempo: event.target.value,
              });
            }}
            id="tempo"
            min="00:00:00"
            max="01:30:00"
          />
        </div>
        <Button type="submit">Adicionar</Button>
      </form>
    );
  }
}

export default Form;
