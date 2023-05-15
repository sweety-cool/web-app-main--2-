import Link from "next/link";
import { useEffect } from "react";
import atom from "../../src/jotai/atom";
import { useAtomValue } from "jotai";
import api from "../../src/api/services/api"
import { useRouter } from "next/router";
import { useAtom } from "jotai";
const allreviews = () => {
    const router = useRouter()
    const list = useAtomValue(atom.project.api.allreviews)
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);
    useEffect(() => {
        api.project.allreviews({ params: opt });
    }, []);

    console.log("All reviews are: -", list)


    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.allreviews({ params: { ...opt, page: i } });
            });
    };
    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>ALL REVIEWS</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container cjw'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className='looking_m'>
                            <h3>Looking for a Machinist?</h3>
                            <p>Post your request and receive quotes for free.</p>
                            <Link href='/job/post'>
                                <a>Post your request</a>
                            </Link>
                            <h3>Are you a Machinist?</h3>
                            <p>Create a profile and start working.</p>
                            <Link href='/account/profile'>
                                <a>Create Your Profile</a>
                            </Link>
                        </div>
                    </div>

                    <div className='col-sm-8'>


                        <div className='profile_box'>
                            <h3 className='pb-0'>Evaluations received by machinists <span className='darkblue-text '>({list.length + " ratings"})</span>{""}</h3>
                            <hr className='dashed-hr' />




                            <div className='machin_req'>
                                <>
                                    {list?.length ? list.map((l) => {
                                        return (
                                            <div className='row'>
                                                {/* <div className='latest_r'> */}
                                                <div className="container">

                                                    <div className="heading1">
                                                        <h3><a href={`http://18.169.104.118/project/${l?.projects?.project_name}/${l?.projects?.id}`}>{l?.projects?.project_name}</a></h3>
                                                        <p>{l?.projects?.visibility} | Machined by - {l?.machanic?.name} {l?.machanic?.surname}</p>
                                                    </div>

                                                    <div className="heading2">
                                                        <div className="heading2sub">

                                                            <div className='rf85f'>
                                                                <p>
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <span>{l?.rating}</span>
                                                                </p>
                                                            </div>

                                                            <div className="rating-color">
                                                                <p>
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <span> Quality : {l?.provider_rate1}</span>
                                                                </p>

                                                                <p>
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <span> Time : {l?.provider_rate2}</span>
                                                                </p>

                                                                <p>
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <span> Communication : {l?.provider_rate3}</span>
                                                                </p>

                                                                <p>
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <i className='fa fa-star-half-o' />
                                                                    <span> Professionalism : {l?.provider_rate4}</span>
                                                                </p>
                                                            </div>


                                                        </div>

                                                        <div className="heading2sub2">

                                                            <div>

                                                                <h5>{new Date(l?.review_post_date).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })} | Machined by {l?.machanic?.name} {l?.machanic?.surname} | <a href={`http://18.169.104.118/project/${l?.projects?.project_name}/${l?.projects?.id}`}>Project Details</a></h5>
                                                                <h3> <b>Comment Evaluation:</b></h3>

                                                                <h4>"
                                                                    {l?.comments}"
                                                                </h4>
                                                                <p>- {l?.machanic?.name} {l?.machanic?.surname}</p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <br />

                                                </div>
                                                {/* </div> */}
                                                <hr className='dashed-hr' />
                                            </div>
                                        )
                                    }).reverse().slice(0, 10) : (<></>)}
                                </>
                            </div>




                        </div>
                    </div>
                </div>
            </div>

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

        </>
    )
}

allreviews.ignorePath = true

export default allreviews;