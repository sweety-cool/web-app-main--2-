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

const listing = (props: Props) => {
	const router = useRouter();
	const [opt, setOpt] = useAtom(atom.project.api.list_opt);
	const [list, setlist] = useAtom(atom.project.api.list);
	const user = useAtomValue(atom.storage.user);


	const RefLink = (l) => {
		//const router = useRouter();
		localStorage.setItem('items', (l));
		router.replace(l)
	}
	useEffect(() => {
		common.r("hello");
		api.project.list({ params: opt });
	}, []);

	const handlePageClick = (i) => {
		router
			.replace({
				pathname: router.pathname,
				query: {
					page: i + 1,
				},
			})
			.then(() => {
				api.project.list({ params: { ...opt, page: i } });
			});
	};


	const [expandedRows, setExpandedRows] = useState([]);
	const toggleRowExpansion = (rowIndex) => {

		if (expandedRows.includes(rowIndex)) {
			setExpandedRows(expandedRows.filter((i) => i !== rowIndex));
		} else {
			setExpandedRows([...expandedRows, rowIndex]);
		}
	};
		console.log("list projects-->", list);
		console.log("user projects-->", user);
	return (
		<div>
			<div
				className='banner_wp inner_banner'
				style={{ backgroundImage: "url(/img/banner2.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner1_banner_text'>
							<h1 className='yh'>machining request</h1>
							<ul>
								<li>home</li>
								<li>job</li>
								<li>
									<a href='#'>job list</a>
								</li>
							</ul>

						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='avail'>
					<h3>available job for you</h3>
				</div>
			</div>
			<div className='container'>
				<div className='row job_machin_wp'>
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
						<div className='machin_req'>
							<>
								<h3>
									Machining Requests <span>showing results {opt.page * 10 + 1}-{list?.length < 10 ? ((opt.page * 10) + list?.length) : (opt.page + 1) * 10}</span>
								</h3>
								{list.length
									? (list.map((l, index) => {
										return (

											(l?.pro_job == 1) ? ((user?.role_id == 2 && user?.pro_user == 1) || (user?.email == l?.creator.email)) ?
												<>


													<div className='machin_req_li' key={l?.id}>
														{l?.programmer_id ?  (
															<div className='award'>
																<img src='/img/awarded.png' />
															</div>
														) : (
															<></>
														)}
														<div className='machin_req_li_img'>
															{l?.attachment_name?.includes(",") ? (
																								
																(l?.is_private==1 && user?.id!=l?.creator_id) ? (<img
																	src='/img/private.jpg'
																/>):(

																<img
																	src={common.get_attachment(
																		(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')),
																		l?.createdAt,
																	)}
																/>)
															) : (
																(l?.is_private==1 && user?.id!=l?.creator_id) ? (<img
																	src='/img/private.jpg'
																/>):(
																<img
																	src={common.get_attachment(
																		(l?.attachment_name),
																		l?.createdAt,
																	)}
																/>)
															)}
														</div>


														<div className='machin_req_li_text'>
															{(user?.pro_user == 1 || l?.pro_job == 0) ? (<h4>
																<a href='#' onClick={() => RefLink(`/project/${l?.project_name?.split(" ").join("-")}/${l?.id}`)}>{l?.project_name}</a>
															</h4>) : (<h4>{l?.project_name}</h4>)}

															<p>
																<span>
																	Posted{" "}
																	{moment().format("YYYY-MM-DD") ==
																		l?.project_post_date
																		? "today"
																		: moment(l?.project_post_date).fromNow(true)}
																</span>
																<span>
																	End:{" "}
																	{moment(
																		moment
																			.unix(parseInt(l?.post_for))
																			.format("YYYY-MM-DD HH:mm:ss"),
																	).toNow(true)}
																</span>{" "}
																{l?.bids_count ? (
																	<span>{l?.bids_count} Offers</span>
																) : (
																	<></>
																)}
															</p>
															<div>

																{l?.description.length > 250 ? (
																	<div>

																		<>

																			{expandedRows.includes(index) ? (

																				<></>

																			) : (
																				<h5>{l?.description.slice(0, 250).concat("...")}  <MdOutlineKeyboardArrowDown style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></h5>
																			)}

																		</>

																	</div>
																):(<h5>{l?.description}</h5>)}
																{expandedRows.includes(index) && (

																	<h5>{l?.description} <MdOutlineKeyboardArrowUp style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></h5>

																)}

															</div>
															{/* <p>{l?.pro_job} job type</p> */}
															<a href={`/account/public-profile/${l?.creator?.id}`} className="listing_creator_name">{l?.creator?.user_name}</a>


														</div>
														<div>
															{l?.pro_job == 1 ? (<div className="pro_tag"><img src='/img/pro_icon.png' alt='' /></div>) : (<></>)}

														</div>


													</div>

												</> : <></>
												:
												<>

													<div className='machin_req_li' key={l?.id}>
														{l?.programmer_id ?  (
															<div className='award'>
																<img src='/img/awarded.png' />
															</div>
														) : (
															<></>
														)}

														<div className='machin_req_li_img'>
															{l?.attachment_name?.includes(",") ? (
																l?.is_private == "1" && user == null ? (
																	<img
																		src='/img/private.jpg'
																	/>
																) : l?.is_private == "1" && user != null && l?.creator_id == user?.id ? (
																	<img
																		src={common.get_attachment(
																			(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')),
																			l?.createdAt
																		)}
																	/>
																) : l?.is_private == "1" && user != null && l?.creator_id != user?.id ? (
																	<img
																		src='/img/private.jpg'
																	/>
																)
																
																: l?.is_private != "1" && (user != null || user == null) ? (
																	<img
																		src={common.get_attachment(
																			(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')),
																			l?.createdAt
																		)}
																	/>
																) : (<></>)
															) : (
																l?.is_private == "1" && user == null ? (
																	<img
																		src='/img/private.jpg'
																	/>
																) : l?.is_private == "1" && user != null && l?.creator_id == user?.id ? (
																	<img
																		src={common.get_attachment(
																			(l?.attachment_name),
																			l?.createdAt
																		)}
																	/>
																)
																: l?.is_private == "1" && user != null && l?.creator_id != user?.id ? (
																	<img
																		src='/img/private.jpg'
																	/>
																)
																
																: l?.is_private != "1" && (user != null || user == null) ? (
																	<img
																		src={common.get_attachment(
																			(l?.attachment_name),
																			l?.createdAt
																		)}
																	/>
																) : (<></>)
															)
															}
														</div>




														<div className='machin_req_li_text'>
															{(user?.pro_user == 1 || l?.pro_job == 0) ? (<h4>
																<a href='#' onClick={() => RefLink(`/project/${l?.project_name?.split(" ").join("-")}/${l?.id}`)}>{l?.project_name}</a>
															</h4>) : (<h6>{l?.project_name}</h6>)}

															<p>
																<span>
																	Posted{" "}
																	{moment().format("YYYY-MM-DD") ==
																		l?.project_post_date
																		? "today"
																		: moment(l?.project_post_date).fromNow(true)}
																</span>
																<span>
																	End:{" "}
																	{moment(
																		moment
																			.unix(parseInt(l?.post_for))
																			.format("YYYY-MM-DD HH:mm:ss"),
																	).toNow(true)}
																</span>{" "}
																{l?.bids_count ? (
																	<span>{l?.bids_count} Offers</span>
																) : (
																	<></>
																)}
															</p>
															<div>

																	{l?.description.length > 250 ? (
																		<div>

																			<>

																				{expandedRows.includes(index) ? (

																					<></>

																				) : (
																					<h5>{l?.description.slice(0, 250).concat("...")}  <MdOutlineKeyboardArrowDown style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></h5>
																				)}

																			</>

																		</div>
																	):(<h5>{l?.description}</h5>)}
																	{expandedRows.includes(index) && (

																		<h5>{l?.description} <MdOutlineKeyboardArrowUp style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></h5>

																	)}

																</div>
															{/* <p>{l?.pro_job} job type</p> */}
															<a href={`/account/public-profile/${l?.creator?.id}`} className="listing_creator_name">{l?.creator?.user_name}</a>


														</div>
														<div>
															{l?.pro_job == 1 ? (<div className="pro_tag"><img src='/img/pro_icon.png' alt='' /></div>) : (<></>)}

														</div>


													</div>



												</>
										)



									})
									)
									: ""}

								<ul className='pagination'>
									{(opt.page > 0) ? <li className='page-item'>
										<a className='page-link' onClick={() => handlePageClick(opt.page - 1)}>
											Previous
										</a>
									</li> : ""}
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

									{opt.page != opt.total_pages ?
										<li className='page-item'>
											<a className='page-link' onClick={() => handlePageClick(opt.page + 1)}>
												Next
											</a>
										</li> : ""}
								</ul>
							</>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

listing.ignorePath = true;

export default listing;
