import Button from "../Button";
import Relogio from "./Relogio";

import style from "./Cronometro.module.scss";
import ITarefa from "../../types/task";
import { useEffect, useState } from "react";
import { tempoParaSegundos } from "../../common/utils/time";

interface Props {
    selected:ITarefa | undefined,
    finishTask: () => void
}
export default function Cronometro({selected, finishTask}:Props){

    const [tempo, setTempo] = useState<number>();

    useEffect(() => {
        if(selected?.tempo) {
            setTempo(tempoParaSegundos(selected.tempo))
        }
    }, [selected])

    function regressiva(contador:number = 0) {
        setTimeout(() => {
            if(contador > 0) {
                setTempo(contador -1);
                return regressiva(contador -1);
            }
            finishTask();
        }, 1000)
    }

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>escolha um card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Relogio
                    tempo={tempo}
                />
            </div>
            <Button onClick={() => regressiva(tempo)}>
                Começar!
            </Button>
        </div>
    )
}