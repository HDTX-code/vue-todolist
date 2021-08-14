//初始化数据
var todolist=[],todotime=[],donelist=[],donetime=[];
if (localStorage.todolist) {
    todolist = JSON.parse(localStorage.todolist);
}
if (localStorage.donelist) {
    donelist = JSON.parse(localStorage.donelist);
}
if (localStorage.todotime) {
    todotime = JSON.parse(localStorage.todotime);
}
if (localStorage.donetime) {
    donetime = JSON.parse(localStorage.donetime);
}
//存储到本地
function save(){
    localStorage.todolist = JSON.stringify(todolist);
    localStorage.donelist = JSON.stringify(donelist);
    localStorage.todotime = JSON.stringify(todotime);
    localStorage.donetime = JSON.stringify(donetime);
}
//将输入的时间转化格式
function Timechange(elem){
    elem=elem.replace("-",".");
    elem=elem.replace("-",".");
    elem=elem.replace("T",".");
    return elem;
}
//Vue
var app=new Vue({
    el:"#app",
    data:{
        todolist,
        todotime,
        donelist,
        donetime,
    },
    methods:{
        //添加待办
        todosubmit:function(){
            elemtodo=document.getElementById('Listsubmit').firstChild.nextElementSibling;
            elemtime=document.getElementById('timesubmit').firstChild.nextElementSibling;
            if(elemtodo.value.trim().length!==0&&elemtime.value.trim().length!==0){
                this.todolist.push(elemtodo.value);
                this.todotime.push(Timechange(elemtime.value));
                elemtodo.value='';
                elemtime.value='';
                save();
            }
        },
        //删除待办
        deletetodo:function(elem){
            arr=Array.from(elem.target.parentElement.parentElement.children);
            var index=arr.indexOf(elem.target.parentElement);
            this.todolist.splice(index,1);
            this.todotime.splice(index,1);
            save();
        },
        //删除已完成的任务
        deletedone:function(elem){
            arr=Array.from(elem.target.parentElement.parentElement.children);
            var index=arr.indexOf(elem.target.parentElement);
            this.donelist.splice(index,1);
            this.donetime.splice(index,1);
            save();
        },
        //将待办转入已完成
        todochangedone:function(elem){
            arr=Array.from(elem.target.parentElement.parentElement.children);
            var index=arr.indexOf(elem.target.parentElement);
            var a=this.todolist.splice(index,1);
            var b=this.todotime.splice(index,1);
            this.donelist.push(a[0]);
            this.donetime.push(b[0]);
            save();
        },
        //将已完成转入待办
        donechangetodo:function(elem){
            arr=Array.from(elem.target.parentElement.parentElement.children);
            var index=arr.indexOf(elem.target.parentElement);
            var a=this.donelist.splice(index,1);
            var b=this.donetime.splice(index,1);
            this.todolist.push(a[0]);
            this.todotime.push(b[0]);
            save();
        },
        //一键删除所有
        clearall:function(){
            this.donelist=[];
            this.donetime=[];
            this.todolist=[];
            this.todotime=[];
            save();
        },     
    },
})




