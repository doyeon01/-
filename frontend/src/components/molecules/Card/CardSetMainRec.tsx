import React from 'react'
import testImg1 from '../../../assets/statics/test1.jpg'
import testImg2 from '../../../assets/statics/test2.jpg'
import testImg3 from '../../../assets/statics/test3.png'
import testImg4 from '../../../assets/statics/test4.jpg'
import testImg5 from '../../../assets/statics/test5.jpg'

interface TestArr{
    title:string;
    adress:string;
    testimg:string;
}

const testArr:TestArr[] = [
    {title:'test',adress:'광주 광산구',testimg:testImg1},
    {title:'test',adress:'광주 광산구',testimg:testImg2},
    {title:'test',adress:'광주 광산구',testimg:testImg3},
    {title:'test',adress:'광주 광산구',testimg:testImg4},
    {title:'test',adress:'광주 광산구',testimg:testImg5}
]

const CardSetMainRec:React.FC = () => {
  return (
    <>
        {testArr.map((i,index)=>{
            <img 
            src={i.testimg} 
            alt="img"
            className='w-[200px] h-[50px]'
             />
            console.log(i);
            
            
        })}
    </>
    )
}

export default CardSetMainRec