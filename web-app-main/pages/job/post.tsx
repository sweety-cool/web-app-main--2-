import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import schema from "../../src/validation/schema/schema";
import { Validate } from "../../src/validation/utils/test";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import path from "path";
import { ProgressBar } from "react-bootstrap";

type Props = {};

const post = (props: Props) => {
	const router = useRouter();

	const [project, projectstate] = useState({
		project_name: "",
		description: "",
		visibility: "public",
		post_for: 4,
	});
	const setproject = common.ChangeState(projectstate);

	const [file, setFile] = useState([]);
	const [otherFile, setFileOther] = useState([]);

	const [open, setOpen] = useAtom(atom.modal.confirm_project);
	const [storedProject, setStoredProject] = useAtom(atom.storage.project);
	const user = useAtomValue(atom.storage.user);
	const [progress, setprogress] = useState(0);
	const [progressOth, setprogressOth] = useState(0);
	const [fileAttach, setAttach] = useState(false);
	const [fileAttachOth, setAttachOth] = useState(false);

	const handleSubmit = () => {
		if (!file.length) return toast.error("Please select a file");

		let data = Validate([], schema.project.add, project);

		if (!data) {
			return;
		}
		setOpen(true);
	};

	useEffect(() => {
		if (typeof storedProject == "string") {
			api.project.my_temp({ params: { project_id: storedProject } }, (d) => {
				for (const key of Object.keys(project)) {
					setproject(key, d?.data[key])(null);
				}
			});
		}
	}, []);

	const processSubmit = () => {
		if (!file.length) return toast.error("Please select a file");
		let form = new FormData();
		for (const key of Object.keys(file)) {
			form.append("file", file[key]);
		}


		if (otherFile.length > 0) {
			for (const key of Object.keys(otherFile)) {
				form.append("file", otherFile[key]);
			}
		}

		for (const key of Object.keys(project)) {
			form.append(key, project[key]);
		}



		if (!user) {
			api.project.add_temp(
				{
					body: project,
					file: form,
					params: storedProject ? { temp_id: storedProject } : {},
				},
				(d) => {
					for (const key of Object.keys(project)) {
						setproject(key, "");
					}
					setFile([]);
					setStoredProject(d?.data?.id);
					setOpen(false);
				},
			);
			return;
		}

		api.project.add({ body: project, file: form }, (d) => {
			for (const key of Object.keys(project)) {
				setproject(key, "");
			}
			setFile([]);
			setOpen(false);
		});
	};

	const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.currentTarget;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);
			if (extension !== "jpg" && extension !== "jpeg" && extension !== "png" && extension !== "gif" && extension !== "pdf" && extension !== "bmp" && extension !== "tif" && extension !== "zip" && extension !== "rar" && extension !== "docx" && extension !== "exe" && extension !== "dwg" && extension !== "svg" && extension !== "sldasm" && extension !== "slddrw" && extension !== "ipt" && extension !== "pptx" && extension !== "igs" && extension !== "sldprt" && extension !== "stl" && extension !== "step" && extension !== "skp" && extension !== "sat") {
				toast.error(`File extension .${extension} is not allowed`);
				continue;
			}
			setpr(0)
			setFile((p) => [...p, file]);
		}


		// if (files.length) {
		// 	setpr(0)
		// }

	};



	const handle_file_change_other: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.currentTarget;


		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);
			if (extension !== "zip" && extension !== "PDF" && extension !== "rar" && extension !== "docx" && extension !== "exe" && extension !== "dwg" && extension !== "svg" && extension !== "sldasm" && extension !== "slddrw" && extension !== "ipt" && extension !== "pptx" && extension !== "igs" && extension !== "sldprt" && extension !== "stl" && extension !== "step" && extension !== "skp" && extension !== "sat" && extension !== "pdf") {
				toast.error(`File extension .${extension} is not allowed`);
				continue;
			}
			setFileOther((p) => [...p, file]);
			setpr2(0)
		}

		console.log("file length", file.length)

		//setFileOther((p) => [...p, ...files]);
	};



	const [pr, setpr] = useState(110)
	const [pr2, setpr2] = useState(110)

	useEffect(() => {
		if (pr < 102) {
			setTimeout(() => setpr(prev => prev += 2), 50)
		}

	}, [pr]);

	console.log("Files are", file)

	console.log("The other file are : -", otherFile)

	function delete_files(e) {
		setFile(file.filter(function (s) { return s !== e }))
	}

	useEffect(() => {
		setFile(file)
	}, [file])



	////////////////////////////////For second loader /////////////////////////


	useEffect(() => {
		if (pr2 < 102) {
			setTimeout(() => setpr2(prev => prev += 2), 50)
		}

	}, [pr2]);


	function delete_files2(e) {
		setFileOther(otherFile.filter(function (s) { return s !== e }))
	}

	useEffect(() => {
		setFileOther(otherFile)
	}, [otherFile])


	const handlecancel = () => {
		router.push("/account/jobs")
	}


	console.log("The files are:-", file)

	return (
		<div>
			<div
				className='banner_wp inner_banner'
				style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner1_banner_text'>
							<h1 className='yh'>Post machining request</h1>
							<ul>
								<li>home</li>
								<li>job</li>
								<li>
									<Link href={router.pathname}>
										<a>job list</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className='container job_listing'>
				<div className='row'>
					<div className='col-sm-12'>
						<div className='job-l'>
							<p>
								It is completely free for you to create a listing for your
								custom CNC machining requirement.
								<br />
								Simply create your free listing and wait for quotes to come in.
								You do not have to commit to anything until you are happy with a
								quote provided.
								<br />
								Enter the details of your custom machined part requirement
								below. Make sure you provide enough information for the CNC
								machinist to make an accurate assessment. Provide a full
								description, including dimensions and images.
							</p>
						</div>
					</div>
					<div className='col-sm-12'>
						<div className='job-r'>
							<h3>Describe Your Project</h3>
							<div className='row'>
								<div className='col-sm-4'>
									<label>Title of Project:</label>
								</div>
								<div className='col-sm-8'>
									<input
										type='text'
										name='name'
										placeholder='Ex : 5 steel spacers for motorcycle wheel'
										autoComplete={"off"}
										value={project.project_name}
										onChange={setproject("project_name")}
									/>
								</div>
							</div>
							<div className='row'>
								<div className='col-sm-4'>
									<label>Comment:</label>
								</div>
								<div className='col-sm-8'>
									<textarea
										name='descri'
										rows={4}
										autoComplete={"off"}
										value={project.description}
										onChange={setproject("description")}
									/>
								</div>
							</div>
							<div className='row'>
								<div className='col-sm-4'></div>
								<div className='col-sm-8'>
									<div className='b-li'>
										<p>
											Specify the materials to be used, the tolerances and the
											total number of parts
										</p>
										<p>
											If delivery outside mainland UK, please specify the
											delivery location
										</p>
										<p>Please do not provide your contact details here.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='attach-file'>
					<h3>Attach your files here</h3>
					<div className='row'>
						<div className='col-sm-6'>
							<h4>PDF or Image files*</h4>
							<div className='upload-btn-wrapper'>
								<button className='btn'>
									<i className='fa fa-upload' /> Choose your PDF / Images
								</button>
								<input
									type='file'
									name='myfile'
									onChange={handle_file_change}
									multiple={true}
								/>
							</div>
							{pr < 101 ? (
								<ProgressBar now={pr} label={`${pr}%`} />
							) : (<></>)}

							{file && pr > 100 ? (
								file?.map((f) => {
									return (
										<div className="pro_div">
											<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files(f)}><i className="fa fa-trash-o"></i></a></p>
										</div>
									)
								})
							) : (<></>)}
						</div>
						<div className='col-sm-6'>
							<div className='b-li'>
								<p>The first file will be used for a thumbnail picture</p>
								<p>Max file size: 3 MB</p>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-sm-6'>
							<h4>3D files or other format (optional)</h4>
							<div className='upload-btn-wrapper'>
								<button className='btn'>
									<i className='fa fa-upload' /> Select your 3D files
								</button>
								<input
									type='file'
									name='myfile'
									onChange={handle_file_change_other}
									multiple={true}
								/>
							</div>


							{pr2 < 101 ? (
								<ProgressBar now={pr2} label={`${pr2}%`} />
							) : (<></>)}

							{otherFile && pr2 > 100 ? (
								otherFile?.map((f) => {
									return (
										<div className="pro_div">
											<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files2(f)}><i className="fa fa-trash-o"></i></a></p>
										</div>
									)
								})
							) : (<></>)}

						</div>
						<div className='col-sm-6'></div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-12'>
						<div className='other_info'>
							<h3>Other information</h3>
							<h4>I would like to receive quotes before:</h4>
							<select name='post_for' onChange={setproject("post_for")}>
								<option value={4}>4 Days</option>
								<option value={8}>8 Days</option>
							</select>
						</div>
					</div>
					<div className='col-sm-12'>
						<div className='other_info'>
							<h3>Visibility</h3>
							{user?.pro_user == 1 ? (<div className='form-check'>
								<label className='form-check-label'>
									<input
										type='radio'
										className='form-check-input'
										name='optradio'
										value={"Pro"}
										checked={project.visibility == "Pro" ? true : false}
										onChange={setproject("visibility")}
									/>
									Pro (access to best machinists, professional services)
								</label>
							</div>) : (<></>)}

							{/* <div className='form-check'>
								<label className='form-check-label'>
									<input
										type='radio'
										className='form-check-input'
										name='optradio'
										value={"Pro"}
										checked={project.visibility == "Pro" ? true : false}
										onChange={setproject("visibility")}
									/>
									Pro (access to best machinists, professional services)
								</label>
							</div> */}

							<div className='form-check'>
								<label className='form-check-label'>
									<input
										type='radio'
										className='form-check-input'
										name='optradio'
										autoComplete={"off"}
										value={"public"}
										checked={project.visibility == "public" ? true : false}
										onChange={setproject("visibility")}
									/>
									Public (you will receive more quotes)
								</label>
							</div>
							<div className='form-check'>
								<label className='form-check-label'>
									<input
										type='radio'
										className='form-check-input'
										name='optradio'
										value={"private"}
										checked={project.visibility == "private" ? true : false}
										onChange={setproject("visibility")}
									/>
									Private (visibility restricted to confirmed machinists)
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='reg-bottom'>
					<button type='submit' name='submit' onClick={handlecancel}>
						Cancel
					</button>
					<button type='submit' name='submit' onClick={handleSubmit}>
						Check &amp; Submit
					</button>
				</div>
			</div>

			<GlobalModal
				title='Confirm your Job Post'
				atom={atom.modal.confirm_project}>
				<div className='wjgf'>
					<img src={file?.length ? URL.createObjectURL(file[0]) : ""} />

					<div className='cnfm-job-details'>
						<div className='cnfm-job-attchmnts'>
							<h5>Attachments: </h5>
							<div>
								{file?.length ? (
									file?.map((f, i) => {

										return (
											<ul>
												<li>
													<a href={URL.createObjectURL(f)} target={"_blank"}>
														{path.parse(f?.name)?.name?.slice(0, 8)}
														{path.extname(f?.name)}{" "}
													</a>
												</li>
											</ul>
										);

									})
								) : (
									<></>
								)}


								{otherFile?.length ? (
									otherFile?.map((f, i) => {

										return (
											<ul>
												<li>
													<a href={URL.createObjectURL(f)} target={"_blank"}>
														{path.parse(f?.name)?.name?.slice(0, 8)}
														{path.extname(f?.name)}{" "}
													</a>
												</li>
											</ul>
										);

									})
								) : (
									<></>
								)}
							</div>
							<br />

						</div>

						<span>
							<h5>Title: </h5>
							<p>{project.project_name}</p>
						</span>
						<span>
							<h5>Comment: </h5>
							<p>{project.description}</p>
						</span>
						<span>
							<h5>I would like to receive quotes before: </h5>
							<p>{project.post_for} Days</p>
						</span>
						<span>
							<h5>Visibility: </h5>
							<p>{project.visibility}</p>
						</span>
					</div>
					<div className='reg-bottom'>
						<button type='submit' name='submit' onClick={() => setOpen(false)}>
							Back
						</button>
						<button type='submit' name='submit' onClick={processSubmit}>
							Submit your Request
						</button>
					</div>
				</div>
			</GlobalModal>
		</div>
	);

}

post.ignorePath = true;

export default post;
