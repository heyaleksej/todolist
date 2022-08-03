type TodolistType = {
    title:string
}


export const Todolist = (props:TodolistType) => {
    return(
        <div>
            <h1>{props.title}</h1>
          <div>
              <input/>
              <button>+</button>
          </div>
            <div>
                <ul><input type={"checkbox"}></input><span>css</span></ul>
                <ul><input type={"checkbox"}></input><span>js</span></ul>
                <ul><input type={"checkbox"}></input><span>html</span></ul>
            </div>
        </div>
    )

}