import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ProjectDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import Routes from "../../src/Routes";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { useRouter } from "next/router";
import { writeAtom } from "jotai-nexus";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import common from "../../src/helpers/common";
import toast from "react-hot-toast";
import Router from "next/router";

type Props = {};


	
const jobs = (props: Props) => {
	const router = useRouter();

	const list = useAtomValue(atom.project.api.my);
	const opt = useAtomValue(atom.project.api.my_proj_opt);
	const [index, setIndex] = useAtom(atom.storage.job_tab);
        let loginmodal = useAtomValue(atom.storage.loginmodal);

	const user = useAtomValue(atom.storage.user);

	const RefLink=(l)=>{
		//const router = useRouter();
		localStorage.setItem('items', (l));
		router.replace(l)
	}
	useEffect(() => {
		api.project.my_jobs({ params: { ...opt,page:0, status: index } });
	}, [index]);

	

	const [dropdown,setOptions] = useState(0);

	const handleOptions = () => {

		var ele = (document.getElementById("project_status")) as HTMLSelectElement;

		var sel = ele.selectedIndex;
		var option_p = ele.options[sel];
		var value = Number(option_p.value);
		console.log("status value->", value);
		setOptions(value)
		if(value==0){
			setIndex(1);
		}
		else if(value==1){
			setIndex(5);
		}
		else if(value==2){
			setIndex(6);
		}
		
		
		api.project.my_jobs({ params: { ...opt,page:0, status: index } });
	}
const [show, setShow] = useState(true);

	const handleClose = () => {
		if (checkbox == true) {
			setShow(false);
			writeAtom(atom.storage.loginmodal, false)
			let b = {
				id: user?.id,
				showmodal: 1
			}
			api.auth.update_modal({ body: b })
		} else if (checkbox == false) {
			setShow(false);
			writeAtom(atom.storage.loginmodal, false)
		}
	}

const [signIn, signstate] = useState({
		company_name: "",
		SIREN: "",
		pro_user: 1,
		id: user?.id
	});

	const setSign = common.ChangeState(signstate);

	const handlesubmit = () => {
		setShow(false);
		writeAtom(atom.storage.loginmodal, false)
		Router.push("/account/procust")
	}
	const [checkbox, setchexbox] = useState(false);


	const check = (event) => {
		if (event.target.checked) {
			setchexbox(true)
		} else if (!event.target.checked) {
			setchexbox(false)
		}
	}
	

	const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.my_jobs({ params: { ...opt, page: i, status: index } });
            });
   	 };

	console.log("pages-->", opt);
	return (
		<div>
			<div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>My Projects</h1>
						</div>
					</div>
				</div>
			</div>
			<div className='container cjw'>
				<div className='row'>
					<AccountSideBar />

					<div className='col-sm-8'>
						<div className='profile_box'>
							<h3>
								My Projects
								{list?.length ? <span>({opt.total_count})</span> : ""}
							</h3>
<Modal show={loginmodal == true && user?.role_id == 1 && show && user?.pro_user == 0 && user.account=="Company" && user?.show_modal == 0 ? true : false} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>Access Usineur PRO</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<p className="tgs">A Pro to Pro relationship with privileged access to the best machinists. Usineur Pro is free and accessible at no additional cost to professional customers.</p>
									<div className="form-check">
										<label className="form-check-label">
											<input type="checkbox" className="form-check-input" value="option" onClick={check} ></input>Don't show me again
										</label>
									</div>
								</Modal.Body>
								<Modal.Footer className="oksign2">
									<Button className="oksign1" variant="secondary" onClick={handleClose}>
										Not now
									</Button>
									<Button className="oksign" variant="primary" onClick={handlesubmit}>
										Ok
									</Button>
								</Modal.Footer>
							</Modal>
							<div className='row help-ico'>
								<div className='col-sm-6'>
									
								</div>
								<div className='col-sm-6'>
									<a href='#' data-toggle='modal' data-target='#myhelp'>
										<strong>
											<i className='fa fa-question-circle' /> Help
										</strong>
									</a>
								</div>
							</div>
							<div className='uys5'>
								<ul className='nav nav-pills' role='tablist'>
									{user?.role_id == 2 ? (
										Routes.jobsTab.map((j) => {
											return (
												<li className='nav-item'>
													<p
														className={`nav-link c-p ${
															j.id == index ? "active" : ""
														}`}
														style={{
															cursor: "pointer",
															color: j.id == index ? "white" : "black",
														}}
														onClick={(e) => {
															if (index == j.id) return;
															e.preventDefault();
															setIndex(j.id);
															console.log("tab id->",j.id);
															api.project.my_jobs({
																params: { ...opt,page:0, status: j.id },
															});
														}}>
														{j.title}
													</p>
												</li>
											);
										})
									) : (
										<></>
									)}
								</ul>
								<div className='help-ico'>
								{user?.role_id == 2 ? (
										<select id='project_status' onChange={handleOptions}>
											<option value={0} selected={true}>
												Other
											</option>
											<option value={1}>
												Awarded but not yet Funded projects
											</option>
											<option value={2}>
												Finalized Orders without a Review
											</option>
										</select>
									) : (
										<></>
									)}
								</div>

								{/* <div className='tab-content'>
									<div id='all' className='tab-pane active'>
										<div className='project_loop'>
											<h4>
												<a href='#'>
													Lorem Ipsum is simply dummy text of the printing
												</a>
											</h4>
											<p>Public | Open</p>
											<p>Posted : 16-Jun,2022</p>
										</div>
									</div>
									<div id='mybid' className='tab-pane fade'>
										<div className='project_loop'>
											<h4>
												<a href='#'>
													Lorem Ipsum is simply dummy text of the printing and
													typesetting industry.
												</a>
											</h4>
											<p>Public | Open</p>
											<p>Posted : 16-Jun,2022</p>
										</div>
									</div>
									<div id='orderprogress' className='tab-pane fade'>
										<div className='project_loop'>
											<h4>
												<a href='#'>
													Lorem Ipsum is simply dummy text of the printing and
													typesetting industry. Lorem Ipsum has been the
													industry's standard
												</a>
											</h4>
											<p>Public | Open</p>
											<p>Posted : 16-Jun,2022</p>
										</div>
									</div>
									<div id='finalizeorder' className='tab-pane fade'>
										<div className='project_loop'>
											<h4>
												<a href='#'>
													Lorem Ipsum is simply dummy text of the printing and
													typesetting industry. Lorem Ipsum has been the
													industry's
												</a>
											</h4>
											<p>Public | Open</p>
											<p>Posted : 16-Jun,2022</p>
										</div>
									</div>
								</div> */}
							</div>

							{list.length
								? list?.map((l: ProjectDetails) => {
										return (
											<div className='project_loop'>
												<h4>
													
														<a href='#' onClick={()=>RefLink(`/project/${l?.project_name?.split(" ").join("-")}/${l?.id}`)}>{l?.project_name}</a>
												</h4>
												<p>{l?.visibility} | Open</p>
												<p>
													Posted :{" "}
													{moment(l?.project_post_date).format("DD-MMM-YYYY")}
												</p>
											</div>
										);
								  })
								: ""}
							<ul className='pagination justify-content-end'>
                                {(opt.page > 0) ? <li className='page-item'>
                                    <a className='page-link' onClick={()=>handlePageClick(opt.page-1)}>
                                        Previous
                                    </a>
                                </li>: ""}
                                {Array.from({ length: opt.total_pages+1}).map(
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
                                    <a className='page-link' onClick={()=>handlePageClick(opt.page+1)}>
                                        Next
                                    </a>
                                </li> : ""}
                            </ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default jobs;
