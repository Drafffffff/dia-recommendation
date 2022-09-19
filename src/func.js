import selectData from "./select.json"
import recommendData from "./recommend.json"

export function shuffle(arr, bool) {
    const isView = ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(arr);
    arr = bool || isView ? arr : arr.slice();
    let rnd,
        tmp,
        idx = arr.length;
    while (idx > 1) {
        rnd = (Math.random() * idx) | 0;
        tmp = arr[--idx];
        arr[idx] = arr[rnd];
        arr[rnd] = tmp;
    }
    return arr;
};


//返回四个分类每个分类各三个作品,共计12个对象
export function getSelectData() {
    const data = shuffle(selectData)
    const a = data.filter(d => d.category === "产业装备").slice(0, 3)
    const b = data.filter(d => d.category === "生活智慧").slice(0, 3)
    const c = data.filter(d => d.category === "数字经济").slice(0, 3)
    const d = data.filter(d => d.category === "文化创新").slice(0, 3)
    return shuffle([...a, ...b, ...c, ...d])
}


//传入用户选择的对象数组
/*
[
{
    name:xxx,
    category:xxx,
    id:xxx
},
{
    name:xxx,
    category:xxx,
    id:xxx
},
{
    name:xxx,
    category:xxx,
    id:xxx
},
]
 */
//返回recommend.json中推荐作品的index
export function getRecommendData(data) {
    const counter = {
        "数字经济": 0,
        "产业装备": 0,
        "文化创新": 0,
        "生活智慧": 0
    }
    data.forEach(i => {
        if (i.category === "数字经济") {
            counter["数字经济"]++
        } else if (i.category === "产业装备") {
            counter["产业装备"]++
        } else if (i.category === "文化创新") {
            counter["文化创新"]++
        } else if (i.category === "生活智慧") {
            counter["生活智慧"]++
        }
    })
    const a = shuffle(recommendData).filter(d => d.category === "产业装备").slice(0, counter['产业装备'] * 2)
    const b = shuffle(recommendData).filter(d => d.category === "生活智慧").slice(0, counter['生活智慧'] * 2)
    const c = shuffle(recommendData).filter(d => d.category === "数字经济").slice(0, counter['数字经济'] * 2)
    const d = shuffle(recommendData).filter(d => d.category === "文化创新").slice(0, counter['文化创新'] * 2)
    const tmp = [...a, ...b, ...c, ...d]
    return  tmp.map(d=>{
        return recommendData.findIndex(i=>{ return i.name === d.name})
    })

}

