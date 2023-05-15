import { useAtomValue } from "jotai/utils";

import atom from "../../src/jotai/atom";
import { useEffect, useState } from "react";
import common from "../../src/helpers/common";
import router from "next/router";

import api from "../../src/api/services/api";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import { useAtom } from "jotai";


const image = () => {
    const all_list = useAtomValue(atom.project.api.all_list);
    const project_gallery = useAtomValue(atom.project.api.project_gallery)

    useEffect(() => {
        api.project.all_lists({ params: {} });
    }, []);

    useEffect(() => {
        api.project.project_gallery({ params: {} });
    }, [])

    console.log("all lists are: ------------->", all_list)

    const RefLink = (l) => {
        localStorage.setItem('items', (l));
        router.replace(l)
    }

    // all_list?.map((m) => {
    //     if (m?.attach_file.includes(",")) {
    //         m?.attach_file.split(",").map((a) => {
    //             console.log("a files", a)
    //         })
    //     }
    //     console.log(m?.attach_file)
    // })

    const [index, setIndex] = useState(0);
    const [open_img, setOpen_img] = useAtom(atom.modal.img_viewer);
    const [slide, setSlide] = useState(project_gallery[0]?.a);

    const [project_name, setproject_name] = useState(project_gallery[0]?.a)
    const [id, setid] = useState(project_gallery[0]?.c)


    const prevSlide = () => {
        if (index == 0) {
            setIndex(project_gallery.length - 1);
        }
        else {
            setIndex(index - 1);
        }
        setSlide(project_gallery[index]?.a);
        setproject_name(project_gallery[index]?.b)
        setid(project_gallery[index]?.c)
        console.log("prev slide ", slide);

    }


    const nextSlide = () => {
        setIndex((index + 1) % (project_gallery.length - 1));
        //setIndex((prevState)=> prevState + 1)
        setSlide(project_gallery[index]?.a);
        setproject_name(project_gallery[index]?.b)
        setid(project_gallery[index]?.c)
        console.log("next slide ", slide);
    }

    console.log("gallery images :-", project_gallery)

    console.log("index is :- ", index)

    console.log("slide is:-", slide)

    useEffect(() => {
        setSlide(project_gallery[index]?.a);
        setproject_name(project_gallery[index]?.b)
        setid(project_gallery[index]?.c)
    }, [index])

    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>LATEST ACHIEVEMENTS</h1>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container latest_request'>

                <div className='row'>
                    {project_gallery?.length
                        ? (project_gallery?.map((l, index) => {

                            return (
                                <div className='col-sm-3'>
                                    <div className='last_l'>

                                        <figure>
                                            <a data-toggle="tooltip" data-placement="top" title={l?.b}>
                                                <img
                                                    src={common.get_image(
                                                        l?.a
                                                    )}
                                                    onClick={() => {
                                                        setOpen_img(true)
                                                        setSlide(l?.a)
                                                        setIndex(index)
                                                        setproject_name(l?.b)
                                                        setid(l?.c)
                                                    }}
                                                />
                                            </a>

                                            <h6>{l?.b}</h6>
                                        </figure>

                                    </div>
                                </div>
                            );
                        }))
                        : ""}
                    <GlobalModal title='Image viewer' atom={atom.modal.img_viewer}>
                        {/* <h1>Hello world</h1> */}

                        <div className='myprofile_name_list'>
                            <div
                                id='demo'
                                className='carousel slide'
                                data-ride='carousel'>
                                <div className='carousel-inner'>
                                    <div className='carousel-item active'>
                                        <img src={`http://18.169.104.118/public/projects/${slide}`} id="curr_img" onClick={() => router.push(`/project/${project_name}/${id}`)} />
                                    </div>
                                </div>
                                <button
                                    className='carousel-control-prev'
                                    onClick={prevSlide}
                                    data-slide='prev'>
                                    <span className='carousel-control-prev-icon' />
                                </button>
                                <button
                                    className='carousel-control-next'
                                    onClick={nextSlide}
                                    data-slide='next'>
                                    <span className='carousel-control-next-icon' />
                                </button>
                            </div>
                        </div>


                    </GlobalModal>
                </div>

                {/* <div className='row'>
                    {all_list?.length
                        ? (all_list?.map((l) => {

                            return (
                                l?.adminApprove == 1 && l?.attach_file.includes(",") ? l?.attach_file.split(",").map((m) => {
                                    <div className='col-sm-3'>
                                        <div className='last_l'>

                                            <figure>
                                                <a data-toggle="tooltip" data-placement="top" title={l?.project_name}>
                                                    <img
                                                        src={common.get_image(
                                                            (m)
                                                        )} />
                                                </a>
                                                <h6>{l?.project_name}</h6>
                                            </figure>

                                        </div>
                                    </div>
                                }) :  l?.adminApprove == 1 && !l?.attach_file.includes(",")? (
                                    <div className='col-sm-3'>
                                        <div className='last_l'>

                                            <figure>
                                                <a data-toggle="tooltip" data-placement="top" title={l?.project_name}>
                                                    <img
                                                        src={common.get_image(
                                                            (l?.attach_file)
                                                        )} />
                                                </a>
                                                <h6>{l?.project_name}</h6>
                                            </figure>

                                        </div>
                                    </div>
                                ) : (<></>)

                            );
                        }))
                        : ""}
                </div> */}
            </div>



        </>
    )
}

image.ignorePath = true

export default image