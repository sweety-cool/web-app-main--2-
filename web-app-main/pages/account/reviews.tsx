import React, { useEffect } from "react";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import api from "../../src/api/services/api";

type Props = {};

let Reviews_data = []

const reviews = (props: Props) => {


    const UserData = JSON.parse(localStorage.getItem('UserData'));
    console.log("data--", UserData)


    api.project.reviews_list({ params: {} }, (d) => {
        console.log("---->", d)
        Reviews_data = d.data;

    });
    console.log("reviews data", Reviews_data)


    setTimeout(() => {
        let Tbody = document.getElementById('Tbody')
        let ReviewsList = JSON.parse(localStorage.getItem('Reviews_List'));
        console.log("Reviews list--", ReviewsList)

        ReviewsList.map((item) => (
            Tbody.innerHTML = Tbody.innerHTML + `<tr> <td>${item.projects.project_name}</td> <td>${item.machanic.user_name}</td>  <td>${item.rating}</td> </tr>`
        ))

        console.log(Reviews_data)
    }, 1000)



    return (
        <div>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Review Machinist</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container cjw'>
                <div className='row'>
                    <AccountSideBar />

                    <div className='col-sm-8'>
                        <div className='profile_box'>
                            <h3>Reviews</h3>
                            <div className='fund_wp'>
                                <div className='table-responsive'>
                                    <table className='table table-bordered table-sm'>
                                        <thead>
                                            <tr className='table-primary'>
                                                <td>Name of the project</td>
                                                <td>Machinist Name</td>
                                                <td>Ratings</td>
                                            </tr>
                                        </thead>
                                        <tbody id="Tbody">

                                            {

                                                Reviews_data.map((item) => {

                                                    return (
                                                        <tr>
                                                            <td>{item.projects.project_name}</td>
                                                            <td>{item.machanic.user_name}</td>
                                                            <td>{item.rating}</td>
                                                        </tr>
                                                    )
                                                })}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default reviews;
