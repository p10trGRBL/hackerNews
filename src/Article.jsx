import { useEffect } from 'react';
import './Article.css';



export default function Article ({article, index}) {

    let url = article.url;
    let domain = "";
    if (url) {
        domain = url.split('/');
        domain = domain[2];
        if(domain.startsWith('www.')){
            domain = domain.substring(4);
        }
    }
    


    useEffect(()=>{
    },[])

    return (<div className='article'>
        <span>{index+1}</span>
        <a className='title' href={url || ""}>{article.title}</a>
        <a className='domain' href={domain || ""}>({domain || ""})</a>
    </div>);
}

