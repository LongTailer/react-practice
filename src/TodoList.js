import { useState } from "react";
import './style.css';

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
        <div className="container mx-auto mt-5 max-w-xl">
            <h2 className="text-4xl font-bold mb-5">Tasks:</h2>
            {/* tasks配列の各項目をリスト項目としてレンダリングする。 */}
            {tasks.map((task,index)=> (
                <div key = {index} className="flex items-center bg-blue-100 border-1-4 border-blue-500 p-1 my-2 rounded shadow">
                    <div className="checkbox">
                        <input
                            id={`task-${index}`}
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => toggleTaskCompletion(index)}
                            className="checkbox__input"
                        />
                        <label htmlFor={`task-${index}`} className="checkbox__label"></label>
                    </div>
                    {/* 完了したタスクには取り消し線を表示させる
                    isCompletedがtrueならline-throughをfalseであればnoneをセット */}
                    <span className={`flex-1 px-3 text-lg text-left whitespace-normal overflow-wrap break-word break-all text-gray-800 ${task.isCompleted ? 'line-through' : ''}`}>
                        {task.text}
                    </span> 

                    <button onClick={() => deleteTask(index)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">delete</button>
                </div>
            ))}
            {/* 制御されたコンポーネント? */}
            <div className="flex">
             <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow shadow appearance-none border rounded px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button onClick={addTask} className="ml-2 inline-block align-middle text-center select-none border font-normal whitespace-nowrap px-3 rounded leading-normal no-underline bg-blue-500 text-white hover:bg-blue-700">Add</button>

            </div>
        </div>
    );
}

export default TodoList;