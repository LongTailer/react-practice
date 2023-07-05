import react from "react";
import { useState } from "react";

function TodoList() {
    //配列の初期化
    const[tasks,setTasks] = useState([]);
    const[inputValue,setInputValue] = useState('');

    //addボタン押下時処理
    const addTask = () => {
        //inputValueが空でない場合にタスクリストに追加する。isCompleted:タスクの実施状況。
        if (inputValue.trim()){
            setTasks([...tasks,{ text: inputValue, isCompleted: false}]);
            //配列を空にする
            setInputValue('');
        }
    };

    //タスクのチェックが押された時
    const toggleTaskCompletion = (index) => {
        //タスク配列をコピー
        const newTasks = [...tasks];
        //引数のindex番号のタスクを反転させる。
        //'!'は真偽値を反転させるためtrueならfalseを、falseならtrueを返す。
        newTasks[index].isCompleted = !newTasks[index].isCompleted;
        //タスクのステータスを更新
        setTasks(newTasks);
    }

    //タスクの削除
    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index,1)
        setTasks(newTasks);
    }

    return (
        <div>
            <h2>Tasks:</h2>
            {/* tasks配列の各項目をリスト項目としてレンダリングする。 */}
            {tasks.map((task,index)=> (
                <div key = {index}>
                    <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={()=>toggleTaskCompletion(index)} //イベントハンドラindexを渡してisCompletedを反転
                    />
                    {/* 完了したタスクには取り消し線を表示させる
                    isCompletedがtrueならline-throughをfalseであればnoneをセット */}
                    <span style={{textDecoration:task.isCompleted ? 'line-through' : 'none'}}>
                        {task.text}
                    </span>
                    <button onClick={() => deleteTask(index)}>削除</button>
                </div>
            ))}
            {/* 制御されたコンポーネント? */}
             <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={addTask}>Add</button>

        </div>
    );
}

export default TodoList;