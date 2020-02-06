import React from 'react'


export default ()=>{
    return(
               <style>
                   {`
                      {/* pagination styling */}
                      .digit-icons.main {
                        display: flex;
                        list-style: none;
                        align-items: center;
                        justify-content: center;
                        padding-left: 0;
                        margin-bottom: 33px;
                    }
            
                        .digit-icons.main li {
                        padding: 25px;
                    }
            
                    .digit-icons.main li.p-one {
                        padding: 0;
                        width: 40px;
                        height: 40px;
                        border-radius: 22px;
                        background-color: #4379E9;
                        font-size: 14px;
                        font-weight: 400;
                        font-style: normal;
                        font-stretch: normal;
                        line-height: 1.5;
                        letter-spacing: -1px;
                        text-align: center;
                        color: #fff;
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-pack: center;
                        justify-content: center;
                        -ms-flex-align: center;
                        align-items: center;
                    }
            
                    .digit-icons.main li.p-one a {
                        color: #fff;
                        outline: none;
                    }
            
                    .digit-icons li a {
                        color: #4379E9;
                        font-size: 14px;
                        cursor: pointer;
                    }
                    .hovers  {
                        cursor: pointer;
                        box-shadow: 0px 4px 8px 2px #e8e8e8;
                    }

                   `}
               </style>
        );
}