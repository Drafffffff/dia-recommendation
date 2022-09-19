import {useEffect, useState} from 'react'
import './App.css'
import {getRecommendData, getSelectData} from "./func.js";

function App() {
    const [s, setS] = useState([])

    const [state, setState] = useState([
        false, false, false,
        false, false, false,
        false, false, false,
        false, false, false,
    ])

    useEffect(() => {
        setS(getSelectData())
    }, [0])

    const handleSelect =(i)=>{
        const s = [...state]
        s[i]=!s[i]
        setState(s)
    }

    const handleSubmit =()=>{
        const d = [...state].map(d=>false)
        setState(d)
        const list = []
        state.forEach((item,index)=>{
            if(item===true){
               list.push(s[index])
            }
        })
        console.log(getRecommendData(list))
    }
    return (
        <div className="App">
            <div className="container">
                {s.map((d, i) => {
                    return (
                        <div key={i} className={`item${i + 1}`} onClick={()=>handleSelect(i)}>
                            <img src={`/src/img/${d.id}.png`} className={!state[i] ? 'null' : "img-outline"}
                                 alt="0"/>
                        </div>
                    )
                })}
            </div>
            <button onClick={()=>handleSubmit()}>提交</button>
        </div>)
}
export default App
