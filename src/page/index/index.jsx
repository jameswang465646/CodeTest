import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.scss';

const IndexPage = () => {
    const [list, setlist] = useState([]);

    const getData = () => {
        axios.get('https://5c92dbfae7b1a00014078e61.mockapi.io/owners')
            .then((res) => {
                let arr = res?.data || [];
                arr.forEach(element => {
                    if (element?.pets?.length > 0) {
                        element.pets = element.pets.sort((a, b) => {
                            let index1 = a.name.substr(0, 1);
                            let index2 = b.name.substr(0, 1);
                            return index1.localeCompare(index2)
                        })
                    }
                });
                setlist(arr)
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