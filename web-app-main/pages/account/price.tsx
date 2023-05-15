import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { ProjectResponse } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"

type Props = {};

const Price = (props: Props) => {

    // reviewed project list
    // project price of each
    // ratings recieved
    // project image
    const router = useRouter();


    const [opt, setOpt] = useAtom(atom.project.api.rev_proj_opt);
    const [search, setSearch] = useState("")
    const [projects, setproj] = useAtom(atom.project.api.reviewed_projects);
    const [searchBtn, setSearchBtn] = useState(false)
    const [desOpenView, setdesOpenView] = useState(false)

    //const setkey = common.ChangeState(setOpt);
    //api.project.review_projects({ params: opt });

    useEffect(() => {
        if (!searchBtn)
            api.project.review_projects({ params: opt });
    }, [searchBtn])






    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.review_projects({ params: { ...opt, page: i } });
            });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }


    const handleSearch = (e) => {

        //const searchKey = (document.getElementById("exampleFormControlInput5") as HTMLInputElement).value


        opt.search = search


        setSearchBtn(true)
        //console.log("search key", search);
        console.log("opt search key", opt);

        api.project.review_projects({ params: opt })

    }

    const readDesc = () => {
        if (!desOpenView)
            setdesOpenView(true)
        else {
            setdesOpenView(false)
        }

    }


    const [expandedRows, setExpandedRows] = useState([]);
	const toggleRowExpansion = (rowIndex) => {

		if (expandedRows.includes(rowIndex)) {
			setExpandedRows(expandedRows.filter((i) => i !== rowIndex));
		} else {
			setExpandedRows([...expandedRows, rowIndex]);
		}
	};

    //console.log("dtaa recieved----------------------?>>>>>>>>>>>>>>>>>>>", projects);




    return (

        <>
            <div className="container cjw">
                <div className="col-sm-12">
                    <div className="search-key">
                        <h3>How much should you pay for your custom machined parts?</h3>
                        <p>Machining-4U provides you with the lowest prices available for your custom CNC machining needs. By connecting directly with independent machinists, you can avoid the huge markups charged by large CNC manufacturing companies.</p>
                        <p>Whether you're looking for CNC routing, CNC milling, or any other CNC machining services, you will be able to find what you need at an affordable price.</p>
                        <p>To give you a better idea of what you should expect to pay for your precision machining job, search for the latest custom machined part prices below.</p>
                        <p>There are no hidden costs or unwanted surprises. The price you see is the price you pay.</p>
                        <ul>
                            <li>Shipping fees are included in the price.</li>
                            <li>Jobs posted in "private" mode are not displayed here.</li>
                        </ul>
                        <p>Enter the type of part you are looking for. For example : <a href="#">spacer,</a> <a href="#">ring,</a> <a href="#">plate,</a> <a href="#">axis,</a> <a href="#">cylinder</a> ...</p>
                    </div>
                    <form className="frmSearch" method="post" action="#">
                        <div className="row col-md-6 offset-md-3">
                            <div className="form-group col-md-9">
                                <input id="exampleFormControlInput5" onChange={handleSearchChange} type="text" placeholder="What're you searching for?" className="form-control form-control-underlined" />
                            </div>
                            <div className="form-group col-md-3">
                                <button onClick={handleSearch} type="button" className="btn btn-primary rounded-pill btn-block shadow-sm">Search</button>
                            </div>
                        </div>
                    </form>

                    {projects.length
                        ? projects.map((l, index) => {
                            return (
                                <div className="machin_price_li">
                                    <div className="machin_price_li_img">
                                        {l?.attachment_name?.includes(",") ? (

                                                                <img
                                                                    src={common.get_attachment(
                                                                        (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')),l?.createdAt
                                                                    )}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={common.get_attachment(
                                                                        (l?.attachment_name),l?.createdAt
                                                                    )}
                                                                />
                                                            )}
                                    </div><div className="machin_price_li_text">
                                        <h4><a href="projectdetails.html">{l?.project_name}</a></h4>
                                        <p><span>{l?.visibility} </span> | <span>Posted {l?.created}</span> </p>
                                        {/* {desOpenView == true ? <>
                                            <p>{l?.description}</p></>
                                            :
                                            (
                                                <>
                                                    <p><span>{(l?.description).slice(0, (l?.description).length / 2)}</span><span id="dots">...</span>-</p></>
                                            )
                                        } */}
                                        <div>

                                            {l?.description.length > 50 ? (
                                                <div>

                                                    <>

                                                        {expandedRows.includes(index) ? (

                                                            <></>

                                                        ) : (
                                                            <p>{l?.description.slice(0, 50).concat("...")}  <MdOutlineKeyboardArrowDown style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></p>
                                                        )}

                                                    </>

                                                </div>
                                            ) : (<p>{l?.description}</p>)}
                                            {expandedRows.includes(index) && (

                                                <p>{l?.description} <MdOutlineKeyboardArrowUp style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></p>

                                            )}

                                        </div>
                                        
                                        <div className="username">
                                            <a href="#">{l?.creator.user_name}</a>
                                            <a href="#" data-toggle="tooltip" data-placement="top" title="has already made a purchase!"><span className="alpha-ico">A</span></a>
                                        </div>
                                    </div><div className="machin_price_li_text1">
                                        <p>Purchased for</p>
                                        <div className="project_amount">
                                            <a href="#">{l?.transaction[0].amount_gbp}&nbsp;<span>£</span></a>
                                            <div className="amount_details1">(inc VAT)</div>
                                        </div>
                                    </div><div className="machin_price_li_text2">
                                        <p>Evaluation received {l?.reviews[0].rating}</p>
                                        <div className="ratings-sml">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-half-o"></i>
                                        </div>
                                    </div>

                                </div>
                            );

                        })

                        : ""}


                    <ul className="pagination justify-content-end">
                        <li className='page-item'>
                            <a className='page-link' href='#'>
                                Previous
                            </a>
                        </li>
                        {Array.from({ length: opt.total_pages + 1 }).map(
                            (d, i: any) => {
                                return (
                                    <li
                                        className={`page-item ${parseFloat((router?.query?.page || 0).toString()) -
                                            1 ==
                                            i
                                            ? "active"
                                            : ""
                                            }`}>
                                        <Link href={`${router.pathname}?page=${i}`}>
                                            <a
                                                className='page-link'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageClick(i);
                                                }}>
                                                {i + 1}
                                            </a>
                                        </Link>
                                    </li>
                                );
                            },
                        )}

                        <li className='page-item'>
                            <a className='page-link' href='#'>
                                Next
                            </a>
                        </li>

                    </ul>

                </div>
            </div>


        </>
    )

}
Price.ignorePath = true
export default Price

