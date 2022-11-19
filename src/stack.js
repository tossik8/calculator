class Stack{
    constructor(){
        this.values = [];
        this.top = -1;
    }
    isEmpty(){
        return this.top===-1;
    }
    push(value){
        this.values[++this.top] = value;
    }
    pop(){
        if(this.isEmpty()) return -1;
        --this.top;
    }
    peek(){
        return this.isEmpty() ? -1:this.values[this.top];
    }
}

export default Stack;
