export class TodolistService {
    todolist = ["okka", "dpl"];

    getData() {
        const data = JSON.stringify({
            code: 200,
            status: "OK",
            data: this.todolist.map((val, i) => {
                return {
                    id: i,
                    todo: val
                }
            })
        });

        return data;
    }

    getTodolist(request, response) {
        response.write(this.getData());
        response.end();
    }

    createTodolist(request, response) {
        request.on('data', stream => {
            const { todo } = JSON.parse(stream.toString());
            this.todolist.push(todo);

            response.write(this.getData());
            response.end();
        });
    }

    updateTodolist(request, response) {
        request.on('data', stream => {
            const { id, todo } = JSON.parse(stream.toString());

            if (this.todolist[id]) {
                this.todolist[id] = todo;
            }

            response.write(this.getData());
            response.end();
        });
    }

    deleteTodolist(request, response) {
        request.on('data', stream => {
            const { id } = JSON.parse(stream.toString());

            if (this.todolist[id]) {
                this.todolist.splice(id, 1);
            }

            response.write(this.getData());
            response.end();
        })
    }
}