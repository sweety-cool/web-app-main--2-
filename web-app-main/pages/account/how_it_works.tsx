import { useState, useEffect } from "react";

const how_it_works = () => {

    const [customer, setcustomer] = useState(true);
    const [mac, setmac] = useState(false);

    const selectcust = () => {
        if (customer == false) {
            setcustomer(true)
        }
        setmac(false)
    }

    const select_mac = () => {
        if (mac == false) {
            setmac(true)
        }
        setcustomer(false)
    }

    return (
<>
<div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>HOW IT WORKS</h1>
                        </div>
                    </div>
                </div>
            </div>

        <div className="container cjw">
            <div className="col-sm-12 howit5">
                <ul className="nav nav-pills justify-content-center" role="tablist">
                    <li className="nav-item">
                        <a className={`nav-link ${customer ? "active" : ""}`} data-toggle="tab" href="#" onClick={selectcust}>You are a customer</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${mac ? "active" : ""}`} data-toggle="tab" href="#" onClick={select_mac}>You are a Machinist</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="customer" className={`tab-pane ${customer ? "active" : ""}`}><br />
                        <div className="howit1">
                            <h3>Here are the steps to have your parts machined on Usineur.fr:</h3>
                            <ul>
                                <li>Post your machining request for free by sending your plans.</li>
                                <li>Receive free and non-binding quotes from professional machinists</li>
                                <li>If you like an offer, choose a machinist</li>
                                <li>Place an order by depositing the funds in a Usineur.fr secure account</li>
                                <li>Receive the parts at home</li>
                                <li>After verifying the conformity of the parts, release the funds to pay your machinist and leave an evaluation.</li>
                            </ul>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Machining parts has never been so easy and affordable</h3>
                                    <p>Usineur.fr gives you immediate access to the best Machinists. You can therefore have your machining work carried out easily, quickly and efficiently.</p>
                                    <p>Finding a Machinist on Usineur.fr is easy: you just have to publish your ad for free and wait for proposals from qualified Machinists.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/Ecran%20final2.png" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Guaranteed result: your payment is only effective after receipt and inspection of the machined parts.</h3>
                                    <p>You do not take any risk on Usineur.fr. You pay the amount proposed by the Usineur to the order on a secure Usineur.fr account. This amount is only paid to your Machinist after you have received your parts and confirmed the quality of the machining work. In addition, Machinists are rated by buyers, so you can form a solid opinion of your Machinist before you even place an order with them.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/cadenas3.jpg" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Usineur.fr is completely free for you.</h3>
                                    <p>There are no hidden fees, no charges, no additional costs. Usineur.fr's commission - 14.9% - is included in the price offered by Usineurs and is paid by your Usineur. In other words, the cost of using Usineur.fr is included in the price offered by your Usineur. </p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/euro%20symbole.jpg" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit6">
                                <a href="#">Register</a>
                            </div>
                        </div>
                    </div>
                    <div id="machinist" className={`tab-pane ${customer ? "" : "active"}`}><br />
                        <div className="howit1">
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>You are a Machinist: consult the machining requests and make offers for free.</h3>
                                    <p>Send your best machining offers to potential customers for free. Registration on Usineur.fr is free and without obligation.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/Offre%20Usinage2.png" alt="" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Have the assurance of being paid</h3>
                                    <p>On Usineur.fr, it's simple: you deliver quality machining work to the customer and you get paid. Your customer pays the full price of the order to a Usineur.fr secure account. The funds are released to your account as soon as your customer has received the machined parts and validated the quality of your work.</p>
                                    <p>A commission of 14.9% is deducted at source to cover the operating costs of the Usineur.fr site. This is the only user fee for Usineur.fr.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/piggy-bank.jpg" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Create your profile</h3>
                                    <p>Introduce yourself, inspire confidence and convince new customers to order from you. Bring together in a single place accessible to all: a presentation of your machining activity, customer testimonials, a photo gallery to show your installations or your best achievements.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/Profilfinal2.png" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit6">
                                <a href="#">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</>
    )
}
how_it_works.ignorePath = true

export default how_it_works