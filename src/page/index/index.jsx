import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.scss';

const IndexPage = () => {
    const [list, setlist] = useState([]);

    const getData = () => {
        axios.get('https://5c92dbfae7b1a00014078e61.mockapi.io/owners')
            .then((res) => {
                let arr = res?.data || [];
                let newarr = JSON.parse(JSON.stringify(arr));
                let flagArr = newarr.map(item=>item.gender)
                newarr = newarr.filter((item,index)=>{
                    return flagArr.indexOf(item.gender) === index
                })
                arr.forEach(element => {
                  newarr.forEach(element2=>{
                      if(element.gender === element2.gender && element?.pets?.length>0){
                        element2.pets = (element2.pets || []).concat(element.pets)
                      }
                  }) 
                });
                newarr.forEach(element => {
                    if (element?.pets?.length > 0) {
                        element.pets.sort((a, b) => {
                            let index1 = a.name.substr(0, 1);
                            let index2 = b.name.substr(0, 1);
                            return index1.localeCompare(index2)
                        })
                        let exampleArr = element.pets.map(item=>item.name)
                        element.pets = element.pets.filter((item2,i)=>{
                            return exampleArr.indexOf(item2.name) === i
                        })
                    }
                });
                console.log(newarr)
                setlist(newarr)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getData()
    }, [])

    return <>
        <div className="exampleList">
            <ul>
                {list.length > 0 ?
                    list.map((item, index) => {
                        return <li className="exampleList-item" key={index}>
                            <div className="exampleList-item-title">{item.gender}</div>
                            <div className="exampleList-item-list">
                                {item?.pets?.map((item2, index2) => {
                                    return item2.type === 'Cat' && <div key={index2} className="exampleList-item-list-item">{item2.name}</div>
                                })}
                            </div>
                        </li>
                    })

                    :
                    '正在加载中'
                }

            </ul>
        </div>
    </>
}

export default IndexPage