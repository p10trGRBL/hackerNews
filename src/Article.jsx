import { useEffect } from 'react';
import './App.css';



export default function Article ({article}) {

    useEffect(()=>{
        console.log(article)
    },[])

    return (<div className='article'>
    </div>);
}

