import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BidsMsgResponse, MsgReponse, ProjectDetails } from "../../@types/type";
import api from "../../api/services/api";
import common from "../../helpers/common";
import { ProgressBar } from "react-bootstrap";

import atom from "../../jotai/atom";
import { useAtomValue } from "jotai";
type Props = {
	bid: ProjectDetails["bids"][0];
	data: ProjectDetails;
	user: any;
	select_machinist: any;
	send_msg: any;
};

const Offer = ({ bid, data, user, send_msg, select_machinist }: Props) => {
	const router = useRouter();

	const [show, setShow] = useState(false);
	const [file, setFile] = useState(null);
	const [changePic, setChangePic] = useState(false);
	const [showMsgs, setShowMsgs] = useState(false);
	const [msg, msgState] = useState({
		project_id: bid?.project_id,
		msg_box: "",
		send_to: user?.role_id == 2 ? data.creator_id : bid.user_id,
	});
	const setMsg = common.ChangeState(msgState);

	const [msgs, setMsgs] = useState([]);

	const [albidmsg, setalbidmsg] = useState([]);
	const [allistmsg, setallistmsg] = useState([]);

	const [progress, setprogress] = useState(0);

	const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.currentTarget;
		if (files.length) {
			setFile(files[0]);
			setChangePic(true);
			setpr(0)
		} else if (!files.length) {
			setpr(110)
			setChangePic(false)
		}
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!file && changePic) return toast.error("Please select an Image");

		let form = new FormData();
		if (file && changePic) {
			form.append("file", file);
		}

		for (const key of Object.keys(msg)) {
			form.append(key, msg[key]);
		}
		console.log(msg);

		api.project.send_bid_msg(
			{
				body: msg,
				file: form,
				params: changePic ? { change_pic: changePic } : {},
			},
			(d) => {
				setShow(false);
				setMsg("msg_box", "")(null);
				setMsgs((p) => {
					return [...p, d?.data];
				});
				setalbidmsg((p) => {
					return [...p, d.data]
				})
				setFile(null);
			},
		);
	};


	useEffect(() => {
		console.log(msgs);
	}, [msgs]);

	const handle_list_msgs = () => {
		if (showMsgs) {
			setShowMsgs(true);
			return;
		}
		api.project.list_bid_msgs(
			{
				params: {
					project_id: bid?.project_id,
					from_id: user?.role_id == 2 ? bid?.user_id : data.creator_id,
					to_id: user?.role_id == 2 ? data.creator_id : bid?.user_id,
				},
			},
			(d) => {
				setMsgs(d?.data);
				setShowMsgs(true);
			},
		);
	};
	const handle_hide_msgs = () => {
		setShowMsgs(false);
	};

	const listmsg = () => {
		if (showMsgs) {
			setShowMsgs(true);
			return;
		}
		api.project.list_msgs(
			{
				params: {
					project_id: data.id,
					from_id: user?.role_id == 2 ? data.programmer_id : data.creator_id,
					to_id: user?.role_id == 2 ? data.creator_id : data.programmer_id,
				},
			},
			(d) => {
				setMsgs(d?.data);
				setShowMsgs(true);
			},
		);
	}


	const allistmsgs = () => {
		if (data?.programmer_id != null) {

			api.project.list_msgs(
				{
					params: {
						project_id: data.id,
						from_id: user?.role_id == 2 ? data.programmer_id : data.creator_id,
						to_id: user?.role_id == 2 ? data.creator_id : data.programmer_id,
					},
				},
				(d) => {
					setallistmsg(d.data)
				},
			);
		}

	}

	const allbidmsgs = () => {
		api.project.list_bid_msgs(
			{
				params: {
					project_id: bid?.project_id,
					from_id: user?.role_id == 2 ? bid?.user_id : data.creator_id,
					to_id: user?.role_id == 2 ? data.creator_id : bid?.user_id,
				},
			},
			(d) => {
				setalbidmsg(d.data)
			},
		);
	}

	//console.log("all messages are :- ", almsg)

	useEffect(() => {
		// if (data.programmer_id != null) {
		// 	allistmsgs()
		// } else {
		// 	allbidmsgs()
		// }
		allbidmsgs()
		allistmsgs()

	}, []);

	const storageuser = useAtomValue(atom.storage.user)

	console.log("data", data)

	console.log("bod", bid)


	const [pr, setpr] = useState(110)

	useEffect(() => {
		if (pr < 102) {
			setTimeout(() => setpr(prev => prev += 2), 50)
		}

	}, [pr]);

	console.log("Files are", file)

	function delete_files(e) {
		//setFile(file.filter(function (s) { return s !== e }))
		setFile(null)
	}

	useEffect(() => {
		setFile(file)
	}, [])

	console.log("Bid from offers", bid)


	return (
		<div className='row fdfd3'>
			<div className='col-sm-2'>
				<div className='fdfd'>
					<figure>
						<img src='/img/no-images.png' />
					</figure>
					<h5>{bid?.user?.user_name}</h5>
					<p>
						0 Jobs
						<i className='fa fa-star' />
						<i className='fa fa-star' />
						<i className='fa fa-star' />
						<i className='fa fa-star-half-o' />
						<i className='fa fa-star-half-o' />
						<span>5.0</span>
					</p>
				</div>
			</div>
			<div className='col-sm-7'>
				<div className='fdfd1'>
					<p>{bid?.bid_desc}</p>
					{storageuser.role_id == 2 ? (
						bid?.user_id == data?.programmer_id && allistmsg.length > 2 && storageuser.id == bid?.user_id ? (
							<div className='send-message-col'>
								<div className='sent-message-text'>
									{allistmsg.slice(0, 2).map((m) => {
										return (
											<div className='message-row'>
												<h6 className='name'>
													{m?.send_from == user?.id
														? user?.user_name
														: `${user?.role_id == 1
															? bid?.user?.user_name
															: data?.creator?.user_name
														}`}
												</h6>
												<p className='text'>{bid?.user_id == data?.programmer_id ? m.message : m.msg_box}</p>
												{m?.attach_file ? (
													<a
														href={common.get_image(m?.attach_file)}
														className='link-text'
														target={"_blank"}>
														View File
													</a>
												) : (
													<></>
												)}
											</div>
										);
									})}
								</div>
							</div>
						) : bid?.user_id != data?.programmer_id && albidmsg.length > 2 && storageuser.id == bid?.user_id ? (
							<div className='send-message-col'>
								<div className='sent-message-text'>
									{albidmsg.slice(albidmsg.length - 2, albidmsg.length).reverse().map((m) => {
										return (
											<div className='message-row'>
												<h6 className='name'>
													{m?.send_from == user?.id
														? user?.user_name
														: `${user?.role_id == 1
															? bid?.user?.user_name
															: data?.creator?.user_name
														}`}
												</h6>
												<p className='text'>{bid?.user_id == data?.programmer_id ? m.message : m.msg_box}</p>
												{m?.attachment ? (
													<a
														href={common.get_image(m?.attachment)}
														className='link-text'
														target={"_blank"}>
														View File
													</a>
												) : (
													<></>
												)}
											</div>
										);
									})}
								</div>
							</div>
						) : (<></>)
					) : (
						bid?.user_id == data?.programmer_id && allistmsg.length > 2 && storageuser?.id == data?.creator_id  ? (
						<div className='send-message-col'>
							<div className='sent-message-text'>
								{allistmsg.slice(0, 2).map((m) => {
									return (
										<div className='message-row'>
											<h6 className='name'>
												{m?.send_from == user?.id
													? user?.user_name
													: `${user?.role_id == 1
														? bid?.user?.user_name
														: data?.creator?.user_name
													}`}
											</h6>
											<p className='text'>{bid?.user_id == data?.programmer_id ? m.message : m.msg_box}</p>
											{m?.attach_file ? (
												<a
													href={common.get_image(m?.attach_file)}
													className='link-text'
													target={"_blank"}>
													View File
												</a>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						</div>
					) : bid?.user_id != data?.programmer_id  && albidmsg.length > 2 && storageuser?.id == data?.creator_id ? (
						<div className='send-message-col'>
							<div className='sent-message-text'>
								{albidmsg.slice(albidmsg.length - 2, albidmsg.length).reverse().map((m) => {
									return (
										<div className='message-row'>
											<h6 className='name'>
												{m?.send_from == user?.id
													? user?.user_name
													: `${user?.role_id == 1
														? bid?.user?.user_name
														: data?.creator?.user_name
													}`}
											</h6>
											<p className='text'>{bid?.user_id == data?.programmer_id ? m.message : m.msg_box}</p>
											{m?.attachment ? (
												<a
													href={common.get_image(m?.attachment)}
													className='link-text'
													target={"_blank"}>
													View File
												</a>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						</div>
					) : (<></>))}


					{msgs?.length && showMsgs && bid?.user_id == data?.programmer_id ? (
						<div className='send-message-col'>
							<div className='sent-message-text'>
								{msgs.map((m: MsgReponse) => {
									return (
										<div className='message-row'>
											<h6 className='name'>
												{m?.from_id == user?.id
													? user?.user_name
													: `${user?.role_id == 1
														? bid?.user?.user_name
														: data?.creator?.user_name
													}`}
											</h6>
											<p className='text'>{m.message}</p>
											{m?.attach_file ? (
												<a
													href={common.get_image(m?.attach_file)}
													className='link-text'
													target={"_blank"}>
													View File
												</a>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						</div>
					) : !msgs?.length && showMsgs ? (
						<div className='send-message-col'>
							<div className='sent-message-text'>
								<div className='message-row'>
									<p className='text'>{"No Messages yet!"}</p>
								</div>
							</div>
						</div>
					) : msgs?.length && showMsgs && bid?.user_id != data?.programmer_id ? (
						<div className='send-message-col'>
							<div className='sent-message-text'>
								{msgs.slice(0, msgs.length).reverse().map((m: BidsMsgResponse) => {
									return (
										<div className='message-row'>
											<h6 className='name'>
												{m?.send_from == user?.id
													? user?.user_name
													: `${user?.role_id == 1
														? bid?.user?.user_name
														: data?.creator?.user_name
													}`}
											</h6>
											<p className='text'>{m.msg_box}</p>
											{m?.attachment ? (
												<a
													href={common.get_image(m?.attachment)}
													className='link-text'
													target={"_blank"}>
													View File
												</a>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						</div>
					) : (
						<></>
					)}

					{bid?.user_id == data?.programmer_id && allistmsg.length > 2 ? (
						showMsgs ? (
							<a onClick={handle_hide_msgs} className='d-block view-msg-btn'>
								Hide All Message
							</a>
						) : (

							user?.role_id == 2 && storageuser?.id == bid?.user_id ? (
								<a onClick={bid?.user_id == data?.programmer_id ? listmsg : handle_list_msgs} className='d-block view-msg-btn'>
									View All Message
								</a>
							) : user?.role_id == 1 && storageuser?.id == data?.creator_id ? (
								<a onClick={bid?.user_id == data?.programmer_id ? listmsg : handle_list_msgs} className='d-block view-msg-btn'>
									View All Message
								</a>
							) : (<></>)

						)
					) : bid?.user_id != data?.programmer_id && albidmsg.length > 2 ? (
						showMsgs ? (
							<a onClick={handle_hide_msgs} className='d-block view-msg-btn'>
								Hide All Message
							</a>
						) : (
							user?.role_id == 2 && storageuser?.id == bid?.user_id ? (
								<a onClick={bid?.user_id == data?.programmer_id ? listmsg : handle_list_msgs} className='d-block view-msg-btn'>
									View All Message
								</a>
							) : user?.role_id == 1 && storageuser?.id == data?.creator_id ? (
								<a onClick={bid?.user_id == data?.programmer_id ? listmsg : handle_list_msgs} className='d-block view-msg-btn'>
									View All Message
								</a>
							) : (<></>)
						)
					) : (<></>)}



					{/* {showMsgs ? (

						<a onClick={handle_hide_msgs} className='d-block view-msg-btn'>
							Hide All Message
						</a>
					) : (
						<a onClick={data.programmer_id != null ? listmsg : handle_list_msgs} className='d-block view-msg-btn'>
							View All Message
						</a>
					)} */}
					{user?.id == data?.creator_id || user?.id == bid?.user_id ? (
						<>
							<button
								onClick={() => {
									if (
										data?.programmer_id &&
										data?.programmer_id == bid?.user_id
									) {
										router.push(
											`/project/msg/${data?.id}/${user?.id}/${bid?.user_id}`,
										);
										return;
									}
									setShow(!show);
									setprogress(0)
									setChangePic(false)
								}}>
								Send a message to the{" "}
								{user?.role_id == 2 ? "client" : "machinist"}
							</button>
						</>
					) : (
						<></>
					)}

					{show && (
						<div className='send-message-col'>
							<textarea
								className='form-control'
								placeholder='Type your message here'
								value={msg.msg_box}
								onChange={setMsg("msg_box")}
							/>
							<br />
							<input type={"file"} onChange={handle_file_change} />
							<br />
							<br />
							{pr < 101 ? (
								<ProgressBar now={pr} label={`${pr}%`} />
							) : (<></>)}
							{file && pr > 100 ? (

								<div className="pro_div">
									<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{file?.name}<a className="delete_icon" onClick={() => delete_files(file)}><i className="fa fa-trash-o"></i></a></p>
								</div>
							) : (<></>)}
							<br />
							<button className='mt-3' onClick={handleSubmit}>
								Send
							</button>
						</div>
					)}

					{bid?.bid_file && (
						<h6>
							<b>Attachment:</b>
							<a href={common.get_image(bid?.bid_file)} target={"_blank"}>
								{bid?.bid_file}
							</a>
						</h6>
					)}
				</div>
			</div>
			<div className='col-sm-3'>
				<div className='fdfd2'>
					{bid?.user_id == data?.programmer_id ? (
						<h3>
							<img src='/img/selected.png' alt='' />
						</h3>
					) : (
						<></>
					)}
					{(user?.role_id == 1 && data?.creator_id == user?.id) ||
						bid?.user_id == user?.id ? (
						<>
							<h3>{bid?.bid_amount_gbp ? `£${bid?.bid_amount_gbp}` : ""}</h3>
							<h4>Shipping Free Included</h4>
							<h4>Shipping Time: {bid?.bid_days} days</h4>
						</>
					) : (
						<></>
					)}
					<p>30-June, 2022 07:26:11</p>
					{user?.role_id == 1 &&
						data?.creator_id == user?.id &&
						!data?.programmer_id ? (
						<>
							<a href='#' onClick={select_machinist(bid)}>
								Select
							</a>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div >
	);
};

export default Offer;
