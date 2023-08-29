import { useEffect } from 'react';
import './Article.css';



export default function Article ({article}) {

    useEffect(()=>{
    },[])

    return (<div className='article'>
        {article.title}
    </div>);
}

