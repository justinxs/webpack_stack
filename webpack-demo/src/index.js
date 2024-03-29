import _ from 'lodash';
import './style/index.scss';
import Icon from './images/icon.png';
import printMe from './print.js'
import http from './js/http'

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    // lodash 在当前 script 中使用 import 引入
    element.innerHTML = _.join(['Hello', 'webpack'])
    // element.innerHTML = 'hello webpack'
    element.classList.add('hello');
    // 将图像添加到我们已经存在的 div 中。
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = () => {
        printMe()
        import(/* webpackPrefetch: true */ './prefetchModule.js').then(({now}) => {
            now()
        })
        http.get('/api/activity/getGameRankingList', {page: 1, limit: 100}).then(data => {
            console.log(data)
        })
    }
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component())
