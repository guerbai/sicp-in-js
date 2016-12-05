"use strict";

var cons = function (x, y){
    let dispatch = function (m){
        if (m === 0){
            return x;
        }else if (m === 1){
            return y;
        }else {
            console.log("0 or 1.")
            return;
        }
    }
    return dispatch;
};

var car = function (z){
    // console.log(z);
    return z(0);
};

var cdr = function (z){
    // console.log(z);
    return z(1);
};

var list = function (items){
    if (items.length === 1){
        return cons(items[0], null);
    }else if (items.length > 1){
        return cons(items[0], list(items.slice(1)));
    }else {
        return null;
    }
}

var print_list = function (items){
    if (!items){
        console.log("()");
    }else{
        let tstr = "(";
        while (items){
            tstr += car(items)+", ";
            items = cdr(items);
        }
        tstr += ")";
        console.log(tstr);
    }
};

var list_ref = function (items, n){
    if (n === 0){
        return car(items);
    }else {
        return list_ref(cdr(items), n-1);
    }
};

var leng = function (items){
    if (!items){
        return 0;
    }else {
        return leng(cdr(items))+1;
    }
};

var append = function (list1, list2){
    if (!list1){
        return list2;
    }else {
        return cons(car(list1), append(cdr(list1), list2));
    }
};

var mmap = function (proc, items){
    if (!items){
        return null;
    }else {
        return cons(proc(car(items)), mmap(proc, cdr(items)));
    }
};

var pair = function (x){
    if (x.name !== 'dispatch'){
        return false;
    }
    if (car(x) === null && cdr(x) === null){
        return false;
    }
    var result = car(x).name === 'dispatch' || cdr(x) !== null;
    // console.log(result);
    return result;
};

// 获得一个良好的打印形式很难。
var print_tree = function (tree){
    if (!tree){
        let res = "()";
        console.log("()");
        return res;
    }else{
        let tstr = "(";
        while (tree){
            if (car(tree).name === 'dispatch'){
                tstr += print_tree(car(tree))+",";
            }else {
                tstr += car(tree)+", ";
            }
                tree = cdr(tree);
        }
        tstr += ")";
        let res = tstr;
        console.log(tstr);
        return res;
    }
}

// var te = list([5, 6])
// console.log(pair(te))
module.exports = [cons, car, cdr, list, print_list, mmap, list_ref, leng, append, pair, print_tree]