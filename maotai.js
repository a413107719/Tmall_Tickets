//定时器
var timer = null;

//检测状态
function checkElementState(path, callback) {
    var ele = document.querySelector(path);
    if (ele) {
        callback && callback();
    } else {
        console.log('{0}异步加载元素中....'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")) + path);
        setTimeout(function () {
            checkElementState(path, callback);
        }, 10);
    }
}

function check_order_ElementState(path1,path2,path3,callback) {
    var ele1 = document.querySelector(path1);
    var ele2 = $x(path2)[0];
    var ele3 = $x(path3)[0];
    if (ele1) {
        console.log('{0}订单提交按钮出现，准备提交订单....'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")) + path1 + "**" + path2 + "**" + path3);
        callback && callback();
    } else if (ele2) {
        console.log('{0}商品不能购买，返回购物车中....'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms"))  + path1 + "**" + path2 + "**" + path3);
        window.location.href = "https://cart.tmall.com/";
    } else if (ele3) {
        console.log('{0}商品已售罄，停止中....'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms"))  + path1 + "**" + path2 + "**" + path3);
    }else {
        console.log('{0}异步加载元素中....'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")) + path1 + "**" + path2 + "**" + path3);
        setTimeout(function () {
            check_order_ElementState(path1,path2,path3, callback);
        }, 10);
    }
}



//点击购买按钮
function clickBuy() {

    console.log('买！');

    //票的数量  如果还不可以购买，这个地方获取会失败 
    var amount = document.getElementsByClassName('mui-amount-increase')[0];
    amount && amount.click(); //+1

    var btnBuy = document.querySelector('');

}


//结算
function checkOut(...args) {
    var clickAction = args[0]
    console.log('{0}结算开始....'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")));
    var btn = document.getElementById('J_Go');

    if (btn) {
        if (btn.getAttribute("class") == "submit-btn") {
            btn.click();
        } else {
            console.log('{0}请选择结算商品,自动勾选茅台中！'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")))
            try {
                // var checkValue_box = $x("//a[@title='飞天53度500ml贵州茅台酒（带杯）酱香型白酒单瓶装(不含礼袋)']")[0].parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelector("label").previousElementSibling
                // var checkValue_box = $x("//a[@title='整箱10棒东北黄糯玉米新鲜现摘粘黏甜真空袋装非转基因即食减肥餐']")[0].parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelector("label").previousElementSibling
                var checkValue_box = $x("//a[@title='飞天53度500ml贵州茅台酒（带杯）酱香型白酒单瓶装(不含礼袋)']")[0].parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelector("label").previousElementSibling
                var checkValue = checkValue_box.getAttribute("checked")
                var checkbox = $x("//a[@title='飞天53度500ml贵州茅台酒（带杯）酱香型白酒单瓶装(不含礼袋)']")[0].parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelector("label")
                checkValue == null && !clickAction ? checkbox.click() : undefined
                console.log(checkbox, checkValue)
                setTimeout(() => {
                    checkOut(true)
                }, 10);
            } catch (err) {
                console.log(err)
                console.log(err.message);
                console.log("{1}重新运行处理过程：{0}!".format("checkOut", formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")))
                setTimeout(() => {
                    checkOut()
                }, 10)
            }
        }
    } else {
        console.log('{0}结算按钮没找到'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")));
        console.log("{1}重新运行处理过程：{0}!".format("checkOut", formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")))
        setTimeout(() => {
            checkOut()
        }, 10)
    }

}

function checkOutAsync() {
    checkElementState('#J_Go', checkOut);
}

//提交订单
function submitOrder() {

    console.log('{0}提交订单开始....'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")));
    // console.log('{0}提交订单按钮没找到，返回上页！'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")));
    // window.location.href = "https://cart.tmall.com/";
    check_order_ElementState('.go-btn', "//p[text()='商品不能购买']","//p[text()='抱歉，该商品在您当前收货地址内已无库存！']",function () {
        var btn = document.querySelector(".go-btn");
        if (btn) {
            btn.click();
        } else {
            console.log('{0}提交订单按钮没找到，返回上页！'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")));
            window.location.href = "https://cart.tmall.com/";

        }
    });
}

String.prototype.format = function (...args) {
    if (args.length == 1 && typeof args[0] == 'object') {
        let k = '',
            v = ''
        return this.replace(/{[A-Za-z]+}/g, (it, i) => {
            k = it.slice(1, -1)
            v = args[0][k]
            return typeof v != 'undefined' ? v : '';
        })
    }
    return this.replace(/{(\d+)}/g, (it, i) => {
        return typeof args[i] != 'undefined' ? args[i] : '';
    });
};

function $x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}

// function $x(xpath, context) {
//     var doc = (context && context.ownerDocument) || inspectedWindow.document;
//     var result = doc.evaluate(xpath, context || doc, null, XPathResult.ANY_TYPE, null);
//     switch (result.resultType) {
//         case XPathResult.NUMBER_TYPE:
//             return result.numberValue;
//         case XPathResult.STRING_TYPE:
//             return result.stringValue;
//         case XPathResult.BOOLEAN_TYPE:
//             return result.booleanValue;
//         default:
//             var nodes = [];
//             var node;
//             while (node = result.iterateNext())
//                 nodes.push(node);
//             return nodes;
//     }
// }

var Ajax = {
    get: function (url, fn) {
        return new Promise((resolve, reject) => {
            // XMLHttpRequest对象用于在后台与服务器交换数据
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                // readyState == 4说明请求已完成
                if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                    // 从服务器获得数据
                    fn.call(this, xhr.responseText);
                    resolve(xhr.responseText)
                }
            };
            xhr.send();
        })
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            // 添加http头，发送信息至服务器时内容编码类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                    fn.call(this, xhr.responseText);
                }
            };
            xhr.send(data);
        })
    }
}

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while (new Date().getTime() < startTime) {}
};

async function getTaobaotime() {
    // var apiResult = Ajax.get("https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",(rst)=>{console.log(JSON.parse(rst))})
    // var apiResult = Ajax.get("https://api.m.tmall.com/rest/api3.do?api=mtop.common.getTimestamp",(rst)=>{console.log(JSON.parse(rst))})
    var current_taobao_time = 0
    dDate = new Date();
    console.log("{0}**开始**从tmall服务器获取tmall_time！".format(formatTime(dDate, "yyyy-MM-dd HH:mm:ss.ms")))
    await Ajax.get("http://127.0.0.1:8888/tmall_time?tmall_time=1", (rst) => {
        var apiResult = JSON.parse(rst)
        console.log(rst)
        if (apiResult.ret[0].indexOf("SUCCESS") > -1) {
            current_taobao_time = apiResult.data.t
        }
    }).then(() => {
        console.log("{0}**成功获取**tmall_time，当前天猫时间{1},时间差异{2}秒！".format(formatTime(dDate, "yyyy-MM-dd HH:mm:ss.ms"), formatTime(new Date(parseInt(current_taobao_time)), "yyyy-MM-dd HH:mm:ss.ms"), (current_taobao_time - dDate) / 1000))
    })

    return current_taobao_time
}

function formatTime(time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss|ms/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
            case 'ms':
                return tf(t.getMilliseconds())/1000;
                break;
        }
    })
}

//进入时间判断循环
function enterTimeCheckLoop(callback) {

    var date = new Date();

    var diff = dDate - date; //计算当前时间差
    console.log("{2}{1}=>秒杀开始时间为：{0}".format(formatTime(dDate, "yyyy-MM-dd HH:mm:ss.ms"), "enterTimeCheckLoop", formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")))
    console.log("{1}当前距离秒杀开始{0}秒!".format(diff / 1000), formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms"));
    // console.log("我是{0}，今年{1}了. {2}".format("zhgl", 42, 0))
    // console.log("我是{name}，今年{age}了.".format({ name: "zhgl", age: 42 }))
    if (diff < -5000) {

        console.log('{0}时间过了！'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")));

    } else if (diff < 500) {

        callback && callback();

        console.log('{0}秒杀时间到了！！！'.format(formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")));

    } else {
        console.log("{1}秒杀时间未到，重新进入{0}过程!".format("enterTimeCheckLoop", formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")))

        setTimeout(function () {
            enterTimeCheckLoop(callback);
        }, 50);
        //console.log('--');
    }



}


//主要函数
function main() {
    console.log('############################开始抢购茅台############################');

    //debugger;

    var href = window.location.href;
    var title = document.title;

    if (title.indexOf('拦截') == -1) {

        if (href.indexOf('cart.tmall.com') > -1) {
            //结算页面

            //进入时间判断
            enterTimeCheckLoop(checkOutAsync);


        } else if (href.indexOf('buy.tmall.com') > -1) {
            //提交订单页面
            setTimeout(() => {
                submitOrder();
            }, 10);
        }
    }

}

//目标时间
var dDate = new Date(); //10点和20点开抢
getTaobaotime().then((timestring) => {
    var dateDiff = 0
    var taobaoDate = new Date(parseInt(timestring))
    dateDiff = taobaoDate - dDate
    console.log("{2}当前淘宝时间为：{0},与本地时间差异为{1}秒.".format(formatTime(taobaoDate, "yyyy-MM-dd HH:mm:ss.ms"), dateDiff / 1000, formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")))
    // dDate = dDate + dateDiff
    if (dDate.getHours() < 10) {
        dDate = dDate.setHours(9, 59, 59.9) - dateDiff;
    } else if (dDate.getHours() < 19) {
        dDate = dDate.setHours(18, 59, 59.9) - dateDiff;
    } else {
        dDate = dDate.setHours(19, 59, 59.9) - dateDiff;
    }
    console.log("{1}秒杀开始时间设定为：{0}".format(formatTime(dDate, "yyyy-MM-dd HH:mm:ss.ms"), formatTime(new Date(), "yyyy-MM-dd HH:mm:ss.ms")))
    main()
})

//dDate.setSeconds( dDate.getSeconds() + 10 );
// main();