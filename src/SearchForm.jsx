



export default function SearchForm ({setsearch}) {



    return (
    <form onSubmit={(e)=>{
        e.preventDefault();

        setsearch(e.target[0].value);
        }}>
        <input placeholder="search topic" ></input>
        <input type="submit" style={{display: "none"}} />
    </form>
    );
}

